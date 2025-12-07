import { Request, Response } from 'express';
import Hero from '../models/Hero';


export const getAllHeroes = async (req: Request, res: Response) => {
  try {
    const heroes = await Hero.find();
    res.json(heroes);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

export const getHeroById = async (req: Request, res: Response) => {
  try {
    const hero = await Hero.findOne({ id: parseInt(req.params.id) });
    if (!hero) return res.status(404).json({ message: 'Héros non trouvé' });
    res.json(hero);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};


export const createHero = async (req: Request, res: Response) => {
  try {
    const heroData = req.body;

    // 🔹 Si un fichier est uploadé, on stocke son chemin
    if (req.file) {
      heroData.image = `/uploads/${req.file.filename}`;
    }

    const newHero = new Hero(heroData);
    const savedHero = await newHero.save();
    res.status(201).json(savedHero);
  } catch (error) {
    res.status(400).json({ message: "Erreur de création", error });
  }
};


export const updateHero = async (req: Request, res: Response) => {
  try {
    const hero = await Hero.findOne({ id: req.params.id });
    if (!hero) {
      return res.status(404).json({ message: "Héros non trouvé" });
    }

    // 🔹 Mettre à jour les champs texte
    hero.nom = req.body.nom || hero.nom;
    hero.alias = req.body.alias || hero.alias;
    hero.univers = req.body.univers || hero.univers;

    // 🔹 Image : upload OU lien externe
    if (req.file) {
      hero.image = `/uploads/${req.file.filename}`;
    } else if (req.body.image) {
      hero.image = req.body.image;
    }

    const updatedHero = await hero.save();
    res.json(updatedHero);
  } catch (error) {
    console.error("Erreur update héros:", error);
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

export const deleteHero = async (req: Request, res: Response) => {
  try {
    const deletedHero = await Hero.findOneAndDelete({ id: parseInt(req.params.id) });
    if (!deletedHero) return res.status(404).json({ message: 'Héros non trouvé' });
    res.json({ message: 'Héros supprimé' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

