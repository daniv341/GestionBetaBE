-- DropForeignKey
ALTER TABLE "Usuario" DROP CONSTRAINT "Usuario_negocioId_fkey";

-- AlterTable
ALTER TABLE "Usuario" ALTER COLUMN "negocioId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_negocioId_fkey" FOREIGN KEY ("negocioId") REFERENCES "Negocio"("id") ON DELETE SET NULL ON UPDATE CASCADE;
