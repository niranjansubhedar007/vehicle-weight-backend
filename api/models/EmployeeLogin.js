const mongoose = require("mongoose")

const employeeSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    resetToken: {
        type: String, // This will store the reset token
    },
    resetTokenExpires: {
        type: Date, // This will store the expiration date of the reset token
    },
})

const EmployeeLogin = mongoose.model("EmployeeLogin",employeeSchema)
module.exports = EmployeeLogin