// @ts-check

// Dependencias
import { Router } from "express";
import { getUsuarios } from "../controllers/usuarios.controller.js";

/**
 * Instancia de la rutas globables con sus metodos
 */
const router = Router();

router.get("/usuarios", getUsuarios);

export { router as usuarios_routes };
