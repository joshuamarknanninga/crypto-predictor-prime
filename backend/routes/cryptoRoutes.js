// backend/routes/cryptoRoutes.js
const express = require('express');
const { getCryptoData, getPredictions } = require('../controllers/cryptoController');

const router = express.Router();

router.get('/data', getCryptoData);
router.get('/predictions', getPredictions);

module.exports = router;
