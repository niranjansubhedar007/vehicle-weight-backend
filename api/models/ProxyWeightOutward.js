const mongoose = require("mongoose")

const proxyWeightOutwardSchema = new mongoose.Schema({
    RSTNo: {
        unique:true,
        type: Number
    },
    grossWeight: {
      
        type: Number,
    },
    tareWeight: {
      
        type: Number,
    },
    netWeight: {
     
        type: Number,
    },

    selectedVehicleRTONo: {
        type: String, // Assuming vehicle RTO number is a string
        // required: true,

    },
    selectedMaterialName: {
        type: String,
        // required: true,

    },
    vehicalOwnerName: {
        type: String,
        required: true,

    },
    vehicalMobileNo: {
        type: Number,
        required: true,

    },
    vehicalAddress: {
        type: String,
        required: true,

    },
    createdAt: {
        type: Date,
        default: Date.now // Set default value to current date and time
    },
    isChecked: {
        type: Boolean,
        default: false,
    },
    ewayNo:{
        type: Number,
    
    },
    isTemporary: {
        type: Boolean,
        default: false,
    },

});

proxyWeightOutwardSchema.pre('save', async function (next) {
    try {
        // Check if the order number is already set (for updating orders)
        if (!this.isNew) {
            return next();
        }

        // Get the total count of documents in the collection
        const totalCount = await this.constructor.countDocuments();

        // Generate the new order number based on the total count
        const newRSTNumber = `${totalCount + 1}`;

        // Set the order number in the document
        this.RSTNO = newRSTNumber;

        next();
    } catch (error) {
        next(error);
    }
});

const ProxyWeightOutward = mongoose.model("ProxyWeightOutward", proxyWeightOutwardSchema)
module.exports = ProxyWeightOutward
