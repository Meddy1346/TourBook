// controllers/attractionController.js
const Attraction = require('../models/Attraction');

const addAttraction = async (req, res) => {
    const { name, location, description, category, openingHours, admissionFee, contactDetails } = req.body;

    const attraction = new Attraction({
        name, location, description, category, openingHours, admissionFee, contactDetails
    });

    if (attraction) {
        await attraction.save();
        res.status(201).json({ message: 'Attraction added successfully' });
    } else {
        res.status(400).json({ message: 'Invalid attraction data' });
    }
};

const getAttractions = async (req, res) => {
    const attractions = await Attraction.find({});
    res.json(attractions);
};

const searchAttractions = async (req, res) => {
    const { location, category, keyword } = req.query;
    const query = {};
    if (location) query.location = location;
    if (category) query.category = category;
    if (keyword) query.name = { $regex: keyword, $options: 'i' };

    const attractions = await Attraction.find(query);
    res.json(attractions);
};

module.exports = { addAttraction, getAttractions, searchAttractions };
