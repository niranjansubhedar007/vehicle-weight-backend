
const express = require("express");
const router = express.Router();

router.use("/admin", require("./admin"));
router.use("/auth", require("./auth")); // proxyLogin and employeeLogin
router.use("/weight", require("./weight")); // weight and weightOutward
router.use("/proxyWeight", require("./proxyWeight")); // proxyWeight and proxyWeightOutward
router.use("/material", require("./material")); // material and proxyMaterial
router.use("/vehical", require("./vehical"));
router.use("/coustomer", require("./coustomer"));


module.exports = router;