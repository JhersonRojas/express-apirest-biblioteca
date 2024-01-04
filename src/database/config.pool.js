// @ts-check

// Dependencias
import { Sequelize } from "sequelize";

/**
 * Configuración para la conexión con la base de datos
 */
export function DatabasePool() {
    try {

        // Validación de las credenciales
        if (
            !process.env.DB_NAME ||
            !process.env.DB_USER ||
            !process.env.DB_PASS ||
            !process.env.DB_HOST ||
            !process.env.DB_PORT ||
            !process.env.DB_DIALECT
        ) {
            throw new Error("Error de conexión con la base de datos");
        }

        // Establecer conexión con la base de datos
        const connection = new Sequelize(
            process.env.DB_NAME, // Nombre DB
            process.env.DB_USER, // Usuario DB
            process.env.DB_PASS, // Contraseña DB
            {
                // @ts-ignore
                dialect: process.env.DB_DIALECT, // Tipo DB
                host: process.env.DB_HOST, // Host DB
                port: Number(process.env.DB_PORT), // Puerto DB
                logging: false, // Inhabilitar el Logger DB
            }
        );

        return connection;

    } catch (error) {
        throw error;
    }
}
