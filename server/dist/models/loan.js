"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
const client_1 = __importDefault(require("./client"));
const amount_1 = __importDefault(require("./amount"));
const period_1 = __importDefault(require("./period"));
const interest_1 = __importDefault(require("./interest"));
const Prestamo = connection_1.default.define('Prestamo', {
    idLoan: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    idClient: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'Cliente', // Nombre de la tabla referenciada
            key: 'idClient'
        }
    },
    idPeriod: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'Plazo', // Nombre de la tabla referenciada
            key: 'idPeriod'
        }
    },
    idAmount: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'Monto', // Nombre de la tabla referenciada
            key: 'idAmount'
        }
    },
    idInterest: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'Interest', // Nombre de la tabla referenciada
            key: 'idInterest'
        }
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    tableName: 'loan',
    timestamps: false,
});
// Definir las asociaciones
Prestamo.belongsTo(client_1.default, { foreignKey: 'idClient' });
Prestamo.belongsTo(amount_1.default, { foreignKey: 'idAmount' });
Prestamo.belongsTo(period_1.default, { foreignKey: 'idPeriod' });
Prestamo.belongsTo(interest_1.default, { foreignKey: 'idInterest' });
exports.default = Prestamo;
