const mongoose = require('mongoose');

// Define the schema for weight data
const weightDataSchema = new mongoose.Schema({
    vehicleNumber: {
        type: String,
        required: true
    },
    grossWeight: {
        type: Number
        
    },
    emptyWeight: {
        type: Number
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

// Create a model using the schema
const WeightData = mongoose.model('WeightData', weightDataSchema);

module.exports = WeightData;