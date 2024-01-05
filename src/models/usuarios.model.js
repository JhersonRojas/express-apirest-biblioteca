// @ts-check

// Dependencias
import { DataTypes } from "sequelize";

// Configuración de DB 
import { SequelizePool } from "../database/config.pool.js";
import Movimientos from "./movimientos.model.js";

/**
 * Modelo para la estructura de usuarios de la DB
 */
const Usuarios = SequelizePool.define(
    "Usuarios",
    {
        Identificacion: {
            type: DataTypes.BIGINT,
            primaryKey: true,
        },
        Nombre: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        Correo: {
            type: DataTypes.STRING(50),
            allowNull: true,
            unique: true
        },
        Clave: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        Telefono: {
            type: DataTypes.STRING(15),
            allowNull: true,
        },
        Tipo_Usuario: {
            type: DataTypes.ENUM(
                "Aprendiz",
                "Visitante",
                "Administrador",
            ),
            allowNull: false,
        }
    },
    {
        timestamps: false
    }
);

/**
 * Conexión de uno a muchos con movimientos
 */
Usuarios.hasMany(Movimientos, {
    sourceKey: "Identificacion",
    foreignKey: "Fk_Usuario",
});

/**
 * Conexión de uno a muchos con usuarios
 */
Movimientos.belongsTo(Usuarios, {
    as: "Identificacion",
    foreignKey: "Fk_Usuario",
});

export default Usuarios;