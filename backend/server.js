// backend/server.js
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const cryptoRoutes = require('./routes/cryptoRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes.',
});

app.use(limiter);

// Configure CORS
const corsOptions = {
  origin: 'http://localhost:3000', // Frontend origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/crypto', cryptoRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
