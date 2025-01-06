// backend/server.js
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose'); // Import Mongoose
const cryptoRoutes = require('./routes/cryptoRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Rate Limiting Configuration
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes.',
});

// Apply rate limiting to all requests
app.use(limiter);

// CORS Configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Allow cookies if needed
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json());

// Connect to MongoDB
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/crypto-predictor';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => {
  console.error('Failed to connect to MongoDB:', err.message);
  process.exit(1);
});

// Routes
app.use('/api/crypto', cryptoRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
