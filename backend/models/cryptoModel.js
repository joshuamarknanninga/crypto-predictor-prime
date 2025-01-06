// backend/models/cryptoModel.js
const mongoose = require('mongoose');

const cryptoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, // Ensures each cryptocurrency has a unique name
  },
  symbol: {
    type: String,
    required: true,
    unique: true, // Ensures each cryptocurrency has a unique symbol
  },
  prices: {
    type: [
      {
        timestamp: {
          type: Date,
          required: true,
        },
        close: {
          type: Number,
          required: true,
        },
      },
    ],
    required: true,
  },
  predictions: {
    type: Object, // Structure: { year_2: Number, year_5: Number, year_10: Number }
    default: {},
  },
}, { timestamps: true });

module.exports = mongoose.model('Crypto', cryptoSchema);
