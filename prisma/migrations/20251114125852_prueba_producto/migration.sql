/*
  Warnings:

  - You are about to drop the column `proeedorId` on the `Compra` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[proveedorId]` on the table `Compra` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `proveedorId` to the `Compra` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Compra" DROP CONSTRAINT "Compra_proeedorId_fkey";

-- DropForeignKey
ALTER TABLE "Producto" DROP CONSTRAINT "Producto_inventarioId_fkey";

-- DropIndex
DROP INDEX "Compra_proeedorId_key";

-- DropIndex
DROP INDEX "Usuario_contraseña_key";

-- AlterTable
ALTER TABLE "Compra" DROP COLUMN "proeedorId",
ADD COLUMN     "proveedorId" INTEGER NOT NULL,
ALTER COLUMN "estado" SET DEFAULT true;

-- AlterTable
ALTER TABLE "Negocio" ALTER COLUMN "enable" SET DEFAULT true;

-- AlterTable
ALTER TABLE "Producto" ALTER COLUMN "enable" SET DEFAULT true,
ALTER COLUMN "inventarioId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Usuario" ALTER COLUMN "enable" SET DEFAULT true;

-- AlterTable
ALTER TABLE "Venta" ALTER COLUMN "estado" SET DEFAULT true;

-- CreateIndex
CREATE UNIQUE INDEX "Compra_proveedorId_key" ON "Compra"("proveedorId");

-- AddForeignKey
ALTER TABLE "Producto" ADD CONSTRAINT "Producto_inventarioId_fkey" FOREIGN KEY ("inventarioId") REFERENCES "Inventario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Compra" ADD CONSTRAINT "Compra_proveedorId_fkey" FOREIGN KEY ("proveedorId") REFERENCES "Proveedor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
