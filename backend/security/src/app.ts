import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Microservicio de seguridad corriendo en el puerto ${PORT}`));
