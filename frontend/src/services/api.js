import axios from 'axios';

// Fetch crypto data
export async function fetchCryptoData() {
    try {
        const response = await axios.get('/api/crypto/data');
        return response.data;
    } catch (error) {
        console.error('Error fetching crypto data:', error);
        throw error;
    }
}

// Fetch predictions
export async function fetchPredictions() {
    try {
        const response = await axios.get('/api/crypto/predictions');
        return response.data;
    } catch (error) {
        console.error('Error fetching predictions:', error);
        throw error;
    }
}
