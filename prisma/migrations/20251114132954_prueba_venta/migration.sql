-- DropForeignKey
ALTER TABLE "Venta" DROP CONSTRAINT "Venta_negocioId_fkey";

-- AlterTable
ALTER TABLE "Venta" ALTER COLUMN "negocioId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Venta" ADD CONSTRAINT "Venta_negocioId_fkey" FOREIGN KEY ("negocioId") REFERENCES "Negocio"("id") ON DELETE SET NULL ON UPDATE CASCADE;
