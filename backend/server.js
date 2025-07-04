require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

// Routes
const auth = require('./routes/auth');
const snippets = require('./routes/snippetRoutes');

const app = express();

// Connect Database
connectDB();

// CORS Configuration
const allowedOrigins = [
  'http://localhost:5173', // Local development
  'https://devsnipa.vercel.app' // Your live Vercel frontend
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', auth);
app.use('/api/snippets', snippets);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));