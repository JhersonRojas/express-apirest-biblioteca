// @ts-check

// Dependencias
import { Router } from "express";

/**
 * Instancia de la rutas globables con sus metodos
 */
const router = Router();

router.get("/usuarios", async (_req, res) => {
    try {

        return res.json({
            msg: "Lista de usuarios en el sistema",
            data: []
        });

    } catch (error) {
        return res.status(500).json({
            error: "No fue posible obtener los usuaios",
        });

    }
});

export { router as usuarios_routes };
