import server from "./src/app.js";
import prisma from "./src/config/db.js";

async function main() {
  try {
    // verifica la conexion
    await prisma.$connect();
    //console.log("conectado a la base de datos con Prisma");

    server.listen(5432, () => {
      console.log("base de datos corriendo en puerto 5432");
    });
  } catch (error) {
    console.error("error al conectar a la base de datos:", error);
  } finally {
    // no se cierra Prisma aún para que la app siga funcionando
  }
}

main();
