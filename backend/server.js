import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import plantRoutes from './src/routes/plants.js';
import authRoutes from './src/routes/auth.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// connect DB
connectDB();

app.get('/', (req, res) => res.json({ status: 'ok', service: 'plant-catalog-api' }));

// routes
app.use('/api/auth', authRoutes);
app.use('/api/plants', plantRoutes);

const PORT = process.env.PORT || 5000;
module.exports = app;
