require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/venues', require('./src/routes/venueRoutes'));
app.use('/api/slots', require('./src/routes/slotRoutes'));
app.use('/api/bookings', require('./src/routes/bookingRoutes'));

app.get('/', (req, res) => {
  res.send('Play Now API is running...');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
