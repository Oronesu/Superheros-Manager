import express from 'express';
import { protect } from '../middleware/authMiddleware';
import Hero from '../models/Hero';
import {
  getHeroById,
  createHero,
  updateHero,
  deleteHero
} from '../controllers/heroController';
import { upload } from '../middleware/uploadMiddleware';

const router = express.Router();

// GET avec filtres + pagination
router.get('/', async (req, res) => {
  try {
    const { nom, univers, alias, sort = 'id' } = req.query;

    const filter: any = {};
    if (nom) filter.nom = { $regex: nom, $options: 'i' };
    if (univers) filter.univers = univers;
    if (alias) filter.alias = { $regex: alias, $options: 'i' };

    const heroes = await Hero.find(filter)
      .sort({ [sort as string]: 1 })
      .select('id nom alias univers powerstats image');

    res.json(heroes); // 🔹 renvoie directement un tableau
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
});




// GET un héros par id
router.get('/:id', protect, getHeroById);

// POST créer un héros (avec upload possible et auth)
router.post("/", protect, upload.single("image"), createHero);

// PUT mettre à jour un héros
router.put("/:id", protect, upload.single("image"), updateHero);

// DELETE supprimer un héros
router.delete('/:id', protect, deleteHero);

// POST upload image
router.post('/:id/image', upload.single('image'), async (req, res) => {
  try {
    const hero = await Hero.findOne({ id: req.params.id });
    if (!hero) return res.status(404).json({ message: 'Héros non trouvé' });

    if (!req.file) return res.status(400).json({ message: 'Fichier image requis' });

    hero.image = `/uploads/${req.file.filename}`;
    await hero.save();

    res.json({ message: 'Image mise à jour', image: hero.image });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
});

export default router;
