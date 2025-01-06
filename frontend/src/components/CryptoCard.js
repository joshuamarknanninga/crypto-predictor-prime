// frontend/src/components/CryptoCard.js
import React from 'react';
import PredictionChart from './PredictionChart';
import './CryptoCard.css';

const CryptoCard = ({ name, prices, predictions, error }) => {
  const currentPrice = prices.length > 0 ? prices[prices.length - 1].close.toFixed(2) : 'N/A';

  return (
    <div className="crypto-card">
      <h2>{name.toUpperCase()}</h2>
      {error ? (
        <p className="error">{error}</p>
      ) : (
        <>
          <p>Current Price: ${currentPrice}</p>
          <PredictionChart predictions={predictions} />
        </>
      )}
    </div>
  );
};

export default CryptoCard;
