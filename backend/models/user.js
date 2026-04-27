const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    mobile: { type: String, required: false }, // Made optional for Google Login
    password: { type: String, required: false }, // Made optional for Google Login
    googleId: { type: String, unique: true, sparse: true }, // Added for Google OAuth
    familySize: { type: String },
    agreed: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);