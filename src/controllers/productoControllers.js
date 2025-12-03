import * as productoServices from "../services/productoServices.js";
import * as funcionesUtilidad from "../utils/funcionesUtilidad.js";
import { CreateProductoDTO, UpdateProductoDTO } from "../models/productoModel.js";
import prisma from "../config/db.js";

// await ordena a que la ejecucion se detenga temporalmente hasta que la instruccion siguiente se complete
// req representa la estrutura de datos, res reresenta la respuesta y next la siguiente funcion que debe ser ejecutada(usado comunmente para middleware) 
// status indica el codgio de estado para la peticion http
// body contiene todos los datos del objeto enviado en la peticion, params indica a que objeto o parametro en especifico se hace alusion en la peticion
// try intenta una serie de intrucciones, catch en caso de que alguna de las instrucciones falle se ejecuta su contenido, finally una vez termina todo el try(sin errores) se ejecuta su contenido
// const tipo de dato que no se espera que cambie

const getAllProductos = async (req, res) => {
    try {
        const productos = await productoServices.getAllProductos();
        return res.status(200).json(productos);
    } catch (error) {
        console.error("Error getting Productos:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const getProductoById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ error: "Invalid Producto ID" });
        }

        const producto = await productoServices.getProductoById(id);
        if (!producto) {
            return res.status(404).json({ error: "Producto not found" });
        }

        return res.status(200).json(producto);
    } catch (error) {
        console.error("Error getting Producto:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const createProducto = async (req, res) => {
    try {
        const data = req.body;
        const user_uid = req.user.uid;
        const sku = req.body.SKU;

        //validar DTO
        const { error } = CreateProductoDTO.validate(data);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        // corrobora que el precio de venta sea mayor que el de compra
        const precio_venta = data.precio_venta;
        const precio_compra = data.precio_compra;

        const verificarPrecio = await funcionesUtilidad.verificarMayorMenorParametro(precio_venta, precio_compra);
        if (verificarPrecio == false) {
            return res.status(400).json({ error: "The precio_venta " + precio_venta + " cannot be less than the precio_compra " + precio_compra })
        }

        // corrobora que el precio actual sea mayor que el minimo
        const stock_actual = data.stock_actual;
        const stock_minimo = data.stock_minimo;

        const verificarStock = await funcionesUtilidad.verificarMayorMenorParametro(stock_actual, stock_minimo);
        if (verificarStock == false) {
            return res.status(400).json({ error: "The stock_actual " + stock_actual + " cannot be less than the stock_minimo " + stock_minimo })
        }

        if (sku) {
            //verificar SKU existente
            const SKUExistente = await prisma.Producto.findUnique({
                where: { SKU: data.SKU },
            });
            if (SKUExistente) {
                return res.status(400).json({ error: "A producto with SKU " + data.SKU + " already exists" });
            }
        }

        const producto = await productoServices.createProducto(data, user_uid);
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

        //validar DTO
        const { error } = UpdateProductoDTO.validate(data);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        // corrobora que el precio de venta sea mayor que el de compra
        const precio_venta = data.precio_venta;
        const precio_compra = data.precio_compra;

        const verificarPrecio = await funcionesUtilidad.verificarMayorMenorParametro(precio_venta, precio_compra);
        if (verificarPrecio == false) {
            return res.status(400).json({ error: "The precio_venta " + precio_venta + " cannot be less than the precio_compra " + precio_compra })
        }

        // corrobora que el precio actual sea mayor que el minimo
        const stock_actual = data.stock_actual;
        const stock_minimo = data.stock_minimo;

        const verificarStock = await funcionesUtilidad.verificarMayorMenorParametro(stock_actual, stock_minimo);
        if (verificarStock == false) {
            return res.status(400).json({ error: "The stock_actual " + stock_actual + " cannot be less than the stock_minimo " + stock_minimo })
        }

        const producto = await productoServices.updateProducto(id, data);

        if (!producto) {
            return res.status(404).json({ error: "Producto not found" });
        }

        return res.status(200).json(producto);
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
};