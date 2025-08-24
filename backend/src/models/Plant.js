import mongoose from 'mongoose';

const PlantSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  categories: { type: [String], default: [] },
  available: { type: Boolean, default: true },
  image: { type: String, default: '' } // optional image URL
}, { timestamps: true });

export default mongoose.model('Plant', PlantSchema);
