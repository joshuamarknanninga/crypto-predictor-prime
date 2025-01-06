// backend/controllers/cryptoController.js
const axios = require('axios');
const { predictLevels } = require('../utils/prediction');

const COINS = ['bitcoin', 'ethereum', 'dogecoin', 'shiba-inu', 'pepe'];

const getCryptoData = async (req, res) => {
  try {
    const responses = await Promise.all(
      COINS.map(coin =>
        axios.get(`https://api.coingecko.com/api/v3/coins/${coin}/market_chart`, {
          params: {
            vs_currency: 'usd',
            days: 'max',
          },
        })
      )
    );

    const data = responses.map((response, index) => ({
      name: COINS[index],
      prices: response.data.prices,
    }));

    res.json(data);
  } catch (error) {
    console.error('Error fetching crypto data:', error);
    res.status(500).json({ error: 'Failed to fetch cryptocurrency data.' });
  }
};

const getPredictions = async (req, res) => {
  try {
    const cryptoData = await getCryptoData(req, res);
    if (cryptoData.error) return;

    const predictions = cryptoData.map(coin => ({
      name: coin.name,
      predictions: predictLevels(coin.prices),
    }));

    res.json(predictions);
  } catch (error) {
    console.error('Error generating predictions:', error);
    res.status(500).json({ error: 'Failed to generate predictions.' });
  }
};

module.exports = { getCryptoData, getPredictions };
