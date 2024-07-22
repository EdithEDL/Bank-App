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
exports.putPeriod = exports.deletePeriod = exports.postPeriod = exports.getPeriod = exports.getPeriods = void 0;
const plazo_1 = __importDefault(require("../models/plazo"));
const prestamo_1 = __importDefault(require("../models/prestamo"));
const getPeriods = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listPeriods = yield plazo_1.default.findAll();
    res.json(listPeriods);
});
exports.getPeriods = getPeriods;
const getPeriod = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idPeriod } = req.params;
    const period = yield plazo_1.default.findByPk(idPeriod);
    console.log(idPeriod);
    if (period) {
        res.json(period);
    }
    else {
        res.status(404).json({
            msg: `No exite el plazo con el ID ${idPeriod}`
        });
    }
});
exports.getPeriod = getPeriod;
const postPeriod = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        yield plazo_1.default.create(body);
        res.json({
            msg: 'Plazo Agregado Correctamente',
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
exports.postPeriod = postPeriod;
const deletePeriod = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idPeriod } = req.params;
    const period = yield plazo_1.default.findByPk(idPeriod);
    if (!period) {
        res.status(404).json({
            msg: `No existe el plazo con el ID ${idPeriod}`
        });
    }
    else {
        // Verificar si el plazo está referenciado en la tabla de préstamos
        const prestamoRelacionado = yield prestamo_1.default.findOne({ where: { idPeriod } });
        if (prestamoRelacionado) {
            res.status(400).json({
                msg: `No es posible eliminar el plazo con ID ${idPeriod} porque está referenciado en préstamos`
            });
        }
        else {
            yield period.destroy();
            res.json({
                msg: `El plazo fue eliminado correctamente`
            });
        }
    }
});
exports.deletePeriod = deletePeriod;
const putPeriod = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idPeriod } = req.params;
    const { body } = req;
    const period = yield plazo_1.default.findByPk(idPeriod);
    try {
        if (period) {
            yield period.update(body);
            res.json({
                msg: `El plazo fue Editado Correctamente`
            });
        }
        else {
            res.status(404).json({
                msg: `No exite el plazo con el ID ${idPeriod}`
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
exports.putPeriod = putPeriod;
