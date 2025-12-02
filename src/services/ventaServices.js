import prisma from "../config/db.js";

const getAllVentas = async () => {
  return prisma.Venta.findMany();
};

const getVentaById = async (id) => {
  return prisma.Venta.findUnique({
    where: { id }
  });
};

const createVenta = async (data, user_uid) => {
  return prisma.Venta.create({
    ...data,
    usuarioId: user_uid,
  });
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