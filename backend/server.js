import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import plantRoutes from './src/routes/plants.js';
import authRoutes from './src/routes/auth.js';

dotenv.config();
const app = express();

app.use(cors({
  origin: "*", // or frontend URL if you want to restrict
}));
app.use(express.json());

// connect DB
connectDB();

app.get('/', (req, res) => res.json({ status: 'ok', service: 'plant-catalog-api' }));

// routes
app.use('/api/auth', authRoutes);
app.use('/api/plants', plantRoutes);
const PORT = process.env.PORT || 5000;

// Only listen locally (not on Vercel)
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// Export app for Vercel
export default app;

