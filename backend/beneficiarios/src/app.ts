import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import beneficiariosRoutes from './routes/beneficiariosRoutes';

// Configurar variables de entorno
dotenv.config();

// Crear aplicación
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/beneficiarios', beneficiariosRoutes);

// Middleware de manejo de errores
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Error interno del servidor' });
});

export default app;
