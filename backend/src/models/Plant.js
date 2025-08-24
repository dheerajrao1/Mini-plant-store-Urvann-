import mongoose from 'mongoose';

const PlantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, index: true },
    price: { type: Number, required: true },
    categories: [{ type: String, index: true }],
    availability: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model('Plant', PlantSchema);
