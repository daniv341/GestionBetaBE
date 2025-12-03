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
        const ident_factura = req.body.ident_factura;

        //validar DTO
        const { error } = CreateCompraDTO.validate(data);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        //verifica si el proveedorId enviado existe
        const proveedorExistente = await prisma.Proveedor.findUnique({
            where: { id: data.proveedorId },
            select: {
                id: true,
            }
        });
        if (!proveedorExistente) {
            return res.status(400).json({ error: "A proveedor with proveedorId " + data.proveedorId + " does not exist" });
        }

        if (ident_factura) {
            //verificar ident_factura existente
            const ident_facturaExistente = await prisma.Compra.findUnique({
                where: { ident_factura: data.ident_factura },
            });
            if (ident_facturaExistente) {
                return res.status(400).json({ error: "A compra with ident_factura " + data.ident_factura + " already exists" });
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