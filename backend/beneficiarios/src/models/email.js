"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserByEmail = void 0;
const db_1 = __importDefault(require("../config/db")); // Asegúrate de tener correctamente configurada la conexión a la base de datos.
const findUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Ejecuta la función creada en PostgreSQL para obtener el usuario por su correo electrónico
        const { rows } = yield db_1.default.query('SELECT * FROM public.sp_finduserbyemail($1)', [email]);
        // Si se encontró el usuario, retornarlo, de lo contrario retornar null
        if (rows.length > 0) {
            // Verifica si el campo 'Password' está presente en el objeto antes de devolverlo
            console.log(rows[0]); // Para ver todos los campos devueltos
            return rows[0]; // Retorna el primer usuario encontrado
        }
        return null; // Si no se encuentra el usuario, retorna null
    }
    catch (error) {
        console.error('Error al ejecutar la función sp_finduserbyemail:', error);
        throw new Error('Error en la base de datos');
    }
});
exports.findUserByEmail = findUserByEmail;
