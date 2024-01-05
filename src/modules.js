// @ts-check

// Configuración de entorno
import { config } from "dotenv";
config({ path: "./src/envs/.env.example" });

// Importación de dependencias
import body from "body-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";

// Rutas del servidor
import { global_routes } from "./routes/global.routes.js";
import { usuarios_routes } from "./routes/usuarios.routes.js";

// Middlewares
import { handleErrors } from "./middlewares/errors.middleware.js";

/**
 * Función encargada de la configuración del servidor y sus dependencias
 *
 */
async function Server() {
    try {

        // Configuraciones del servidor
        return await new Promise((resolve, reject) => {

            // Instancia del servidor
            const modules = express();

            // Instancias de variables de entorno
            const PORT = process.env.SERVER_PORT;
            const MODE = process.env.SERVER_MODE;

            if (!MODE || !PORT) {
                return reject("Error de credenciales en la configuración del servidor");
            }

            // Configuración del Logger sobre las peticiones
            if (MODE === "development") {
                modules.use(morgan("dev"));
            }

            if (MODE === "production") {
                modules.use(morgan("common", { skip: (_req, res) => res.statusCode < 400 }));
            }

            // Configuración del modulos
            modules.use(cors({ origin: true, credentials: true }));
            modules.use(body.json({ limit: "15mb" }));
            modules.use(body.urlencoded({ limit: "15mb", extended: true }));

            // Adicionando rutas
            modules.use(global_routes);
            modules.use(usuarios_routes);
            modules.use(handleErrors)

            // Estableciendo el inicio del servidor
            modules.listen(PORT);

            console.log(` { Server } - Servidor en marcha http://localhost:${PORT} \n`);

            return resolve("Servidor iniciado");
        });

    } catch (error) {
        throw error;
    }
}

export { Server };
