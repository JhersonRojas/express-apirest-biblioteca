// @ts-check

// Importación de modulos
import { Server } from "./src/modules.js";

// Conexión con DB
import { Database } from "./src/database/config.pool.js";

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
        await Database();

        // Iniciando el servidor
        await Server();

    } catch (error) {
        console.error({
            msj: "Error al iniciar algún servicin en la aplicación",
            error: error.message,
            details: error,
        });
    }
}

App();
