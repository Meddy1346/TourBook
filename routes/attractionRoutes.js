// routes/attractionRoutes.js
const express = require('express');
const { addAttraction, getAttractions, searchAttractions } = require('../controllers/attractionController');

const router = express.Router();

router.post('/add', addAttraction);
router.get('/', getAttractions);
router.get('/search', searchAttractions);

module.exports = router;
