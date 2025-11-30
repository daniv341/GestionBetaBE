import prisma from "../config/db.js";

// async hace que una funcion sea asincrona, es decir que no detenga la ejecucion hasta que su contenido haya sido ejecutado
// findMany es de prisma, trae todos las filas correspondientes de la tabla con todas sus columnas
// findUnique es de prisma, busca a una unica entidad dado el parametro que especifiques, una vez encontrado trae todos los demas parametros de dicha fila
// create es de prisma, sirve para crear la fila en la base de datos
// update es de prisma, actualiza la fila en la base de datos segun los datos actualizados(y que se pueden actualizar)
// delete es de prisma, elimina la columna en la base de datos
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