// frontend/src/App.js
import React, { useEffect, useState } from 'react';
import { fetchCryptoData, fetchPredictions } from './services/api';
import CryptoCard from './components/CryptoCard';
import './App.css';

function App() {
  const [cryptoData, setCryptoData] = useState([]);
  const [predictions, setPredictions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const dataResponse = await fetchCryptoData();
        setCryptoData(dataResponse.data);

        const predResponse = await fetchPredictions();
        setPredictions(predResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data. Please try again later.');
      }
    };

    getData();
  }, []);

  return (
    <div className="App">
      <h1>Crypto Predictor</h1>
      {error && <p className="error">{error}</p>}
      <div className="crypto-container">
        {cryptoData.map((coin) => {
          const pred = predictions.find((p) => p.name === coin.name);
          return (
            <CryptoCard
              key={coin.name}
              name={coin.name}
              prices={coin.prices}
              predictions={pred ? pred.predictions : {}}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
