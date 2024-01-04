// @ts-check

// Importación de modulos
import modules, { mode, port, start } from "./src/modules.js";

// Conexión con DB
import { DatabasePool } from "./src/database/config.pool.js";

// Importación de modelos
import "./src/models/usuarios.model.js";
import "./src/models/movimientos.model.js";
import "./src/models/elementos.model.js";
import "./src/models/categorias.model.js";

/**
 * Función "Server" para inicializar los procesos del servidor
 */
async function Server() {
    try {

        if (!port || !mode) {
            throw new Error("No se ha obtenido el puerto o modo del servidor");
        }

        // Estableciendo la conexión con DB
        await DatabasePool.sync();

        // Iniciando el servidor
        modules.listen(port);

        // Confirmación del servidor
        console.log(start);

    } catch (error) {
        console.error({
            msj: "No se ha iniciado el servidor",
            error: error.message,
            details: error,
        });
    }
}

Server();
