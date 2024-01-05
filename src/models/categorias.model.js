// @ts-check

// Dependencias
import { DataTypes } from "sequelize";

// Configuración de DB
import { SequelizePool } from "../database/config.pool.js";
import Elementos from "./elementos.model.js";

/**
 * Modelo para la estructura categorías para la DB
 */
const Categorias = SequelizePool.define(
    "Categorias",
    {
        Pk_Categoria: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        Nombre_Categoria: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        Imagen_Categoria: {
            type: DataTypes.STRING(200),
            allowNull: true,
        },
    },
    {
        timestamps: false
    }
);

/**
 * Conexión de uno a muchos con elementos
 */
Categorias.hasMany(Elementos, {
    sourceKey: "Pk_Categoria",
    foreignKey: "Fk_Categoria",
});

/**
 * Conexión de uno a muchos con categorías
 */
Elementos.belongsTo(Categorias, {
    as: "Pk_Categoria",
    foreignKey: "Fk_Categoria",
});


export default Categorias;
