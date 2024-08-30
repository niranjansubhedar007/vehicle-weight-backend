// require('dotenv').config(); // Load environment variables from .env file

// const ConnectToMongodb = require('./db');
// const express = require('express');
// const app = express();

// var cors = require('cors');
// const dbHost = process.env.DB_HOST;
// const port = process.env.PORT;

// ConnectToMongodb();

// app.use(cors());
// app.use(express.urlencoded({extended: true}));
// app.use(express.json());

// app.use('/api/admin', require('./routes/admin'));
// app.use('/api/serial', require('./routes/serial'));
// app.use('/api/proxyLogin', require('./routes/proxyLogin'));
// app.use('/api/employeeLogin', require('./routes/employeeLogin'));
// app.use('/api/vehical', require('./routes/vehical'));
// app.use('/api/coustomer', require('./routes/coustomer'));
// app.use('/api/weight', require('./routes/weight'));
// app.use('/api/weightOutward', require('./routes/weightOutward'));
// app.use('/api/proxyWeight', require('./routes/proxyWeight'));
// app.use('/api/proxyWeightOutward', require('./routes/proxyWeightOutward'));
// app.use('/api/material', require('./routes/material'))
// app.use('/api/proxyMaterial', require('./routes/proxyMaterial'))

// app.listen(port,'0.0.0.0',() => {
//   console.log(`MyHotel listening at http://${dbHost}:${port}`);
// });

require("dotenv").config(); // Load environment variables from .env file

const ConnectToMongodb = require("../db");
const express = require("express");
const cors = require("cors");
const app = express();

const dbHost = process.env.DB_HOST;
const port = process.env.PORT || 5000;


// CORS configuration

app.use(
  cors({
    origin: "https://bhimrao-halwai-chikki.vercel.app", // Allow your frontend origin
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Allow credentials like cookies or headers
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


ConnectToMongodb();

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/api", require("./apiRoute"));
// app.use("/api", require("./apiRoute"));




// Start the server
app.listen(port, "0.0.0.0", () => {
  console.log(`MyHotel listening at http://${dbHost}:${port}`);
});

module.exports = app;
