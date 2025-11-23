import prisma from "../config/db.js";

const getAllProductos = async () => {
  return prisma.Producto.findMany();
};

const getProductoById = async (id) => {
  return prisma.Producto.findUnique({
    where: { id }
  });
};

const getProductoByCategoria = async (categoria) => {
  return prisma.Producto.findMany({
    where: { categoria }
  });
};

const createProducto = async (data) => {
  return prisma.Producto.create({
    data
  });
};

const updateProducto = async (id, data) => {
  return prisma.Producto.update({
    where: { id: id },
    data,
  });
};

const deleteProducto = async (id) => {
  return prisma.Producto.delete({
    where: { id: id }
  });
};

export {
  getAllProductos,
  getProductoById,
  getProductoByCategoria,
  createProducto,
  updateProducto,
  deleteProducto
};