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

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // your frontend URL
  credentials: true
}));
app.use(express.json());


// Routes
app.use('/api/auth', auth);
app.use('/api/snippets', snippets);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));