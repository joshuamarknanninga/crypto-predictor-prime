// frontend/src/services/api.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Fetch cryptocurrency data
export const fetchCryptoData = () => axios.get(`${API_URL}/crypto/data`);

// Fetch cryptocurrency predictions
export const fetchPredictions = () => axios.get(`${API_URL}/crypto/predictions`);
