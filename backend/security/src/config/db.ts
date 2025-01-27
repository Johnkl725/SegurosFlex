import sql from 'mssql';
import dotenv from 'dotenv';

dotenv.config();  // Carga las variables de entorno desde .env

const dbConfig = {
  user: process.env.DB_USER || 'microservice_user',
  password: process.env.DB_PASSWORD || 'secure_password',
  server: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'SistemaFlexDB',
  port: parseInt(process.env.DB_PORT || '1433'),  // Puerto por defecto de SQL Server
  options: {
    encrypt: false,  // Usar true si estás en Azure
    trustServerCertificate: true,  // Usar true para desarrollo local
  },
  pool: {
    max: 10,            // Número máximo de conexiones simultáneas
    min: 0,             // Número mínimo de conexiones
    idleTimeoutMillis: 30000,  // Tiempo de espera de conexión inactiva (30 seg)
  },
};

const poolPromise = new sql.ConnectionPool(dbConfig)
  .connect()
  .then(pool => {
    console.log('Conexión exitosa a SQL Server');
    return pool;
  })
  .catch(err => {
    console.error('Error al conectar a SQL Server:', err);
    throw err;
  });

export default poolPromise;
