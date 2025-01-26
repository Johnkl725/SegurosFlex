import app from './app';
import pool from './config/db';

const PORT = process.env.PORT || 3000;

pool.getConnection()
    .then(() => {
        console.log('Conectado a la base de datos MySQL');
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Error al conectar a la base de datos:', err);
    });