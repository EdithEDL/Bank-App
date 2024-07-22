
import express , {Application, Request, Response} from 'express';
import cors from 'cors';
import routeClient from '../routes/clientRoute';
import routeLoan from '../routes/loanRoute';
import routeAmount from '../routes/amountRoute';
import routePeriod from '../routes/periodRoute';
import routeInterest from '../routes/interestRoute'

import db from '../db/connection';




class Server {

    private app:express.Application;
    private port: number | string;

    constructor (){
        this.app = express();
        this.port = process.env.PORT ||'3001';
        this.listen();
        this.midlewares();
        this.routes();
        this.dbConnection();

    };

    listen(){
        this.app.listen(this.port, () =>{
            console.log(`Funcionando en el puerto: ${this.port}`);

        });
    };

    routes(){
        this.app.get('/', (req:Request, res:Response) => {
            res.json({
                msg:'API Trabajando'
            });

        });
        this.app.use('/api/clientes', routeClient);
        this.app.use('/api/prestamos', routeLoan);
        this.app.use('/api/montos', routeAmount);
        this.app.use('/api/plazos', routePeriod);
        this.app.use('/api/intereses', routeInterest);




    };

    midlewares(){

        //pasar el body en postProduct
        this.app.use(express.json());

        //Cors
        this.app.use(cors());

    };


    async dbConnection(){

        try {
            await db.authenticate();
            console.log('Base Conectada')  
        } catch (error) {
            console.log(error)
            console.log('Error al Conectar la Base') 
        }
        
    };



};

export default Server;