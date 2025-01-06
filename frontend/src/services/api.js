// frontend/src/services/api.js
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const fetchCryptoData = () => axios.get(`${API_BASE_URL}/crypto/data`);
export const fetchPredictions = () => axios.get(`${API_BASE_URL}/crypto/predictions`);
