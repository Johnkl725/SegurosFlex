import express from "express";
import { registrarSiniestro, listarSiniestros , asignarTaller} from "../controllers/siniestrosController";

const router = express.Router();

// Ruta para registrar un siniestro
router.post("/", registrarSiniestro);

// Ruta para listar todos los siniestros
router.get("/", listarSiniestros);

// Ruta para asignar todos los siniestros
router.put("/asignar", asignarTaller);

export default router;
