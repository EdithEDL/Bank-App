"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('bank', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});
exports.default = sequelize;
