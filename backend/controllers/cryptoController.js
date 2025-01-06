// backend/controllers/cryptoController.js
const axios = require('axios');
const Crypto = require('../models/cryptoModel'); // Import the Crypto model
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 3600 }); // Cache for 1 hour
const { predictLevels } = require('../utils/prediction'); // Your prediction logic

const COINS = ['bitcoin', 'ethereum', 'dogecoin', 'shiba-inu']; // CoinGecko uses lowercase IDs

/**
 * Fetch cryptocurrency data from CoinGecko API with caching.
 * @returns {Array} Array of cryptocurrency data.
 */
const fetchCryptoData = async () => {
  const cacheKey = 'cryptoData';
  if (cache.has(cacheKey)) {
    console.log('Fetching crypto data from cache.');
    return cache.get(cacheKey);
  }

  console.log('Fetching crypto data from CoinGecko API.');

  try {
    const dataPromises = COINS.map(async (coin) => {
      try {
        console.log(`Fetching data for ${coin} from CoinGecko.`);
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coin}/market_chart`, {
          params: {
            vs_currency: 'usd',
            days: '365', // Fetches maximum available data
          },
        });

        // Map the prices to { timestamp, close }
        const prices = response.data.prices.map((price) => ({
          timestamp: new Date(price[0]),
          close: price[1],
        }));

        console.log(`Successfully fetched data for ${coin}.`);

        // Find if the crypto already exists
        let crypto = await Crypto.findOne({ symbol: coin.toUpperCase() });
        if (crypto) {
          // Update existing data
          crypto.prices = prices;
          crypto.predictions = predictLevels(prices);
        } else {
          // Create new entry
          crypto = new Crypto({
            name: coin,
            symbol: coin.toUpperCase(),
            prices: prices,
            predictions: predictLevels(prices),
          });
        }

        await crypto.save();

        return {
          name: coin,
          prices: prices,
          predictions: crypto.predictions,
        };
      } catch (error) {
        console.error(`Error fetching data for ${coin}:`, error.response ? error.response.data : error.message);
        return {
          name: coin,
          prices: [],
          error: `Failed to fetch data for ${coin}.`,
        };
      }
    });

    const cryptoData = await Promise.all(dataPromises);
    cache.set(cacheKey, cryptoData);
    return cryptoData;
  } catch (error) {
    console.error('Error fetching data from CoinGecko API:', error.message);
    throw error;
  }
};

/**
 * Controller to get cryptocurrency data.
 */
const getCryptoData = async (req, res) => {
  try {
    const data = await fetchCryptoData();
    res.json(data);
  } catch (error) {
    console.error('Error fetching crypto data:', error.message);
    res.status(500).json({ error: 'Failed to fetch cryptocurrency data.' });
  }
};

/**
 * Controller to get cryptocurrency predictions.
 */
const getPredictions = async (req, res) => {
  try {
    const cryptoData = await fetchCryptoData();

    // Filter out coins that failed to fetch data
    const validCryptoData = cryptoData.filter((coin) => coin.prices.length > 0);

    const predictions = validCryptoData.map((coin) => ({
      name: coin.name,
      predictions: coin.predictions,
    }));

    res.json(predictions);
  } catch (error) {
    console.error('Error generating predictions:', error.message);
    res.status(500).json({ error: 'Failed to generate predictions.' });
  }
};

module.exports = { getCryptoData, getPredictions };
