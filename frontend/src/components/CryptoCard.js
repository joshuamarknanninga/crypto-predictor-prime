// frontend/src/components/CryptoCard.js
import React from 'react';
import PredictionChart from './PredictionChart';
import './CryptoCard.css';

const CryptoCard = ({ name, prices, predictions }) => {
  return (
    <div className="crypto-card">
      <h2>{name.toUpperCase()}</h2>
      <p>Current Price: ${prices[prices.length - 1][1].toFixed(2)}</p>
      <PredictionChart predictions={predictions} />
    </div>
  );
};

export default CryptoCard;
