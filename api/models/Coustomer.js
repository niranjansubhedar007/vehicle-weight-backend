const mongoose = require("mongoose")

const coustomerSchema = new mongoose.Schema({

    coustomerName:{
        required:true,
        type:String
    },
 
    mobileNo:{
        required:true,
        type:Number,
        unique:true,

    },
    address:{
        required:true,

        type:String
    },

})

const Coustomer = mongoose.model("Coustomer" ,coustomerSchema)
module.exports = Coustomer





