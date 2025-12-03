import prisma from "../config/db.js";

const getAllProveedores = async () => {
    return prisma.Proveedor.findMany();
};

const getProveedorById = async (id) => {
    return prisma.Proveedor.findUnique({
        where: { id },
        include: {
            compras: true,
        }
    });
};

const createProveedor = async (data, user_uid) => {
    return prisma.Proveedor.create({
        data: {
            ...data,
            usuarioId: user_uid,
        }
    });
};

const updateProveedor = async (id, data) => {
    return prisma.Proveedor.update({
        where: { id: id },
        data,
    });
};

const deleteProveedor = async (id) => {
    return prisma.Proveedor.delete({
        where: { id: id }
    });
};

export {
    getAllProveedores,
    getProveedorById,
    createProveedor,
    updateProveedor,
    deleteProveedor
};