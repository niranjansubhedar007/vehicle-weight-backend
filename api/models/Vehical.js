const mongoose = require("mongoose");

const vehicalSchema = new mongoose.Schema({
  vehicalOwnerName: {
    type: String,
  },
  mobileNo: {
    type: String,
  },
  address: {
    type: String,
  },
  vehicalRTONo: {
    type: String,
  },
});

const Vehical = mongoose.model("Vehical", vehicalSchema);
module.exports = Vehical;
