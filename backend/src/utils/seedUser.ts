import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User";

dotenv.config();

const seedUser = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);

    const existing = await User.findOne({ email: "admin@example.com" });
    if (!existing) {
      const user = new User({
        email: "admin@example.com",
        password: "password123", // 🔹 sera hashé par ton modèle User
        role: "admin",
      });
      await user.save();
      console.log("✅ Utilisateur par défaut créé : admin@example.com / password123");
    } else {
      console.log("ℹ️ Utilisateur par défaut déjà présent");
    }

    process.exit();
  } catch (error) {
    console.error("❌ Erreur lors de la création de l’utilisateur :", error);
    process.exit(1);
  }
};

seedUser();
