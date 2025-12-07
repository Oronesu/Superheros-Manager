import mongoose from 'mongoose';

const heroSchema = new mongoose.Schema({
  id: { type: Number, unique: true }, // 🔹 plus de required
  nom: { type: String, required: true },
  alias: String,
  univers: { type: String, enum: ['Marvel', 'DC', 'Autre'], required: true },
  image: String,
  powerstats: {
    intelligence: { type: Number, default: 0 },
    strength: { type: Number, default: 0 },
    speed: { type: Number, default: 0 },
    durability: { type: Number, default: 0 },
    power: { type: Number, default: 0 },
    combat: { type: Number, default: 0 },
  },
});

// Hook pour auto-incrémenter l'id
heroSchema.pre("save", async function (next) {
  if (!this.id) {
    const lastHero = await mongoose.model("Hero").findOne().sort({ id: -1 });
    this.id = lastHero ? lastHero.id + 1 : 1;
  }
  next();
});

export default mongoose.model('Hero', heroSchema);
