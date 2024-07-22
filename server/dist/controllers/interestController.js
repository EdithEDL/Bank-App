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
exports.deleteInterest = exports.postInterest = exports.getInterest = exports.getInterests = void 0;
const interest_1 = __importDefault(require("../models/interest"));
const period_1 = __importDefault(require("../models/period"));
const loan_1 = __importDefault(require("../models/loan"));
const getInterests = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listInterest = yield interest_1.default.findAll({
            include: [
                { model: period_1.default, attributes: ['description'] }
            ],
        });
        res.json(listInterest);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
});
exports.getInterests = getInterests;
const getInterest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idInterest } = req.params;
    const interest = yield interest_1.default.findByPk(idInterest);
    console.log(idInterest);
    if (interest) {
        res.json(interest);
    }
    else {
        res.status(404).json({
            msg: `No exite el plazo con el ID ${idInterest}`
        });
    }
});
exports.getInterest = getInterest;
const postInterest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        yield interest_1.default.create(body);
        res.json({
            msg: 'Interes Agregado Correctamente',
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
exports.postInterest = postInterest;
const deleteInterest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idInterest } = req.params;
    const interest = yield interest_1.default.findByPk(idInterest);
    if (!interest) {
        res.status(404).json({
            msg: `No exite el interes con el ID ${idInterest}`
        });
    }
    else {
        // Verificar si el monto está referenciado en la tabla de prestamos
        const prestamoRelacionado = yield loan_1.default.findOne({ where: { idInterest } });
        if (prestamoRelacionado) {
            res.status(400).json({
                msg: `No es posible eliminar el interes con ID ${idInterest} porque está referenciado en prestamos`
            });
        }
        else {
            yield interest.destroy();
            res.json({
                msg: `El cliente fue eliminado correctamente`
            });
        }
    }
    ;
});
exports.deleteInterest = deleteInterest;
