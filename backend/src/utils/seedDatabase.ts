import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Hero from '../models/Hero';
import fs from 'fs';
import path from 'path';

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);

    const dataPath = path.join(__dirname, '../../SuperHerosComplet.json');
    const rawData = fs.readFileSync(dataPath, 'utf-8');
    const parsed = JSON.parse(rawData);

    const rawHeroes = parsed.superheros;

    const heroes = rawHeroes.map((hero: any) => ({
      id: hero.id,
      nom: hero.name,
      alias: hero.biography.fullName || '',
      univers: hero.biography.publisher?.includes('DC') ? 'DC' :
                hero.biography.publisher?.includes('Marvel') ? 'Marvel' : 'Autre',
      powerstats: {
        intelligence: hero.powerstats.intelligence || 0,
        strength: hero.powerstats.strength || 0,
        speed: hero.powerstats.speed || 0,
        durability: hero.powerstats.durability || 0,
        power: hero.powerstats.power || 0,
        combat: hero.powerstats.combat || 0,
        image: hero.images?.md || '',
      },
    }));

    await Hero.deleteMany({});
    await Hero.insertMany(heroes);

    console.log(`✅ Importation réussie : ${heroes.length} héros ajoutés`);
    process.exit();
  } catch (error) {
    console.error('❌ Erreur d’importation :', error);
    process.exit(1);
  }
};

seedDatabase();
