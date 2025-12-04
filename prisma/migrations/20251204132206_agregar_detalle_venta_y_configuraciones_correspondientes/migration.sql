/*
  Warnings:

  - You are about to drop the column `ident_factura` on the `Compra` table. All the data in the column will be lost.
  - You are about to drop the column `num_comprobante` on the `Factura` table. All the data in the column will be lost.
  - You are about to drop the column `ident_factura` on the `Venta` table. All the data in the column will be lost.
  - You are about to drop the column `subtotal` on the `Venta` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[num_comprobante]` on the table `Compra` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[ident_factura]` on the table `Factura` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `num_comprobante` to the `Compra` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_bruto` to the `Compra` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ident_factura` to the `Factura` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_bruto` to the `Venta` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Compra_ident_factura_key";

-- DropIndex
DROP INDEX "Factura_num_comprobante_key";

-- DropIndex
DROP INDEX "Venta_ident_factura_key";

-- AlterTable
ALTER TABLE "Compra" DROP COLUMN "ident_factura",
ADD COLUMN     "num_comprobante" INTEGER NOT NULL,
ADD COLUMN     "total_bruto" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Factura" DROP COLUMN "num_comprobante",
ADD COLUMN     "ident_factura" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Venta" DROP COLUMN "ident_factura",
DROP COLUMN "subtotal",
ADD COLUMN     "total_bruto" DOUBLE PRECISION NOT NULL;

-- CreateTable
CREATE TABLE "DetalleVenta" (
    "id" SERIAL NOT NULL,
    "subtotal" DOUBLE PRECISION NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "productoId" INTEGER,
    "ventaId" INTEGER
);

-- CreateIndex
CREATE UNIQUE INDEX "DetalleVenta_id_key" ON "DetalleVenta"("id");

-- CreateIndex
CREATE UNIQUE INDEX "DetalleVenta_productoId_ventaId_key" ON "DetalleVenta"("productoId", "ventaId");

-- CreateIndex
CREATE UNIQUE INDEX "Compra_num_comprobante_key" ON "Compra"("num_comprobante");

-- CreateIndex
CREATE UNIQUE INDEX "Factura_ident_factura_key" ON "Factura"("ident_factura");

-- AddForeignKey
ALTER TABLE "DetalleVenta" ADD CONSTRAINT "DetalleVenta_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "Producto"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetalleVenta" ADD CONSTRAINT "DetalleVenta_ventaId_fkey" FOREIGN KEY ("ventaId") REFERENCES "Venta"("id") ON DELETE SET NULL ON UPDATE CASCADE;
