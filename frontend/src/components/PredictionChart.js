// frontend/src/components/PredictionChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

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

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Price Predictions',
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default PredictionChart;
