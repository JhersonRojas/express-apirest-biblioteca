// @ts-check

// Dependencias
import { Router } from "express";
import { createUsuario, deleteUsuario, getUsuarios, updateUsuario } from "../controllers/usuarios.controller.js";

/**
 * Instancia de la rutas globables con sus metodos
 */
const router = Router();

/**
 * Endpoints de la logica para usuarios de la biblioteca
 */
router.get("/usuarios", getUsuarios);
router.post("/usuarios", createUsuario);
router.put("/usuarios", updateUsuario);
router.delete("/usuarios", deleteUsuario);

export { router as usuarios_routes };
