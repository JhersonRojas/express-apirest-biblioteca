// @ts-check

import { SequelizeScopeError } from 'sequelize';
import Usuarios from '../models/usuarios.model.js';

/**
 * Controlador para obtener los usuarios
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
                usuarios
            }
        })

    } catch (error) {
        next(error)
    }
}

/**
 * Controlador para registrar un usuario
 * 
 * @param {import("express").Request} req Metodo para obtener el contenido de la petición
 * @param {import("express").Response} res Metodo para retornar una respuesta
 * @param {import("express").NextFunction} next - Función para invocar el siguiente middleware.
 * 
 * @returns {Promise<import("express").Response | void>} Retorna una respuesta al cliente o captura algún posible error
 */
export async function createUsuario(req, res, next) {
    try {
        const { data } = req.body;
        const { id, tipo, nombre, correo, telefono } = data.usuario;

        // verficando los campos necesarios
        if (!id || !tipo || !nombre || !correo) {
            return res.status(400).json({
                confirm: false,
                error: "Error, se deben enviar todos los datos requeridos del usuario"
            })
        }

        // Registriando el usuario en la DB
        const usuario = await Usuarios.create({
            Identificacion: id,
            Tipo_Usuario: tipo,
            Nombre: nombre,
            Correo: correo,
            Clave: crypto.randomUUID(),
            Telefono: telefono,
        })

        // validando si el usuario se ingreso
        if (!usuario) {
            throw new Error("Error al ingresar un usuario")
        }

        return res.status(200).json({
            confirm: true,
            msg: "Se ha ingresado el usuario"
        })

    } catch (error) {

        // Retornando un mensaje de error si algún dato ya existe
        if (error instanceof SequelizeScopeError && error.name) {
            return res.status(200).json({
                confirm: false,
                error: "Error, algún dato unico del usuario ya existe en el registro"
            })
        }

        next(error)
    }
}

/**
 * Controlador para actualizar un usuario
 * 
 * @param {import("express").Request} req Metodo para obtener el contenido de la petición
 * @param {import("express").Response} res Metodo para retornar una respuesta
 * @param {import("express").NextFunction} next - Función para invocar el siguiente middleware.
 * 
 * @returns {Promise<import("express").Response | void>} Retorna una respuesta al cliente o captura algún posible error
 */
export async function updateUsuario(req, res, next) {
    try {
        const { data } = req.body;
        const { id, tipo, nombre, correo, telefono } = data.usuario;

        // verficando los campos necesarios
        if (!id) {
            return res.status(400).json({
                confirm: false,
                error: "Error, debe obtenerse la identificación del usuario a actualizar"
            })
        }

        // Actualizando el usuario
        const usuario = await Usuarios.update({
            ...(tipo && tipo !== "" && { Tipo_Usuario: tipo }),
            ...(nombre && nombre !== "" && { Nombre: nombre }),
            ...(correo && correo !== "" && { Correo: correo }),
            ...(telefono && telefono !== "" && { Telefono: telefono }),
        }, {
            where: {
                Identificacion: id,
            }
        })

        // validando si el usuario se actualizo
        if (!usuario) {
            throw new Error("Error al actualizar un usuario")
        }

        return res.status(200).json({
            confirm: true,
            msg: "Se ha actualizado el usuario"
        })

    } catch (error) {
        next(error)
    }
}

/**
 * Controlador para eliminar un usuario
 * 
 * @param {import("express").Request} req Metodo para obtener el contenido de la petición
 * @param {import("express").Response} res Metodo para retornar una respuesta
 * @param {import("express").NextFunction} next - Función para invocar el siguiente middleware.
 * 
 * @returns {Promise<import("express").Response | void>} Retorna una respuesta al cliente o captura algún posible error
 */
export async function deleteUsuario(req, res, next) {
    try {
        const { data } = req.body;
        const { id } = data.usuario;

        // verficando los campos necesarios
        if (!id) {
            return res.status(400).json({
                confirm: false,
                error: "Error, debe obtenerse la identificación del usuario a eliminar"
            })
        }

        // Eliminando al usuario
        const usuario = await Usuarios.destroy({
            where: {
                Identificacion: id,
            }
        })

        // validando si el usuario se elimino
        if (!usuario) {
            throw new Error("Error al eliminar un usuario")
        }

        return res.status(200).json({
            confirm: true,
            msg: "Se ha eliminado el usuario"
        })

    } catch (error) {
        next(error)
    }
}
