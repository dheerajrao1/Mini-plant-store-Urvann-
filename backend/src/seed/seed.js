import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import Plant from '../models/Plant.js';

dotenv.config();

const plants = [
  { name: 'Money Plant (Pothos)', price: 199, categories: ['Indoor', 'Air Purifying', 'Home Decor'], available: true, image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=1' },
  { name: 'Snake Plant', price: 249, categories: ['Indoor', 'Air Purifying', 'Low Maintenance'], available: true, image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=2' },
  { name: 'Aloe Vera', price: 149, categories: ['Indoor', 'Succulent', 'Low Maintenance'], available: true, image: 'https://images.unsplash.com/photo-1535916707207-4f1c7b1bd4f3?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=3' },
  { name: 'Areca Palm', price: 399, categories: ['Indoor', 'Air Purifying', 'Home Decor'], available: true, image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=4' },
  { name: 'Peace Lily', price: 299, categories: ['Indoor', 'Air Purifying', 'Flowering'], available: true, image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=5' },
  { name: 'Spider Plant', price: 179, categories: ['Indoor', 'Air Purifying'], available: true, image: 'https://images.unsplash.com/photo-1511974035430-5de47d3b95da?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=6' },
  { name: 'ZZ Plant', price: 349, categories: ['Indoor', 'Low Maintenance', 'Office'], available: true, image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=7' },
  { name: 'Rubber Plant', price: 329, categories: ['Indoor', 'Home Decor'], available: true, image: 'https://images.unsplash.com/photo-1511974035430-5de47d3b95da?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=8' },
  { name: 'Fiddle Leaf Fig', price: 699, categories: ['Indoor', 'Home Decor'], available: true, image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=9' },
  { name: 'Boston Fern', price: 229, categories: ['Indoor', 'Air Purifying'], available: true, image: 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=10' },
  { name: 'Jade Plant', price: 159, categories: ['Indoor', 'Succulent', 'Low Maintenance'], available: true, image: 'https://images.unsplash.com/photo-1524594154903-5f2b5f6f6b84?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=11' },
  { name: 'Bougainvillea', price: 199, categories: ['Outdoor', 'Flowering'], available: true, image: 'https://images.unsplash.com/photo-1488805990569-3c9e1d76d51c?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=12' },
  { name: 'Hibiscus', price: 179, categories: ['Outdoor', 'Flowering'], available: true, image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=13' },
  { name: 'Mint', price: 59, categories: ['Outdoor', 'Herb'], available: true, image: 'https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=14' },
  { name: 'Basil', price: 129, categories: ['Outdoor', 'Herb'], available: true, image: 'https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=15' },
  { name: 'Lavender', price: 259, categories: ['Outdoor', 'Flowering', 'Home Decor'], available: true, image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=16' },
  { name: 'Orchid', price: 499, categories: ['Indoor', 'Flowering'], available: false, image: 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=17' },
  { name: 'Cactus', price: 180, categories: ['Succulent', 'Low Maintenance'], available: true, image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=18' },
  { name: 'Pothos N’Joy', price: 249, categories: ['Indoor', 'Air Purifying', 'Home Decor'], available: true, image: 'https://images.unsplash.com/photo-1524594154903-5f2b5f6f6b84?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=19' },
  { name: 'Monstera Deliciosa', price: 699, categories: ['Indoor', 'Home Decor'], available: true, image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=20' },
  { name: 'Kalanchoe', price: 159, categories: ['Indoor', 'Succulent', 'Flowering'], available: true, image: 'https://images.unsplash.com/photo-1524594154903-5f2b5f6f6b84?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=21' },
  { name: 'Philodendron', price: 259, categories: ['Indoor', 'Home Decor'], available: true, image: 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=22' },
  { name: 'Dracaena', price: 299, categories: ['Indoor', 'Air Purifying', 'Office'], available: true, image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=23' },
  { name: 'Ficus Lyrata', price: 1199, categories: ['Indoor', 'Home Decor'], available: true, image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=24' }
];

const seed = async () => {
  try {
    await connectDB();
    await Plant.deleteMany({});
    await Plant.insertMany(plants);
    console.log(`✅ Seeded ${plants.length} plants`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error', err);
    process.exit(1);
  }
};

seed();
