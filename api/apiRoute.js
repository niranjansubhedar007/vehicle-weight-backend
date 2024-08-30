
const express = require("express");
const router = express.Router();


router.use("/api/admin", require("./routes/admin"));
// router.use("/api/serial", require("./routes/serial"));
router.use("/api/proxyLogin", require("./routes/proxyLogin"));
router.use("/api/employeeLogin", require("./routes/employeeLogin"));
router.use("/api/vehical", require("./routes/vehical"));
router.use("/api/coustomer", require("./routes/coustomer"));
router.use("/api/weight", require("./routes/weight"));
router.use("/api/weightOutward", require("./routes/weightOutward"));
router.use("/api/proxyWeight", require("./routes/proxyWeight"));
router.use("/api/proxyWeightOutward", require("./routes/proxyWeightOutward"));
router.use("/api/material", require("./routes/material"));
router.use("/api/proxyMaterial", require("./routes/proxyMaterial"));


module.exports = router;