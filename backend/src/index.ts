import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import heroRoutes from './routes/heroRoutes';
import authRoutes from './routes/authRoutes';
import path from 'path';

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());


app.use('/api/heroes', heroRoutes);

app.use('/api/auth', authRoutes);


app.use("/uploads", express.static(path.join(__dirname, "./uploads")));


app.get('/', (_, res) => {
  res.send('🦸‍♂️ SuperHeroManager API est en ligne');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur le port ${PORT}`);
});
