// @ts-check

// Dependencias
import { DataTypes } from "sequelize";

// Configuración de DB
import { DatabasePool } from "../database/config.pool.js";

/**
 * Modelo para la estructura de movimientos de la DB
 */
const Movimientos = DatabasePool.define(
    "Movimientos",
    {
        Pk_Movimiento: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        Estado_Movimiento: {
            type: DataTypes.ENUM("Solicitud", "Prestado", "Retornado", "Cancelado"),
            allowNull: false,
        },
        Jornada_Reserva: {
            type: DataTypes.ENUM("Mañana", "Tarde", "Completo"),
            allowNull: false,
        },
        Cantidad: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        Fecha_Inicio: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        Fecha_Fin: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        Observacion: {
            type: DataTypes.TEXT,
            allowNull: true,
        }
    },
    {
        timestamps: false
    }
);

export default Movimientos;
