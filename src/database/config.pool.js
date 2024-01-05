// @ts-check

// Configuración de entorno
import { config } from "dotenv";
config({ path: "./src/envs/.env.example" });

// Dependencias
import { Sequelize } from "sequelize";

/**
 * Instancia para la conexión con la base de datos
 */
export const SequelizePool = CreatePool();

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
            throw new Error("Error de crendeciales en la conexión con la base de datos");
        }

        const sequelize = new Sequelize(
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

        return sequelize;

    } catch (error) {
        throw error;
    }
}

/**
 * Función para centralizar la conexión con la base de datos
 * 
 */
export async function Database() {
    try {

        await SequelizePool.authenticate()
        await SequelizePool.sync()

        console.log("\n { Database } - Conexión establecida ");

    } catch (error) {
        throw error;
    }
}
