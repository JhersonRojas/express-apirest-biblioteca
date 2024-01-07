// @ts-check

/**
 * Middleware para manejar errores en las rutas.
 *
 * @param {Error} error - Objeto de error capturado.
 * @param {import("express").Request} req - Objeto de solicitud de Express.
 * @param {import("express").Response} res - Objeto de respuesta de Express.
 * @param {import("express").NextFunction} _next - Función para invocar el siguiente middleware.
 *
 * @returns {import("express").Response}
 */
export function handleErrors(error, req, res, _next) {
    console.log({
        ...(error.message ? { error: error.message } : {}),
        resumen: `Error en la ruta ${req.url} metodo ${req.method}`,
        detalles: error,
    });

    return res.status(500).json({
        confirm: false,
        error: "An internal server error occurred",
    });
}
