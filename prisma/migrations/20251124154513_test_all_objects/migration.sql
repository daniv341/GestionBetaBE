/*
  Warnings:

  - The primary key for the `Usuario` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Usuario` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - The required column `uid` was added to the `Usuario` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "Compra" DROP CONSTRAINT "Compra_proveedorId_fkey";

-- DropForeignKey
ALTER TABLE "Factura" DROP CONSTRAINT "Factura_ventaId_fkey";

-- DropForeignKey
ALTER TABLE "Inventario" DROP CONSTRAINT "Inventario_negocioId_fkey";

-- DropForeignKey
ALTER TABLE "Proveedor" DROP CONSTRAINT "Proveedor_negocioId_fkey";

-- AlterTable
ALTER TABLE "Compra" ALTER COLUMN "proveedorId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Factura" ALTER COLUMN "ventaId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Inventario" ALTER COLUMN "negocioId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Proveedor" ALTER COLUMN "negocioId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Usuario" DROP CONSTRAINT "Usuario_pkey",
DROP COLUMN "id",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "uid" TEXT NOT NULL,
ADD CONSTRAINT "Usuario_pkey" PRIMARY KEY ("uid");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- AddForeignKey
ALTER TABLE "Inventario" ADD CONSTRAINT "Inventario_negocioId_fkey" FOREIGN KEY ("negocioId") REFERENCES "Negocio"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proveedor" ADD CONSTRAINT "Proveedor_negocioId_fkey" FOREIGN KEY ("negocioId") REFERENCES "Negocio"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Factura" ADD CONSTRAINT "Factura_ventaId_fkey" FOREIGN KEY ("ventaId") REFERENCES "Venta"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Compra" ADD CONSTRAINT "Compra_proveedorId_fkey" FOREIGN KEY ("proveedorId") REFERENCES "Proveedor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
