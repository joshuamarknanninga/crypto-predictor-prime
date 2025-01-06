// backend/controllers/cryptoController.js
const axios = require('axios');
const { predictLevels } = require('../utils/prediction');
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 3600 }); // Cache for 1 hour

const COINS = ['bitcoin', 'ethereum', 'dogecoin', 'shiba-inu', 'pepe'];

// Mapping of CoinGecko names to CoinMarketCap symbols
const COIN_SYMBOLS = {
  bitcoin: 'BTC',
  ethereum: 'ETH',
  dogecoin: 'DOGE',
  'shiba-inu': 'SHIB',
  pepe: 'PEPE', // Ensure 'PEPE' is listed on CoinMarketCap
};

/**
 * Fetch cryptocurrency data from CoinMarketCap API with caching.
 * @returns {Array} Array of cryptocurrency data.
 */
const fetchCryptoData = async () => {
  const cacheKey = 'cryptoData';
  if (cache.has(cacheKey)) {
    console.log('Fetching crypto data from cache.');
    return cache.get(cacheKey);
  }

  console.log('Fetching crypto data from CoinMarketCap API.');
  const API_KEY = process.env.COINMARKETCAP_API_KEY;
  if (!API_KEY) {
    throw new Error('COINMARKETCAP_API_KEY is not set in the environment variables.');
  }

  try {
    const today = new Date();
    const time_end = today.toISOString().split('T')[0]; // 'YYYY-MM-DD'
    const time_start = '2013-04-28'; // Example start date, adjust as needed

    const responses = await Promise.all(
      COINS.map(async (coin) => {
        const symbol = COIN_SYMBOLS[coin];
        if (!symbol) {
          throw new Error(`Symbol for coin "${coin}" is not defined.`);
        }

        try {
          const response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/historical', {
            headers: { 'X-CMC_PRO_API_KEY': API_KEY },
            params: {
              symbol: symbol,
              time_start: time_start,
              time_end: time_end,
              interval: 'daily',
            },
          });

          // Check if data exists for the coin
          if (!response.data.data.quotes) {
            throw new Error(`No historical quotes found for ${symbol}.`);
          }

          // Map the quotes to [timestamp, close price]
          const prices = response.data.data.quotes.map((quote) => [
            new Date(quote.timestamp).getTime(),
            quote.quote.USD.close,
          ]);

          return {
            name: coin,
            prices: prices,
          };
        } catch (error) {
          console.error(`Error fetching data for ${symbol}:`, error.response ? error.response.data : error.message);
          return {
            name: coin,
            prices: [],
            error: `Failed to fetch data for ${symbol}.`,
          };
        }
      })
    );

    cache.set(cacheKey, responses);
    return responses;
  } catch (error) {
    console.error('Error fetching data from CoinMarketCap API:', error.message);
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
      predictions: predictLevels(coin.prices),
    }));

    res.json(predictions);
  } catch (error) {
    console.error('Error generating predictions:', error.message);
    res.status(500).json({ error: 'Failed to generate predictions.' });
  }
};

module.exports = { getCryptoData, getPredictions };
