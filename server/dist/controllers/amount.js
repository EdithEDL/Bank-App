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
exports.putAmount = exports.deleteAmount = exports.postAmount = exports.getAmount = exports.getAmounts = void 0;
const monto_1 = __importDefault(require("../models/monto"));
const prestamo_1 = __importDefault(require("../models/prestamo"));
const getAmounts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listAmounts = yield monto_1.default.findAll();
    res.json(listAmounts);
});
exports.getAmounts = getAmounts;
const getAmount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idAmount } = req.params;
    const amount = yield monto_1.default.findByPk(idAmount);
    console.log(idAmount);
    if (amount) {
        res.json(amount);
    }
    else {
        res.status(404).json({
            msg: `No exite el Monto con el ID ${idAmount}`
        });
    }
});
exports.getAmount = getAmount;
const postAmount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        yield monto_1.default.create(body);
        res.json({
            msg: 'Monto Agregado Correctamente',
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
exports.postAmount = postAmount;
const deleteAmount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idAmount } = req.params;
    const amount = yield monto_1.default.findByPk(idAmount);
    if (!amount) {
        res.status(404).json({
            msg: `No existe el monto con el ID ${idAmount}`
        });
    }
    else {
        // Verificar si el monto está referenciado en la tabla de prestamos
        const prestamoRelacionado = yield prestamo_1.default.findOne({ where: { idAmount } });
        if (prestamoRelacionado) {
            res.status(400).json({
                msg: `No es posible eliminar el monto con ID ${idAmount} porque está referenciado en prestamos`
            });
        }
        else {
            yield amount.destroy();
            res.json({
                msg: `El monto fue eliminado correctamente`
            });
        }
    }
});
exports.deleteAmount = deleteAmount;
const putAmount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idAmount } = req.params;
    const { body } = req;
    const amount = yield monto_1.default.findByPk(idAmount);
    try {
        if (amount) {
            yield amount.update(body);
            res.json({
                msg: `El monto fue Editado Correctamente`
            });
        }
        else {
            res.status(404).json({
                msg: `No exite el monto con el ID ${idAmount}`
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
exports.putAmount = putAmount;
