const server = require("./src/app.js");
const { prisma } = require("./src/db.js");

async function main() {
  try {
    // Verificamos conexión
    await prisma.$connect();
    console.log("✅ Conectado a la base de datos con Prisma");

    server.listen(5432, () => {
      console.log("🚀 Servidor corriendo en puerto 5432");
    });
  } catch (error) {
    console.error("❌ Error al conectar a la base de datos:", error);
  } finally {
    // No cerramos Prisma aún para que la app siga funcionando
  }
}

main();
