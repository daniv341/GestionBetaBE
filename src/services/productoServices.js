import prisma from "../config/db";
import { CreateProductoDTO, UpdateProductoDTO } from "../models/producto";

function validarDTO(data, dto) {
    const keys = Object.keys(dto);
  
    for (const campo of campos) {
      const rules = dto[campo];
  
      //si el campo es requerido pero no se envio
      if (rules.required && data[key] === undefined) {
        throw new Error(`El campo "${campo}" es obligatorio`);
      }
  
      //si el campo viene null pero el dto no lo permite
      if (data[campo] === null && rules.nullable === false) {
        throw new Error(`El campo "${campo}" no puede ser null`);
      }
    }
}  

const getAllProducto = async () => {
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
    validarDTO(data, CreateProductoDTO);
  
    return prisma.Producto.create({
      data,
    });
};

const updateProducto = async (id, data) => {
    validarDTO(data, UpdateProductoDTO);
  
    return prisma.Producto.update({
        where: {id_producto: id},
        data,
    });
};

const deleteProducto = async (id) => {
    return prisma.Producto.delete({
        where: {id_producto: id}
    });
};

module.exports = {
    getAllProducto,
    getProductoById,
    getProductoByCategoria,
    createProducto,
    updateProducto,
    deleteProducto
  };