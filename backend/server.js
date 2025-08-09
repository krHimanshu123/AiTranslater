const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const translateRoutes = require('./routes/translate');

const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err));


app.use('/api/translate', translateRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
