// frontend/src/components/PredictionChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';

const PredictionChart = ({ predictions }) => {
  const data = {
    labels: Object.keys(predictions),
    datasets: [
      {
        label: 'Predicted Price (USD)',
        data: Object.values(predictions),
        backgroundColor: 'rgba(75,192,192,0.6)',
      },
    ],
  };

  return <Bar data={data} />;
};

export default PredictionChart;
