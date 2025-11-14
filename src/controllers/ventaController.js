import * as ventaServices from "../services/ventaServices.js";
import { CreateVentaDTO, UpdateVentaDTO } from "../models/venta.js";
import { validarDTO } from "../services/ventaServices.js";

const getAllVentas = async (req, res) => {
    try {
        const ventas = await ventaServices.getAllVentas();
        res.json(ventas)
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

        res.json(venta);
    } catch (error) {
        console.error("Error getting Venta:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const createVenta = async (req, res) => {
    try {
        const data = req.body;

        validarDTO(data, CreateVentaDTO);

        const venta = await ventaServices.createVenta(data);
        return res.status(201).json(venta);

    } catch (error) {
        console.error("Error creating venta:", error);
        return res.status(500).json({ error: error.message });
    }
};

const updateVenta = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ error: "Invalid venta ID" });
        }

        const data = req.body;

        validarDTO(data, UpdateVentaDTO);

        const venta = await ventaServices.updateVenta(id, data);

        if (!venta) {
            return res.status(404).json({ error: "Venta not found" });
        }

        return res.json(venta);

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