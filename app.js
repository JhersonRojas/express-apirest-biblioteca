// @ts-check

// Importación de modulos
import { Server } from "./src/modules.js";

// Conexión con DB
import { DatabasePool } from "./src/database/config.pool.js";

// Importación de modelos
import "./src/models/categorias.model.js";
import "./src/models/elementos.model.js";
import "./src/models/movimientos.model.js";
import "./src/models/usuarios.model.js";

/**
 * Función "Server" para inicializar los procesos del servidor
 */
async function App() {
    try {

        // Estableciendo la conexión con DB
        await DatabasePool.sync();

        // Iniciando el servidor
        await Server();

    } catch (error) {
        console.error({
            msj: "No se ha iniciado el servidor",
            error: error.message,
            details: error,
        });
    }
}

App();
