// @ts-check

import Usuarios from '../models/usuarios.model.js'

/**
 * Controlador para obtener los usuarios del sistema
 * 
 * @param {import("express").Request} req Metodo para obtener el contenido de la petición
 * @param {import("express").Response} res Metodo para retornar una respuesta
 * @param {import("express").NextFunction} next - Función para invocar el siguiente middleware.
 * 
 * @returns {Promise<import("express").Response | void>} Retorna una respuesta al cliente o captura algún posible error
 */
export async function getUsuarios(req, res, next) {
    try {
        const page = Number(req.query.page || 1);
        const offset = (page - 1) * 25

        const usuarios = await Usuarios.findAll({
            limit: 25,
            offset
        })

        if (!usuarios || usuarios.length === 0) {
            return res.status(200).json({
                confirm: false,
                error: "No hay usuarios para mostrar"
            })
        }

        return res.status(200).json({
            confirm: true,
            data: {
                usuarios: []
            }
        })

    } catch (error) {
        next(error)
    }
}
