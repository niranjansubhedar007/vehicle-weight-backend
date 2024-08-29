const mongoose = require("mongoose")

const materialSchema = new mongoose.Schema({

    materialName:{
        required:true,
        type:String
    },
    isChecked:{
        type: Boolean,
        default:false
    } 


})

const Material = mongoose.model("Material" ,materialSchema)
module.exports = Material
