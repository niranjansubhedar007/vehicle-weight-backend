const mongoose = require("mongoose")

const proxyMaterialSchema = new mongoose.Schema({

    materialName:{
        required:true,
        type:String
    },
    isChecked:{
        type: Boolean,
        default:true
    } 


})

const ProxyMaterial = mongoose.model("ProxyMaterial" ,proxyMaterialSchema)
module.exports = ProxyMaterial
