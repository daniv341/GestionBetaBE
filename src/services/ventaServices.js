import prisma from "../config/db.js";

const getAllVentas = async () => {
  return prisma.Venta.findMany({
    include: {
      factura: true,
    }
  });
};

const getVentaById = async (id) => {
  return prisma.Venta.findUnique({
    where: { id },
    include: {
      factura: true,
    }
  });
};

const createVenta = async (dataVenta, dataFactura, user_uid) => {
  const request = await prisma.$transaction(async (prisma) => {

    const venta = await prisma.Venta.create({
      data: {
        ...dataVenta,
        usuarioId: user_uid,
      }
    });

    const factura = await prisma.Factura.create({
      data: {
        ...dataFactura,
        num_comprobante: venta.ident_factura,
        ventaId: venta.id
      }
    });

    return { venta, factura };

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