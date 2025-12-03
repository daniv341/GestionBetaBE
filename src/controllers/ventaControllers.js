import * as ventaServices from "../services/ventaServices.js";
import { CreateVenta_FacturaDTO, UpdateVentaDTO } from "../models/ventaModel.js";
import prisma from "../config/db.js";

const getAllVentas = async (req, res) => {
    try {
        const ventas = await ventaServices.getAllVentas();
        return res.status(200).json(ventas);
    } catch (error) {
        console.error("Error getting ventas:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const getVentaById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: "Invalid venta ID" });
        }

        const venta = await ventaServices.getVentaById(id);
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
        const dataFactura = data.factura;
        // estos son los datos que deben ser unique de cada uno
        const ident_factura = dataVenta.ident_factura;
        const num_comprobante = dataFactura.num_comprobante;
        
        //validar DTO
        const { error } = CreateVenta_FacturaDTO.validate(data);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        console.log("pase el dto");

        if (ident_factura) {
            //verificar idet_factura existente
            const ident_facturaExistente = await prisma.Venta.findUnique({
                where: { ident_factura: dataVenta.ident_factura },
            });
            if (ident_facturaExistente) {
                return res.status(400).json({ error: "A venta with ident_Factura "+dataVenta.ident_Factura+" already exists" });
            }
        }
        console.log("pase la venta");

        if (num_comprobante) {
            //verificar num_comprobante existente
            const num_comprobanteExistente = await prisma.Factura.findUnique({
                where: { num_comprobante: dataFactura.num_comprobante },
            });
            if (num_comprobanteExistente) {
                return res.status(400).json({ error: "A factura with num_comprobante "+dataFactura.num_comprobante+" already exists" });
            }
        }
        console.log("pase la factura");

        const venta = await ventaServices.createVenta(dataVenta, dataFactura, user_uid);
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