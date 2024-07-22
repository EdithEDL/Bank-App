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
exports.putClient = exports.deleteClient = exports.postClient = exports.getClient = exports.getClients = void 0;
const cliente_1 = __importDefault(require("../models/cliente"));
const prestamo_1 = __importDefault(require("../models/prestamo"));
const getClients = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listClients = yield cliente_1.default.findAll();
    res.json(listClients);
});
exports.getClients = getClients;
const getClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idClient } = req.params;
    const client = yield cliente_1.default.findByPk(idClient);
    console.log(idClient);
    if (client) {
        res.json(client);
    }
    else {
        res.status(404).json({
            msg: `No exite el client con el ID ${idClient}`
        });
    }
});
exports.getClient = getClient;
const postClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        yield cliente_1.default.create(body);
        res.json({
            msg: 'Cliente Agregado Correctamente',
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
exports.postClient = postClient;
const deleteClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idClient } = req.params;
    const client = yield cliente_1.default.findByPk(idClient);
    if (!client) {
        res.status(404).json({
            msg: `No exite el cliente con el ID ${idClient}`
        });
    }
    else {
        // Verificar si el monto está referenciado en la tabla de prestamos
        const prestamoRelacionado = yield prestamo_1.default.findOne({ where: { idClient } });
        if (prestamoRelacionado) {
            res.status(400).json({
                msg: `No es posible eliminar el cliente con ID ${idClient} porque está referenciado en prestamos`
            });
        }
        else {
            yield client.destroy();
            res.json({
                msg: `El cliente fue eliminado correctamente`
            });
        }
    }
    ;
});
exports.deleteClient = deleteClient;
const putClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idClient } = req.params;
    const { body } = req;
    const client = yield cliente_1.default.findByPk(idClient);
    try {
        if (client) {
            yield client.update(body);
            res.json({
                msg: `El producto fue Editado Correctamente`
            });
        }
        else {
            res.status(404).json({
                msg: `No exite el producto con el ID ${idClient}`
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
exports.putClient = putClient;
