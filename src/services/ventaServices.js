import prisma from "../config/db";
import { CreateVentaDTO, UpdateVentaDTO } from "../models/venta";

function validarDTO(data, dto) {
    for (const campo of campos) {
      const rules = dto[campo];
  
      //si el campo es requerido pero no se envio
      if (rules.required && data[campo] === undefined) {
        throw new Error(`El campo "${campo}" es obligatorio`);
      }
  
      //si el campo viene null pero el dto no lo permite
      if (data[campo] === null && rules.nullable === false) {
        throw new Error(`El campo "${campo}" no puede ser null`);
      }
    }
}  

const getAllVenta = async () => {
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
        where: {id_venta: id},
        data,
    });
};

const deleteVenta = async (id) => {
    return prisma.Venta.delete({
        where: {id_venta: id}
    });
};

module.exports = {
    getAllVenta,
    getVentaById,
    createVenta,
    updateVenta,
    deleteVenta
  };