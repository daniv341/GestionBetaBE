/*
  Warnings:

  - Added the required column `fecha_carga` to the `Venta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `metodo_pago` to the `Venta` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MetodoPago" AS ENUM ('EFECTIVO', 'DEBITO', 'CREDITO');

-- AlterTable
ALTER TABLE "Venta" ADD COLUMN     "fecha_carga" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "metodo_pago" "MetodoPago" NOT NULL;
