"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postProduct = exports.putProduct = exports.deleteProduct = exports.getProduct = exports.getProducts = void 0;
const producto_1 = __importDefault(require("../models/producto"));
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listProducts = yield producto_1.default.findAll();
    res.json(listProducts);
});
exports.getProducts = getProducts;
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const product = yield producto_1.default.findByPk(id);
    if (product) {
        res.json(product);
    }
    else {
        res.status(404).json({
            msg: `No exite el producto con el ID ${id}`
        });
    }
    ;
});
exports.getProduct = getProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const product = yield producto_1.default.findByPk(id);
    if (!product) {
        res.status(404).json({
            msg: `No exite el producto con el ID ${id}`
        });
    }
    else {
        yield product.destroy();
        res.json({
            msg: `El producto fue Eliminado Correctamente`
        });
    }
    ;
});
exports.deleteProduct = deleteProduct;
const putProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    const product = yield producto_1.default.findByPk(id);
    try {
        if (product) {
            yield product.update(body);
            res.json({
                msg: `El producto fue Editado Correctamente`
            });
        }
        else {
            res.status(404).json({
                msg: `No exite el producto con el ID ${id}`
            });
        }
        ;
    }
    catch (error) {
        console.log(error);
        res.json({
            msg: 'Error en el Servidor',
            body
        });
    }
    ;
});
exports.putProduct = putProduct;
const postProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        yield producto_1.default.create(body);
        res.json({
            msg: 'Producto Agregado Correctamente',
            body
        });
    }
    catch (error) {
        console.log(error);
        res.json({
            msg: 'Error en el Servidor',
            body
        });
    }
    ;
});
exports.postProduct = postProduct;
