import * as proveedorServices from "../services/proveedorServices.js";
import { CreateProveedorDTO } from "../models/proveedorModel.js";
import prisma from "../config/db.js";

const getAllProveedores = async (req, res) => {
    try {
        const proveedores = await proveedorServices.getAllProveedores();
        return res.status(200).json(proveedores);
    } catch (error) {
        console.error("Error getting proveedores:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const getProveedorById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ error: "Invalid Proveedor ID" });
        }

        const proveedor = await proveedorServices.getProveedorById(id);
        if (!proveedor) {
            return res.status(404).json({ error: "Proveedor not found" });
        }

        return res.status(200).json(proveedor);
    } catch (error) {
        console.error("Error getting Proveedor:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const createProveedor = async (req, res) => {
    try {
        const data = req.body;
        const user_uid = req.user.uid;

        //validar DTO
        const { error } = CreateProveedorDTO.validate(data);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const proveedor = await proveedorServices.createProveedor(data, user_uid);
        return res.status(201).json(proveedor);

    } catch (error) {
        console.error("Error creating Proveedor:", error);
        return res.status(500).json({ error: error.message });
    }
};

const deleteProveedor = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ error: "Invalid Proveedor ID" });
        }

        await proveedorServices.deleteProveedor(id);
        return res.status(204).send();

    } catch (error) {
        console.error("Error deleting Proveedor:", error);
        return res.status(500).json({ error: error.message });
    }
};

export {
    getAllProveedores,
    getProveedorById,
    createProveedor,
    deleteProveedor
};