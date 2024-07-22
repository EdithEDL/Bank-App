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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const clientRoute_1 = __importDefault(require("../routes/clientRoute"));
const loanRoute_1 = __importDefault(require("../routes/loanRoute"));
const amountRoute_1 = __importDefault(require("../routes/amountRoute"));
const periodRoute_1 = __importDefault(require("../routes/periodRoute"));
const interestRoute_1 = __importDefault(require("../routes/interestRoute"));
const connection_1 = __importDefault(require("../db/connection"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3001';
        this.listen();
        this.midlewares();
        this.routes();
        this.dbConnection();
    }
    ;
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Funcionando en el puerto: ${this.port}`);
        });
    }
    ;
    routes() {
        this.app.get('/', (req, res) => {
            res.json({
                msg: 'API Trabajando'
            });
        });
        this.app.use('/api/clientes', clientRoute_1.default);
        this.app.use('/api/prestamos', loanRoute_1.default);
        this.app.use('/api/montos', amountRoute_1.default);
        this.app.use('/api/plazos', periodRoute_1.default);
        this.app.use('/api/intereses', interestRoute_1.default);
    }
    ;
    midlewares() {
        //pasar el body en postProduct
        this.app.use(express_1.default.json());
        //Cors
        this.app.use((0, cors_1.default)());
    }
    ;
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.authenticate();
                console.log('Base Conectada');
            }
            catch (error) {
                console.log(error);
                console.log('Error al Conectar la Base');
            }
        });
    }
    ;
}
;
exports.default = Server;
