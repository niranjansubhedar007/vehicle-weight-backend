require("dotenv").config(); // Load environment variables from .env file

const ConnectToMongodb = require("../db");
const express = require("express");
const cors = require("cors");
const app = express();

const dbHost = process.env.DB_HOST;
const port = process.env.PORT || 8000;

// CORS configuration

// app.use(
//   cors({
//     origin: "https://vehicle-weight.vercel.app", // Allow your frontend origin
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true, // Allow credentials like cookies or headers
//   })
// );

const corsOption = {
  origin: ["http://localhost:3000", "http://localhost:3001",  "https://vehicle-weight.vercel.app"],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Content-Length"],
  credentials: true, // Allow credentials like cookies or headers
  maxAge: 3600,
};

app.use(cors(corsOption))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

ConnectToMongodb();

app.get("/", (req, res) => {
  res.send("Hello world");
});

// Define your routes after applying CORS
app.use("/api/admin", require("./routes/admin"));
app.use("/api/serial", require("./routes/serial"));
app.use("/api/proxyLogin", require("./routes/proxyLogin"));
app.use("/api/employeeLogin", require("./routes/employeeLogin"));
app.use("/api/vehical", require("./routes/vehical"));
app.use("/api/coustomer", require("./routes/coustomer"));
app.use("/api/weight", require("./routes/weight"));
app.use("/api/weightOutward", require("./routes/weightOutward"));
app.use("/api/proxyWeight", require("./routes/proxyWeight"));
app.use("/api/proxyWeightOutward", require("./routes/proxyWeightOutward"));
app.use("/api/material", require("./routes/material"));
app.use("/api/proxyMaterial", require("./routes/proxyMaterial"));

// Start the server
app.listen(port, "0.0.0.0", () => {
  console.log(`MyHotel listening at http://${dbHost}:${port}`);
});

module.exports = app;
