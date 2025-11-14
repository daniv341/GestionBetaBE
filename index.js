const server = require("./src/app.js");
const { prisma } = require("./src/db.js");

async function main() {
  try {
    // Verificamos conexión
    await prisma.$connect();
    console.log("conectado a la base de datos con Prisma");

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
