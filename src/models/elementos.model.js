// @ts-check

// Dependencias
import { DataTypes } from "sequelize";

// Configuración de DB
import { DatabasePool } from "../database/config.pool.js";
import Movimientos from "./movimientos.model.js";

/**
 * Modelo de la estructura de elementos para la DB
 */
const Elementos = DatabasePool.define(
    "Elementos",
    {
        Pk_Elemento: {
            type: DataTypes.STRING(15),
            primaryKey: true,
        },
        Estado_Elemento: {
            type: DataTypes.ENUM("Disponible", "NoDisponible"),
            defaultValue: "Disponible",
        },
        Tipo_Elemento: {
            type: DataTypes.ENUM("Aporte", "Libros", "Proyector", "Computador"),
            allowNull: false,
        },
        Stock: {
            type: DataTypes.INTEGER,
        },
        Imagen: {
            type: DataTypes.STRING(200),
            allowNull: true,
        },
        Nombre_Elemento: {
            type: DataTypes.STRING(80),
            allowNull: false,
        },
        Autor: {
            type: DataTypes.STRING(80),
            allowNull: true,
        },
        Descripcion: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        Archivo_Aporte: {
            type: DataTypes.STRING(200),
            allowNull: true,
        },
    },
    {
        timestamps: false,
    }
);

/**
 * Conexión de uno a muchos con movimientos
 */
Elementos.hasMany(Movimientos, {
    sourceKey: "Pk_Elemento",
    foreignKey: "Fk_Elemento"
});

/**
 * Conexión de uno a muchos con elementos
 */
Movimientos.belongsTo(Elementos, {
    as: "Pk_Elemento",
    foreignKey: "Fk_Elemento",
});

export default Elementos;
