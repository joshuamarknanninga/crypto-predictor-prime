const express = require('express');
const router = express.Router();

// Mock predictions data
const predictions = [
    { name: 'Bitcoin', predictions: { nextDay: 50000, nextWeek: 51000 } },
    { name: 'Ethereum', predictions: { nextDay: 3000, nextWeek: 3200 } },
];

router.get('/predictions', (req, res) => {
    res.json(predictions);
});

module.exports = router;
