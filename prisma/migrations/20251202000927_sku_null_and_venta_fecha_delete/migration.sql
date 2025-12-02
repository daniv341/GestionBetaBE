/*
  Warnings:

  - You are about to drop the column `fecha` on the `Venta` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Producto" ALTER COLUMN "SKU" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Venta" DROP COLUMN "fecha";
