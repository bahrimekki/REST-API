const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    ferstName: { type: String, required: true },
    secondName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: Number,
    age: Number,
    imageLien: String,
});
module.exports = mongoose.model("User", userSchema);
