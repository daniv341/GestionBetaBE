/*
  Warnings:

  - You are about to drop the column `fecha_vencimiento` on the `Factura` table. All the data in the column will be lost.
  - Added the required column `nombre_producto` to the `DetalleVenta` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DetalleVenta" ADD COLUMN     "nombre_producto" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Factura" DROP COLUMN "fecha_vencimiento";
