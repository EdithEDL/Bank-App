"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
const Cliente = connection_1.default.define('Cliente', {
    idClient: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nameClient: {
        type: sequelize_1.DataTypes.STRING
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING
    },
    email: {
        type: sequelize_1.DataTypes.STRING
    },
    phone: {
        type: sequelize_1.DataTypes.NUMBER
    },
}, {
    tableName: 'client',
    timestamps: false, // Si no tienes columnas de timestamps
    updateAt: false
});
exports.default = Cliente;
