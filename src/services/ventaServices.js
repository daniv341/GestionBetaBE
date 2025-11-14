import prisma from "../config/db.js";
import { CreateVentaDTO, UpdateVentaDTO } from "../models/venta.js";

function validarDTO(data, dto) {
    const keys = Object.keys(dto);
  
    for (const campo of keys) {
      const rules = dto[campo];
  
      if (!rules) continue;
  
      // si el campo es requerido pero no valido
      if (rules.required && data[campo] === undefined) {
        throw new Error(`El campo "${campo}" es obligatorio`);
      }
  
      // si el campo es null pero no se lo permite
      if (data[campo] === null && rules.nullable === false) {
        throw new Error(`El campo "${campo}" no puede ser null`);
      }
    }
  }

const getAllVentas = async () => {
    return prisma.Venta.findMany();
};

const getVentaById = async (id) => {
    return prisma.Venta.findUnique({
        where: { id }
    });
};

const createVenta = async (data) => {
    validarDTO(data, CreateVentaDTO);
  
    return prisma.Venta.create({
      data,
    });
};

const updateVenta = async (id, data) => {
    validarDTO(data, UpdateVentaDTO);
  
    return prisma.Venta.update({
        where: {id: id},
        data,
    });
};

const deleteVenta = async (id) => {
    return prisma.Venta.delete({
        where: {id: id}
    });
};

export {
    //funciones varias
    validarDTO,
    //api
    getAllVentas,
    getVentaById,
    createVenta,
    updateVenta,
    deleteVenta
  };