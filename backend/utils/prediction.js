// backend/utils/prediction.js
const predictLevels = (prices) => {
    // Extract the last 100 data points for simplicity
    const recentPrices = prices.slice(-100).map(p => p[1]);
    const n = recentPrices.length;
    const sumX = n * (n + 1) / 2;
    const sumY = recentPrices.reduce((a, b) => a + b, 0);
    const sumXY = recentPrices.reduce((sum, val, index) => sum + (index + 1) * val, 0);
    const sumX2 = n * (n + 1) * (2 * n + 1) / 6;
  
    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX ** 2);
    const intercept = (sumY - slope * sumX) / n;
  
    const currentLevel = recentPrices[recentPrices.length - 1];
    const years = [2, 5, 10];
    const predictions = {};
  
    years.forEach(year => {
      const periods = year * 365; // Assuming daily data
      const predicted = slope * (n + periods) + intercept;
      predictions[`year_${year}`] = predicted.toFixed(2);
    });
  
    return predictions;
  };
  
  module.exports = { predictLevels };
  