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
exports.getInterestsByPeriod = exports.deleteLoan = exports.postLoan = exports.getLoan = exports.getLoans = void 0;
const loan_1 = __importDefault(require("../models/loan"));
const client_1 = __importDefault(require("../models/client"));
const amount_1 = __importDefault(require("../models/amount"));
const period_1 = __importDefault(require("../models/period"));
const interest_1 = __importDefault(require("../models/interest"));
const getLoans = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listLoan = yield loan_1.default.findAll({
            include: [
                { model: client_1.default, attributes: ['nameClient'] },
                { model: amount_1.default, attributes: ['totalAmount'] },
                { model: period_1.default, attributes: ['description'] },
                { model: interest_1.default, attributes: ['interest'] },
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
    const loan = yield loan_1.default.findByPk(idLoan);
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
    const { idClient, idAmount, idPeriod, idInterest } = req.body;
    console.log('Datos recibidos:', req.body);
    try {
        const newLoan = yield loan_1.default.create({
            idClient,
            idAmount,
            idPeriod,
            idInterest
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
    const loan = yield loan_1.default.findByPk(idLoan);
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
const getInterestsByPeriod = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { periodId } = req.query;
    try {
        const interests = yield interest_1.default.findAll({ where: { idPeriod: periodId } });
        res.json(interests);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
});
exports.getInterestsByPeriod = getInterestsByPeriod;
