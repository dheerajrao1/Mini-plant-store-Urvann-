import express from 'express';
import Plant from '../models/Plant.js';
import { requireAuth, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// GET /api/plants?q=&cat=Category
router.get('/', async (req, res) => {
  try {
    const { q, cat } = req.query;
    const query = {};

    if (q && q.trim()) {
      const kw = q.trim();
      // search by name or by category keyword (case-insensitive)
      query.$or = [
        { name: { $regex: kw, $options: 'i' } },
        { categories: { $elemMatch: { $regex: kw, $options: 'i' } } }
      ];
    }

    if (cat && cat !== 'All') {
      query.categories = { $in: [cat] };
    }

    const plants = await Plant.find(query).sort({ createdAt: -1 });
    res.json(plants);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch plants', error: err.message });
  }
});

// POST /api/plants  (admin only)
router.post('/', requireAuth, adminOnly, async (req, res) => {
  try {
    const { name, price, categories, availability } = req.body || {};
    if (!name || price == null) {
      return res.status(400).json({ message: 'Name and price are required' });
    }
    const cats = Array.isArray(categories)
      ? categories
      : (typeof categories === 'string' ? categories.split(',').map(s => s.trim()).filter(Boolean) : []);

    const created = await Plant.create({
      name: name.trim(),
      price: Number(price),
      categories: cats,
      availability: Boolean(availability)
    });
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add plant', error: err.message });
  }
});

export default router;
