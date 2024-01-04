// Dependencias
import { Sequelize } from "sequelize";

/**
 * Configuración para la conexión con la base de datos
 */
export const DatabasePool = new Sequelize(
    process.env.DB_NAME, // Nombre DB
    process.env.DB_USER, // Usuario DB
    process.env.DB_PASS, // Contraseña DB
    {
        dialect: process.env.DB_DIALECT, // Tipo DB
        host: process.env.DB_HOST, // Host DB
        port: Number(process.env.DB_PORT), // Puerto DB
        // logging: false, // Inhabilitar el Logger DB
    }
);
