// @ts-check

// Dependencias
import { Router } from "express";

/**
 * Instancia de la rutas globables con sus metodos
 */
const router = Router();

router.get("/", (_req, res) =>
    res.send("<h1> Servidor de Biblioteca </h1>")
)

router.get("/*", (_req, res) =>
    res.send("<h1> 404 Página no encontrada </h1>")
)

export { router as global_routes };
