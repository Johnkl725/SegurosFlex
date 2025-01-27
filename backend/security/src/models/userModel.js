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
exports.createUser = exports.findUserByEmail = void 0;
const db_1 = __importDefault(require("../config/db"));
const mssql_1 = __importDefault(require("mssql"));
// Función para llamar al procedimiento almacenado y buscar usuario por email
const findUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const poolConnection = yield db_1.default;
        const result = yield poolConnection
            .request()
            .input('Email', mssql_1.default.VarChar, email)
            .execute('sp_FindUserByEmail');
        if (result.recordset.length > 0) {
            return result.recordset[0];
        }
        return null;
    }
    catch (error) {
        console.error('Error al ejecutar sp_FindUserByEmail:', error);
        throw new Error('Error en la base de datos');
    }
});
exports.findUserByEmail = findUserByEmail;
// Función para llamar al procedimiento almacenado y crear un usuario
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const poolConnection = yield db_1.default;
        yield poolConnection
            .request()
            .input('Nombre', mssql_1.default.VarChar, user.Nombre)
            .input('Apellido', mssql_1.default.VarChar, user.Apellido)
            .input('Email', mssql_1.default.VarChar, user.Email)
            .input('Password', mssql_1.default.VarChar, user.Password)
            .input('Rol', mssql_1.default.VarChar, user.Rol)
            .execute('sp_CreateUser');
    }
    catch (error) {
        console.error('Error al ejecutar sp_CreateUser:', error);
        throw new Error('Error en la base de datos');
    }
});
exports.createUser = createUser;
