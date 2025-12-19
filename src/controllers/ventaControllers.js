import * as ventaServices from "../services/ventaServices.js";
import { CreateVenta_CompletaDTO, UpdateVentaDTO } from "../models/ventaModel.js";
import prisma from "../config/db.js";

const getAllVentas = async (req, res) => {
    try {
        const user_uid = req.user.uid;

        const ventas = await ventaServices.getAllVentas(user_uid);
        return res.status(200).json(ventas);
    } catch (error) {
        console.error("Error getting ventas:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const getVentaById = async (req, res) => {
    try {
        const user_uid = req.user.uid;
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ error: "Invalid venta ID" });
        }

        const venta = await ventaServices.getVentaById(id, user_uid);
        if (!venta) {
            return res.status(404).json({ error: "Venta not found" });
        }

        return res.status(200).json(venta);
    } catch (error) {
        console.error("Error getting Venta:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const createVenta = async (req, res) => {
    try {
        const data = req.body;
        const user_uid = req.user.uid;
        // estos son para separar los datos de la venta y de la factura
        const dataVenta = data.venta;
        //const dataFactura = data.factura;
        const dataDetalleVenta = data.detalles_venta;
        // estos son los datos que deben ser unique de cada uno
        //const ident_factura = dataFactura.ident_factura;
        
        //validar DTO
        const { error } = CreateVenta_CompletaDTO.validate(data);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        /*if (ident_factura) {
            //verificar idet_factura existente
            const ident_facturaExistente = await prisma.Factura.findUnique({
                where: { ident_factura: dataFactura.ident_factura },
            });
            if (ident_facturaExistente) {
                return res.status(400).json({ error: "A factura with ident_Factura "+dataVenta.ident_Factura+" already exists" });
            }
        }*/
        // de aqui se elimino dataFactura
        const venta = await ventaServices.createVenta(dataVenta, dataDetalleVenta, user_uid);
        return res.status(201).json(venta);

    } catch (error) {
        console.error("Error creating venta:", error);
        return res.status(500).json({ error: error.message });
    }
};

const updateVenta = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        //verificar id existente
        if (isNaN(id)) {
            return res.status(400).json({ error: "Invalid venta ID" });
        }

        const data = req.body;

        //verificar DTO
        const { error } = UpdateVentaDTO.validate(data);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const venta = await ventaServices.updateVenta(id, data);

        if (!venta) {
            return res.status(404).json({ error: "Venta not found" });
        }

        return res.status(200).json(venta);

    } catch (error) {
        console.error("Error updating venta:", error);
        return res.status(500).json({ error: error.message });
    }
};

const deleteVenta = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ error: "Invalid venta ID" });
        }

        await ventaServices.deleteVenta(id);
        return res.status(204).send();

    } catch (error) {
        console.error("Error deleting venta:", error);
        return res.status(500).json({ error: error.message });
    }
};

export {
    getAllVentas,
    getVentaById,
    createVenta,
    updateVenta,
    deleteVenta
}