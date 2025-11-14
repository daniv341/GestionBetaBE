import * as productoServices from "../services/productoServices.js";
import { CreateProductoDTO, UpdateProductoDTO } from "../models/producto.js";
import { validarDTO, SKUExistente } from "../services/productoServices.js";

const getAllProductos = async (req, res) => {
    try {
        const productos = await productoServices.getAllProductos();
        res.json(productos);
    } catch (error) {
        console.error("Error getting productos:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const getProductoById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: "Invalid producto ID" });
        }

        const producto = await productoServices.getProductoById(id);
        if (!producto) {
            return res.status(404).json({ error: "Producto not found" });
        }

        res.json(producto);
    } catch (error) {
        console.error("Error getting Producto:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const createProducto = async (req, res) => {
    try {
        const data = req.body;

        validarDTO(data, CreateProductoDTO);

        const errorSKUExistente = await SKUExistente(data);

        if (errorSKUExistente) {
            return res.status(400).json({ error: `A producto with SKU "${data.SKU}" already exists` });
        }

        const producto = await productoServices.createProducto(data);
        return res.status(201).json(producto);

    } catch (error) {
        console.error("Error creating Producto:", error);
        return res.status(500).json({ error: error.message });
    }
};

const updateProducto = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ error: "Invalid Producto ID" });
        }

        const data = req.body;

        validarDTO(data, UpdateProductoDTO);

        const errorSKUExistente = await SKUExistente(data);

        if (errorSKUExistente) {
            return res.status(400).json({ error: `A product with SKU "${data.SKU}" already exists` });
        }

        const producto = await productoServices.updateProducto(id, data);

        if (!producto) {
            return res.status(404).json({ error: "Producto not found" });
        }

        return res.json(producto);

    } catch (error) {
        console.error("Error updating Producto:", error);
        return res.status(500).json({ error: error.message });
    }
};

const deleteProducto = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ error: "Invalid Producto ID" });
        }

        await productoServices.deleteProducto(id);
        return res.status(204).send();

    } catch (error) {
        console.error("Error deleting Producto:", error);
        return res.status(500).json({ error: error.message });
    }
};

export {
    getAllProductos,
    getProductoById,
    createProducto,
    updateProducto,
    deleteProducto
}