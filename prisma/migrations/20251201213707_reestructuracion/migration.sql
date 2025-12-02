/*
  Warnings:

  - The primary key for the `Compra` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Compra` table. All the data in the column will be lost.
  - You are about to drop the column `inventarioId` on the `Producto` table. All the data in the column will be lost.
  - You are about to drop the column `negocioId` on the `Proveedor` table. All the data in the column will be lost.
  - You are about to drop the column `negocioId` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `negocioId` on the `Venta` table. All the data in the column will be lost.
  - You are about to drop the `Inventario` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Negocio` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UsuarioOAuth` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[usuarioId]` on the table `Compra` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[usuarioId]` on the table `Proveedor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[usuarioId]` on the table `Venta` will be added. If there are existing duplicate values, this will fail.
  - The required column `uid` was added to the `Compra` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "Inventario" DROP CONSTRAINT "Inventario_negocioId_fkey";

-- DropForeignKey
ALTER TABLE "Producto" DROP CONSTRAINT "Producto_inventarioId_fkey";

-- DropForeignKey
ALTER TABLE "Proveedor" DROP CONSTRAINT "Proveedor_negocioId_fkey";

-- DropForeignKey
ALTER TABLE "Usuario" DROP CONSTRAINT "Usuario_negocioId_fkey";

-- DropForeignKey
ALTER TABLE "UsuarioOAuth" DROP CONSTRAINT "UsuarioOAuth_negocioId_fkey";

-- DropForeignKey
ALTER TABLE "Venta" DROP CONSTRAINT "Venta_negocioId_fkey";

-- DropIndex
DROP INDEX "Producto_inventarioId_key";

-- DropIndex
DROP INDEX "Proveedor_negocioId_key";

-- DropIndex
DROP INDEX "Usuario_negocioId_key";

-- DropIndex
DROP INDEX "Venta_negocioId_key";

-- AlterTable
ALTER TABLE "Compra" DROP CONSTRAINT "Compra_pkey",
DROP COLUMN "id",
ADD COLUMN     "uid" TEXT NOT NULL,
ADD COLUMN     "usuarioId" TEXT,
ALTER COLUMN "carga_impositiva" DROP NOT NULL,
ADD CONSTRAINT "Compra_pkey" PRIMARY KEY ("uid");

-- AlterTable
ALTER TABLE "Factura" ALTER COLUMN "fecha_emision" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Producto" DROP COLUMN "inventarioId",
ADD COLUMN     "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Proveedor" DROP COLUMN "negocioId",
ADD COLUMN     "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "usuarioId" TEXT;

-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "negocioId",
ADD COLUMN     "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "logo_negocio" TEXT,
ADD COLUMN     "nombre_negocio" TEXT;

-- AlterTable
ALTER TABLE "Venta" DROP COLUMN "negocioId",
ADD COLUMN     "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "usuarioId" TEXT,
ALTER COLUMN "carga_impositiva" DROP NOT NULL,
ALTER COLUMN "descuento" DROP NOT NULL;

-- DropTable
DROP TABLE "Inventario";

-- DropTable
DROP TABLE "Negocio";

-- DropTable
DROP TABLE "UsuarioOAuth";

-- CreateIndex
CREATE UNIQUE INDEX "Compra_usuarioId_key" ON "Compra"("usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "Proveedor_usuarioId_key" ON "Proveedor"("usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "Venta_usuarioId_key" ON "Venta"("usuarioId");

-- AddForeignKey
ALTER TABLE "Proveedor" ADD CONSTRAINT "Proveedor_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("uid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Venta" ADD CONSTRAINT "Venta_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("uid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Compra" ADD CONSTRAINT "Compra_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("uid") ON DELETE SET NULL ON UPDATE CASCADE;
