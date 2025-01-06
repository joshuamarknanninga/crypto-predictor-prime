// frontend/src/components/PredictionChart.js
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const PredictionChart = ({ predictions }) => {
  const data = [
    { name: '2 Years', price: predictions.year_2 },
    { name: '5 Years', price: predictions.year_5 },
    { name: '10 Years', price: predictions.year_10 },
  ];

  return (
    <div style={{ width: '100%', height: 200 }}>
      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
          <Bar dataKey="price" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PredictionChart;
