import prisma from "../config/db.js";

const getAllVentas = async () => {
  return prisma.Venta.findMany({
    include: {
      factura: true,
      detalles_venta: true,
    }
  });
};

const getVentaById = async (id) => {
  return prisma.Venta.findUnique({
    where: { id },
    include: {
      factura: true,
      detalles_venta: true
    }
  });
};

const createVenta = async (dataVenta, dataFactura, dataDetalleVenta, user_uid) => {
  const request = await prisma.$transaction(async (prisma) => {

    let total_bruto = 0;
    const detallesVenta = [];

    const venta = await prisma.Venta.create({
      data: {
        ...dataVenta,
        total_bruto: 0,
        total: 0,
        usuarioId: user_uid
      }
    });

    for (const item of dataDetalleVenta) {
      const producto = await prisma.Producto.findUnique({
        where: { id: item.productoId },
        select: {
          id: true,
          nombre: true,
          precio_venta: true,
          stock_actual: true
        }
      });

      if (!producto) {
        throw new Error("a producto " + producto.nombre + " does not exist")
      }

      if (producto.stock_actual < item.cantidad) {
        throw new Error("a producto " + producto.nombre + " is not in stock")
      }

      await prisma.Producto.update({
        where: { id: item.productoId },
        data: {
          stock_actual: producto.stock_actual - item.cantidad,
        }
      });

      const subtotal = item.cantidad * producto.precio_venta;
      total_bruto += subtotal

      const detalleVenta = await prisma.DetalleVenta.create({
        data: {
          ...item,
          subtotal: subtotal,
          nombre_producto: producto.nombre,
          ventaId: venta.id
        }
      });
      detallesVenta.push(detalleVenta)
    }

    const ventaReal = await prisma.Venta.update({
      where: { id: venta.id },
      data: {
        ...dataVenta,
        total_bruto: total_bruto,
        total:
          total_bruto +
          total_bruto * dataVenta.carga_impositiva -
          total_bruto * dataVenta.descuento,
        usuarioId: user_uid,
      }
    });

    const factura = await prisma.Factura.create({
      data: {
        ...dataFactura,
        ventaId: venta.id
      }
    });

    return { venta: ventaReal, factura, detalles_venta: detallesVenta };

  });

  return request;
};

const updateVenta = async (id, data) => {
  return prisma.Venta.update({
    where: { id: id },
    data,
  });
};

const deleteVenta = async (id) => {
  return prisma.Venta.delete({
    where: { id: id }
  });
};

export {
  getAllVentas,
  getVentaById,
  createVenta,
  updateVenta,
  deleteVenta
};