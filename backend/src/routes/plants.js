import express from 'express';
import Plant from '../models/Plant.js';

const router = express.Router();

// GET /api/plants
// Query params:
//  q - search name or category keyword (case-insensitive, substring)
//  cat - filter by exact category (optional)
//  page, limit (optional)
router.get('/', async (req, res) => {
  try {
    const { q, cat, page = 1, limit = 50 } = req.query;
    const filters = {};

    if (q) {
      // search name OR categories elements matching keyword
      const regex = { $regex: q, $options: 'i' };
      filters.$or = [{ name: regex }, { categories: regex }];
    }

    if (cat && cat !== 'All') {
      filters.categories = cat;
    }

    const skip = (Number(page) - 1) * Number(limit);
    const [items, total] = await Promise.all([
      Plant.find(filters).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
      Plant.countDocuments(filters)
    ]);

    res.json({ items, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/plants
router.post('/', async (req, res) => {
  try {
    const { name, price, categories = [], available = true, image = '' } = req.body;
    if (!name || price == null) return res.status(400).json({ error: 'Name and price required' });
    const plant = await Plant.create({ name: name.trim(), price: Number(price), categories, available, image });
    res.status(201).json(plant);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
