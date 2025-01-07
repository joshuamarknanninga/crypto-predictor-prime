// frontend/src/services/api.js
import axios from 'axios';

// Fetch cryptocurrency data
export const fetchCryptoData = () => axios.get(`/api/crypto/data`);

// Fetch cryptocurrency predictions
export const fetchPredictions = () => axios.get(`/api/crypto/predictions`);