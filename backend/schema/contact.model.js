const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({}, { timestamps: true });

const Contact = mongoose.model("Contact", contactSchema)

module.exports = Contact