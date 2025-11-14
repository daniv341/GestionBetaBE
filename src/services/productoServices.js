import prisma from "../config/db.js";
import { CreateProductoDTO, UpdateProductoDTO } from "../models/producto.js";

function validarDTO(data, dto) {
    const keys = Object.keys(dto);
  
    for (const campo of keys) {
      const rules = dto[campo];

      if (!rules) continue;
  
      // Campo requerido pero no enviado
      if (rules.required && data[campo] === undefined) {
        throw new Error(`El campo "${campo}" es obligatorio`);
      }
  
      // Si el campo viene null pero no es nullable
      if (data[campo] === null && rules.nullable === false) {
        throw new Error(`El campo "${campo}" no puede ser null`);
      }
    }
  }
   

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
    validarDTO(data, CreateProductoDTO);
  
    return prisma.Producto.create({
      data,
    });
};

const updateProducto = async (id, data) => {
    validarDTO(data, UpdateProductoDTO);
  
    return prisma.Producto.update({
        where: {id: id},
        data,
    });
};

const deleteProducto = async (id) => {
    return prisma.Producto.delete({
        where: {id: id}
    });
};

export{
    validarDTO,
    getAllProductos,
    getProductoById,
    getProductoByCategoria,
    createProducto,
    updateProducto,
    deleteProducto
  };