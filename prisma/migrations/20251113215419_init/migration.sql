-- CreateTable
CREATE TABLE "Producto" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "precio_venta" DOUBLE PRECISION NOT NULL,
    "precio_compra" DOUBLE PRECISION NOT NULL,
    "categoria" TEXT NOT NULL,
    "SKU" TEXT NOT NULL,
    "stock_actual" INTEGER NOT NULL,
    "stock_minimo" INTEGER NOT NULL,
    "enable" BOOLEAN NOT NULL,
    "inventarioId" INTEGER NOT NULL,

    CONSTRAINT "Producto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "contraseña" TEXT NOT NULL,
    "enable" BOOLEAN NOT NULL,
    "direccion" TEXT NOT NULL,
    "negocioId" INTEGER NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inventario" (
    "id" SERIAL NOT NULL,
    "ubicacion" INTEGER NOT NULL,
    "negocioId" INTEGER NOT NULL,

    CONSTRAINT "Inventario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Negocio" (
    "id" SERIAL NOT NULL,
    "logo" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "enable" BOOLEAN NOT NULL,

    CONSTRAINT "Negocio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Proveedor" (
    "id" SERIAL NOT NULL,
    "empresa" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "negocioId" INTEGER NOT NULL,

    CONSTRAINT "Proveedor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Venta" (
    "id" SERIAL NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "subtotal" DOUBLE PRECISION NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "carga_impositiva" DOUBLE PRECISION NOT NULL,
    "ident_factura" INTEGER NOT NULL,
    "estado" BOOLEAN NOT NULL,
    "descuento" DOUBLE PRECISION NOT NULL,
    "negocioId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Factura" (
    "id" SERIAL NOT NULL,
    "num_comprobante" INTEGER NOT NULL,
    "fecha_emision" TIMESTAMP(3) NOT NULL,
    "fecha_vencimiento" TIMESTAMP(3) NOT NULL,
    "ventaId" INTEGER NOT NULL,

    CONSTRAINT "Factura_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Compra" (
    "id" SERIAL NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "carga_impositiva" DOUBLE PRECISION NOT NULL,
    "ident_factura" INTEGER NOT NULL,
    "estado" BOOLEAN NOT NULL,
    "proeedorId" INTEGER NOT NULL,

    CONSTRAINT "Compra_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Producto_SKU_key" ON "Producto"("SKU");

-- CreateIndex
CREATE UNIQUE INDEX "Producto_inventarioId_key" ON "Producto"("inventarioId");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_nombre_key" ON "Usuario"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_contraseña_key" ON "Usuario"("contraseña");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_negocioId_key" ON "Usuario"("negocioId");

-- CreateIndex
CREATE UNIQUE INDEX "Inventario_negocioId_key" ON "Inventario"("negocioId");

-- CreateIndex
CREATE UNIQUE INDEX "Negocio_logo_key" ON "Negocio"("logo");

-- CreateIndex
CREATE UNIQUE INDEX "Proveedor_negocioId_key" ON "Proveedor"("negocioId");

-- CreateIndex
CREATE UNIQUE INDEX "Venta_id_key" ON "Venta"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Venta_ident_factura_key" ON "Venta"("ident_factura");

-- CreateIndex
CREATE UNIQUE INDEX "Venta_negocioId_key" ON "Venta"("negocioId");

-- CreateIndex
CREATE UNIQUE INDEX "Factura_num_comprobante_key" ON "Factura"("num_comprobante");

-- CreateIndex
CREATE UNIQUE INDEX "Factura_ventaId_key" ON "Factura"("ventaId");

-- CreateIndex
CREATE UNIQUE INDEX "Compra_ident_factura_key" ON "Compra"("ident_factura");

-- CreateIndex
CREATE UNIQUE INDEX "Compra_proeedorId_key" ON "Compra"("proeedorId");

-- AddForeignKey
ALTER TABLE "Producto" ADD CONSTRAINT "Producto_inventarioId_fkey" FOREIGN KEY ("inventarioId") REFERENCES "Inventario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_negocioId_fkey" FOREIGN KEY ("negocioId") REFERENCES "Negocio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventario" ADD CONSTRAINT "Inventario_negocioId_fkey" FOREIGN KEY ("negocioId") REFERENCES "Negocio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proveedor" ADD CONSTRAINT "Proveedor_negocioId_fkey" FOREIGN KEY ("negocioId") REFERENCES "Negocio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Venta" ADD CONSTRAINT "Venta_negocioId_fkey" FOREIGN KEY ("negocioId") REFERENCES "Negocio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Factura" ADD CONSTRAINT "Factura_ventaId_fkey" FOREIGN KEY ("ventaId") REFERENCES "Venta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Compra" ADD CONSTRAINT "Compra_proeedorId_fkey" FOREIGN KEY ("proeedorId") REFERENCES "Proveedor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
