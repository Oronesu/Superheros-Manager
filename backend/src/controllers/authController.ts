import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const generateToken = (user: any) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: '1d' }
  );
};

export const register = async (req: Request, res: Response) => {
  try {
    const user = new User(req.body);
    await user.save();
    const token = generateToken(user);
    res.status(201).json({ token });
  } catch (error) {
    res.status(400).json({ message: 'Erreur de création', error });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user || !(await user.comparePassword(req.body.password))) {
      return res.status(401).json({ message: 'Identifiants invalides' });
    }
    const token = generateToken(user);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};
