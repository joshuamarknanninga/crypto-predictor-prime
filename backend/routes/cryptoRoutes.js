// backend/routes/cryptoRoutes.js
const express = require('express');
const router = express.Router();
const { getCryptoData, getPredictions } = require('../controllers/cryptoController');

router.get('/data', getCryptoData);
router.get('/predictions', getPredictions);

module.exports = router;
