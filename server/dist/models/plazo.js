"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
const PLazo = connection_1.default.define('Plazo', {
    idPeriod: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    description: {
        type: sequelize_1.DataTypes.STRING
    },
}, {
    tableName: 'period',
    timestamps: false, // Si no tienes columnas de timestamps
    updateAt: false
});
exports.default = PLazo;
