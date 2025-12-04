import * as compraServices from "../services/compraServices.js";
import { CreateCompraDTO } from "../models/compraModel.js";
import prisma from "../config/db.js";

const getAllCompras = async (req, res) => {
    try {
        const compras = await compraServices.getAllCompras();
        return res.status(200).json(compras);
    } catch (error) {
        console.error("Error getting Compras:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const getCompraById = async (req, res) => {
    try {
        const uid = String(req.params.uid);

        if (!typeof uid == 'string') {
            return res.status(400).json({ error: "Invalid Compra UID" });
        }

        const compra = await compraServices.getCompraById(uid);
        if (!compra) {
            return res.status(404).json({ error: "Compra not found" });
        }

        return res.status(200).json(compra);
    } catch (error) {
        console.error("Error getting Compra:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const createCompra = async (req, res) => {
    try {
        const data = req.body;
        const user_uid = req.user.uid;
        const num_comprobante = req.body.num_comprobante;

        //validar DTO
        const { error } = CreateCompraDTO.validate(data);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        //verifica si el proveedorId enviado existe
        const proveedorExistente = await prisma.Proveedor.findUnique({
            where: { id: data.proveedorId }
        });
        if (!proveedorExistente) {
            return res.status(400).json({ error: "A proveedor with proveedorId " + data.proveedorId + " does not exist" });
        }

        if (num_comprobante) {
            //verificar num_comprobante existente
            const num_comprobanteExistente = await prisma.Compra.findUnique({
                where: { num_comprobante: data.num_comprobante },
            });
            if (num_comprobanteExistente) {
                return res.status(400).json({ error: "A compra with num_comprobante " + data.num_comprobante + " already exists" });
            }
        }

        const compra = await compraServices.createCompra(data, user_uid);
        return res.status(201).json(compra);

    } catch (error) {
        console.error("Error creating Compra:", error);
        return res.status(500).json({ error: error.message });
    }
};

export {
    getAllCompras,
    getCompraById,
    createCompra
};