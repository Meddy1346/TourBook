// models/Attraction.js
const mongoose = require('mongoose');

const attractionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    openingHours: { type: String },
    admissionFee: { type: Number },
    contactDetails: { type: String },
    userRatings: [{ type: Number }],
});

const Attraction = mongoose.model('Attraction', attractionSchema);
module.exports = Attraction;
