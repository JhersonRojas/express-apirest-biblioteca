// @ts-check

// Dependencias
import { Sequelize } from "sequelize";

/**
 * Instancia para la conexión con la base de datos
 */
export const DatabasePool = CreatePool();

/**
 * Creación de la conexión con la base de datos
 *
 * @returns { Sequelize } Conexión con la base de datos con las credenciales establecidas
 */
function CreatePool() {
    try {

        if (
            !process.env.DB_NAME ||
            !process.env.DB_USER ||
            !process.env.DB_PASS ||
            !process.env.DB_PORT ||
            !process.env.DB_HOST ||
            !process.env.DB_DIALECT
        ) {
            throw new Error(
                "Error de crendeciales en la conexión con la base de datos"
            );
        }

        console.log("\n { Database } - Conexión establecida ");

        return new Sequelize(
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

    } catch (error) {
        throw error;
    }
}
