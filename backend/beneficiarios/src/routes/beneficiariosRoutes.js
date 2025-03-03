"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const beneficiariosController_1 = require("../controllers/beneficiariosController");
const router = express_1.default.Router();
// Rutas existentes
router.get('/', beneficiariosController_1.getBeneficiarios);
router.post('/', beneficiariosController_1.createBeneficiario);
router.post('/login', beneficiariosController_1.login);
router.put('/:id', beneficiariosController_1.updateBeneficiario);
router.delete('/:id', beneficiariosController_1.deleteBeneficiario);
router.get('/user/:UsuarioID/role', beneficiariosController_1.getUserRole);
router.get("/:id/check-poliza", beneficiariosController_1.checkPoliza);
router.get("/:id/check-vehiculo", beneficiariosController_1.checkVehiculo);
router.get("/:BeneficiarioID/check-new", beneficiariosController_1.checkIfNewBeneficiario);
// Ruta para obtener los beneficiarios por DNI
router.get("/validar/:DNI", beneficiariosController_1.getBeneficiariosPorDNI);
router.get('/validar/email/:email', beneficiariosController_1.verificarEmail);
router.get('/validar/dni/:dni', beneficiariosController_1.verificarDNI);
// Nueva ruta para obtener el BeneficiarioID basado en UsuarioID
router.get('/user/:UsuarioID/beneficiario', beneficiariosController_1.getBeneficiarioPorUsuarioID);
exports.default = router;
