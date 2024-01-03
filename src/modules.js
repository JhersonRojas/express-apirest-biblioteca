// @ts-check

// Configuración de entorno
import { config } from "dotenv";
config({ path: "./src/envs/.env.example" });

// Importación de dependencias
import body from "body-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";

// Instancia del servidor
const modules = express();

const mode = process.env.SERVER_MODE;
const port = process.env.SERVER_PORT;
const start = "\n @ Server @ - Servidor corriendo \n"

// Configuración del modulos
modules.use(cors({ origin: true, credentials: true }));
modules.use(body.json({ limit: "15mb" }));
modules.use(body.urlencoded({ limit: "15mb", extended: true }));

// Configuración del Logger sobre las peticiones
if (mode === "development") {
    modules.use(morgan("dev"));
} else {
    modules.use(morgan("common", { skip: (_req, res) => res.statusCode < 400 }));
}

export { port, start, mode };
export default modules;
