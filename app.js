// @ts-check

// Importación de modulos
import modules, { mode, port, start } from "./src/modules.js";

// Función main del servidor
async function main() {
    try {

        if (!port || !mode) {
            throw new Error("No se ha obtenido el puerto o modo del servidor");
        }

        modules.listen(port, () => {
            console.log(start);
        });

    } catch (error) {
        console.error({
            msj: "No se ha iniciado el servidor",
            error: error.message,
        });
    }
}

main();
