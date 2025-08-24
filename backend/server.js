import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import plantRoutes from './src/routes/plants.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// connect DB then start
connectDB();

app.get('/', (req, res) => res.json({ status: 'ok', service: 'plant-catalog-api' }));
app.use('/api/plants', plantRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🌱 API running on port ${PORT}`));
