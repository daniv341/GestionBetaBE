import prisma from "../config/db.js";

const getAllCompras = async () => {
  return prisma.Compra.findMany();
};

const getCompraById = async (uid) => {
  return prisma.Compra.findUnique({
    where: { uid }
  });
};

const createCompra = async (data, user_uid) => {
  return prisma.Compra.create({
    data: {
      ...data,
      usuarioId: user_uid,
    }
  });
};

export {
  getAllCompras,
  getCompraById,
  createCompra
};