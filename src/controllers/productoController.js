const productoService = require("../services/productoServices");
const { CreateProductoDTO, UpdateProductoDTO } = require("../models/producto");

const getAllProductos = async (req, res) => {
    try {
        const productos = await productoService.getAllProductos();
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

        validateDTO(data, CreateProductoDTO);

        const producto = await productoService.createProducto(data);
        return res.status(201).json(producto);

    } catch (error) {
        console.error("Error creating producto:", error);
        return res.status(500).json({ error: error.message });
    }
};

const updateProducto = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ error: "Invalid producto ID" });
        }

        const data = req.body;

        validateDTO(data, UpdateProductoDTO);

        const producto = await productoService.updateProducto(id, data);

        if (!producto) {
            return res.status(404).json({ error: "Producto not found" });
        }

        return res.json(producto);

    } catch (error) {
        console.error("Error updating producto:", error);
        return res.status(500).json({ error: error.message });
    }
};

const deleteProducto = async (req, res) => {
    try {
      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid producto ID" });
      }

      await productoService.deleteProducto(id);
      return res.status(204).send();

    } catch (error) {
      console.error("Error deleting producto:", error);
      return res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllProductos,
    getProductoById,
    createProducto,
    updateProducto,
    deleteProducto
}