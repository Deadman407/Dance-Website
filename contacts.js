const mongoose = require("mongoose")

const contactSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    phone : {
        type: Number,
        required: true,
        unique: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    address : {
        type: String,
        required: true
    },
    desc : {
        type: String,
        required: true
    },


})

// Now we need to create a collection

const ContactUs = new mongoose.model("ContactUs", contactSchema);

module.exports = ContactUs;