"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
const Monto = connection_1.default.define('Monto', {
    idAmount: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    totalAmount: {
        type: sequelize_1.DataTypes.NUMBER
    }
}, {
    tableName: 'amount',
    timestamps: false, // Si no tienes columnas de timestamps
    updateAt: false
});
exports.default = Monto;
