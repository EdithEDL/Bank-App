"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
const period_1 = __importDefault(require("./period"));
const Interest = connection_1.default.define('Interest', {
    idInterest: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    idPeriod: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'Plazo', // Nombre de la tabla referenciada
            key: 'idPeriod'
        }
    },
    interest: {
        type: sequelize_1.DataTypes.NUMBER,
    },
}, {
    tableName: 'interest',
    timestamps: false, // Si no tienes columnas de timestamps
    updateAt: false
});
Interest.belongsTo(period_1.default, { foreignKey: 'idPeriod' });
exports.default = Interest;
