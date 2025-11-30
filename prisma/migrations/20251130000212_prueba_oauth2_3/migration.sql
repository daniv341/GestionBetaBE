/*
  Warnings:

  - You are about to drop the column `fechaCreacion` on the `UsuarioOAuth` table. All the data in the column will be lost.
  - You are about to drop the column `provider` on the `UsuarioOAuth` table. All the data in the column will be lost.
  - You are about to drop the column `providerId` on the `UsuarioOAuth` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UsuarioOAuth" DROP COLUMN "fechaCreacion",
DROP COLUMN "provider",
DROP COLUMN "providerId",
ADD COLUMN     "direccion" TEXT,
ADD COLUMN     "enable" BOOLEAN NOT NULL DEFAULT true;
