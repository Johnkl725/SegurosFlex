"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mssql_1 = __importDefault(require("mssql"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Carga las variables de entorno desde .env
const dbConfig = {
    user: process.env.DB_USER || 'microservice_user',
    password: process.env.DB_PASSWORD || 'secure_password',
    server: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'SistemaFlexDB',
    port: parseInt(process.env.DB_PORT || '1433'), // Puerto por defecto de SQL Server
    options: {
        encrypt: false, // Usar true si estás en Azure
        trustServerCertificate: true, // Usar true para desarrollo local
    },
    pool: {
        max: 10, // Número máximo de conexiones simultáneas
        min: 0, // Número mínimo de conexiones
        idleTimeoutMillis: 30000, // Tiempo de espera de conexión inactiva (30 seg)
    },
};
const poolPromise = new mssql_1.default.ConnectionPool(dbConfig)
    .connect()
    .then(pool => {
    console.log('Conexión exitosa a SQL Server');
    return pool;
})
    .catch(err => {
    console.error('Error al conectar a SQL Server:', err);
    throw err;
});
exports.default = poolPromise;
