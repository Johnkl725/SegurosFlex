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
exports.obtenerPolizasPorUsuarioID = exports.updatePolizaEstado = exports.getPolizasByDNI = exports.getPolizaByID = exports.getPolizas = exports.getPolizaPorBeneficiarioID = exports.createPoliza = void 0;
const polizaModel_1 = __importDefault(require("../models/polizaModel"));
const db_1 = __importDefault(require("../config/db"));
// Crear póliza
const createPoliza = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { BeneficiarioID, TipoPoliza } = req.body;
    console.log("BeneficiarioID:", BeneficiarioID);
    try {
        // Verificar si el BeneficiarioID existe en la tabla beneficiario
        const { rows: beneficiarioResult } = yield db_1.default.query("SELECT * FROM beneficiario WHERE usuarioid = $1", [BeneficiarioID]);
        console.log("Beneficiario encontrado:", beneficiarioResult);
        // Verificar si no se encontró el beneficiario
        if (beneficiarioResult.length === 0) {
            res.status(400).json({ error: "El BeneficiarioID no existe." });
            return;
        }
        // Acceder al primer objeto del resultado
        const beneficiario = beneficiarioResult[0];
        console.log("Beneficiario:", beneficiario);
        console.log(beneficiario.beneficiarioid);
        // Llamar al modelo para crear la póliza
        const result = yield polizaModel_1.default.createPoliza(beneficiario.beneficiarioid, TipoPoliza);
        // Responder con éxito
        res.status(201).json({
            message: "Póliza creada exitosamente",
            polizaID: result.insertId,
        });
    }
    catch (error) {
        console.error('Error al crear la póliza:', error);
        res.status(500).json({ error: 'Error al crear la póliza' });
    }
});
exports.createPoliza = createPoliza;
// Obtener póliza por BeneficiarioID
const getPolizaPorBeneficiarioID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { BeneficiarioID } = req.params;
    try {
        const { rows } = yield db_1.default.query("SELECT polizaid FROM poliza WHERE beneficiarioid = $1", [BeneficiarioID]);
        if (rows.length === 0) {
            res.status(404).json({ message: "Póliza no encontrada." });
            return;
        }
        res.status(200).json({ PolizaID: rows[0].PolizaID });
    }
    catch (error) {
        console.error("Error al obtener PolizaID:", error);
        res.status(500).json({ error: "Error al obtener PolizaID" });
    }
});
exports.getPolizaPorBeneficiarioID = getPolizaPorBeneficiarioID;
// Obtener todas las pólizas
const getPolizas = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { beneficiarioID } = req.params;
        // Llamada al modelo para obtener las pólizas del beneficiario
        const result = yield polizaModel_1.default.getPolizas();
        console.log(result);
        if (!result || result.length === 0) {
            res.status(404).json({ message: "No se encontraron pólizas." });
            return;
        }
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
});
exports.getPolizas = getPolizas;
// Obtener póliza por ID
const getPolizaByID = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { polizaID } = req.params;
        // Llamada al modelo para obtener la póliza por ID
        const result = yield polizaModel_1.default.getPolizaByID(Number(polizaID));
        if (!result || result.length === 0) {
            res.status(404).json({ message: "Póliza no encontrada." });
            return;
        }
        res.status(200).json(result[0]);
    }
    catch (error) {
        next(error);
    }
});
exports.getPolizaByID = getPolizaByID;
// Obtener pólizas por DNI
const getPolizasByDNI = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { DNI } = req.params;
    try {
        // Llamada al modelo para obtener las pólizas del beneficiario por su DNI
        const result = yield polizaModel_1.default.getPolizasByDNI(DNI);
        if (!result || result.length === 0) {
            res.status(404).json({ message: "No se encontraron pólizas para este beneficiario." });
            return;
        }
        res.status(200).json(result); // Devuelve las pólizas encontradas
    }
    catch (error) {
        next(error);
    }
});
exports.getPolizasByDNI = getPolizasByDNI;
// Actualizar estado de póliza
const updatePolizaEstado = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { polizaID } = req.params;
    const { estado } = req.body; // Recibe el estado para actualizar (por ejemplo: 'Inactiva')
    try {
        if (!estado) {
            res.status(400).json({ error: "El estado es obligatorio." });
            return;
        }
        // Llamada al modelo para actualizar el estado de la póliza
        const result = yield polizaModel_1.default.updatePolizaEstado(Number(polizaID), estado);
        if (result.affectedRows === 0) {
            res.status(404).json({ message: "Póliza no encontrada." });
            return;
        }
        res.status(200).json({ message: "Estado de la póliza actualizado exitosamente." });
    }
    catch (error) {
        next(error);
    }
});
exports.updatePolizaEstado = updatePolizaEstado;
const obtenerPolizasPorUsuarioID = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { usuarioID } = req.params;
        // Consultar el beneficiarioID usando el usuarioID
        const { rows: beneficiarioRows } = yield db_1.default.query("SELECT beneficiarioid FROM beneficiario WHERE usuarioid = $1", [usuarioID]);
        if (beneficiarioRows.length === 0) {
            res.status(404).json({ error: "Beneficiario no encontrado" });
            return;
        }
        const beneficiarioID = beneficiarioRows[0].beneficiarioid;
        // Obtener las pólizas asociadas a este beneficiarioID
        const { rows: polizasRows } = yield db_1.default.query("SELECT * FROM poliza WHERE beneficiarioid = $1", [beneficiarioID]);
        if (polizasRows.length === 0) {
            res.status(404).json({ error: "No se encontraron pólizas para este beneficiario" });
            return;
        }
        res.status(200).json(polizasRows);
    }
    catch (error) {
        console.error("Error al obtener las pólizas:", error);
        res.status(500).json({ error: "Hubo un problema al obtener las pólizas" });
    }
});
exports.obtenerPolizasPorUsuarioID = obtenerPolizasPorUsuarioID;
