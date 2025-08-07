const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const flashcardRoutes = require('./routes/flashcardRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Enable CORS for your frontend URL
app.use(cors({
  origin: process.env.FRONTEND_URL, // Defined in .env
  methods: ['GET', 'POST'],
  credentials: true
}));

// API Routes
app.use('/api', flashcardRoutes);

// Serve frontend (production)
const __dirname1 = path.resolve();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname1, '/frontend/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname1, 'frontend', 'dist', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('API is running...');
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
