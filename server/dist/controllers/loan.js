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
exports.deleteLoan = exports.postLoan = exports.getLoan = exports.getLoans = void 0;
const prestamo_1 = __importDefault(require("../models/prestamo"));
const cliente_1 = __importDefault(require("../models/cliente"));
const monto_1 = __importDefault(require("../models/monto"));
const plazo_1 = __importDefault(require("../models/plazo"));
const getLoans = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listLoan = yield prestamo_1.default.findAll({
            include: [
                { model: cliente_1.default, attributes: ['nameClient'] },
                { model: monto_1.default, attributes: ['totalAmount'] },
                { model: plazo_1.default, attributes: ['description'] },
            ],
        });
        res.json(listLoan);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
});
exports.getLoans = getLoans;
const getLoan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idLoan } = req.params;
    const loan = yield prestamo_1.default.findByPk(idLoan);
    console.log(idLoan);
    if (loan) {
        res.json(loan);
    }
    else {
        res.status(404).json({
            msg: `No exite el prestamo con el ID ${idLoan}`
        });
    }
});
exports.getLoan = getLoan;
// Tu método postLoan en el backend
const postLoan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idClient, idAmount, idPeriod } = req.body;
    try {
        const newLoan = yield prestamo_1.default.create({
            idClient,
            idAmount,
            idPeriod
        });
        res.json({
            msg: 'Prestamo Agregado Correctamente',
            loan: newLoan
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error en el Servidor'
        });
    }
});
exports.postLoan = postLoan;
const deleteLoan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idLoan } = req.params;
    const loan = yield prestamo_1.default.findByPk(idLoan);
    if (!loan) {
        res.status(404).json({
            msg: `No exite el cliente con el ID ${idLoan}`
        });
    }
    else {
        yield loan.destroy();
        res.json({
            msg: `El cliente fue Eliminado Correctamente`
        });
    }
    ;
});
exports.deleteLoan = deleteLoan;
