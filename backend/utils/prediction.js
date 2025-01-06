// backend/utils/prediction.js

/**
 * Simple prediction logic based on historical data.
 * This is a placeholder and should be replaced with actual prediction algorithms.
 * For demonstration, we'll calculate the average daily growth and project it.
 */

const predictLevels = (prices) => {
  if (prices.length < 2) {
    return { year_2: null, year_5: null, year_10: null };
  }

  // Calculate daily returns
  const returns = [];
  for (let i = 1; i < prices.length; i++) {
    const prev = prices[i - 1].close;
    const current = prices[i].close;
    const dailyReturn = (current - prev) / prev;
    returns.push(dailyReturn);
  }

  // Calculate average daily return
  const avgReturn = returns.reduce((acc, val) => acc + val, 0) / returns.length;

  // Project future prices
  const latestPrice = prices[prices.length - 1].close;

  // Assume compound growth
  const year_2 = (latestPrice * Math.pow(1 + avgReturn, 365 * 2)).toFixed(2);
  const year_5 = (latestPrice * Math.pow(1 + avgReturn, 365 * 5)).toFixed(2);
  const year_10 = (latestPrice * Math.pow(1 + avgReturn, 365 * 10)).toFixed(2);

  return {
    year_2: parseFloat(year_2),
    year_5: parseFloat(year_5),
    year_10: parseFloat(year_10),
  };
};

module.exports = { predictLevels };
