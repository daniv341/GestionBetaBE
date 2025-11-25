-- CreateTable
CREATE TABLE "UsuarioOAuth" (
    "uid" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "nombre" TEXT,
    "foto" TEXT,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "negocioId" INTEGER,

    CONSTRAINT "UsuarioOAuth_pkey" PRIMARY KEY ("uid")
);

-- CreateIndex
CREATE UNIQUE INDEX "UsuarioOAuth_email_key" ON "UsuarioOAuth"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UsuarioOAuth_negocioId_key" ON "UsuarioOAuth"("negocioId");

-- AddForeignKey
ALTER TABLE "UsuarioOAuth" ADD CONSTRAINT "UsuarioOAuth_negocioId_fkey" FOREIGN KEY ("negocioId") REFERENCES "Negocio"("id") ON DELETE SET NULL ON UPDATE CASCADE;
