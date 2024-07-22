import  { Request, Response} from 'express';
import Cliente from '../models/client';
import Prestamo from '../models/loan';

export const getClients = async (req:Request, res:Response) =>{
    const listClients = await Cliente.findAll();
    res.json(listClients);
};

export const getClient = async(req:Request, res:Response) =>{

    const {idClient} = req.params;
    const client = await Cliente.findByPk(idClient);
    console.log(idClient)

    if(client){
        res.json(client);
    } else{
        res.status(404).json({
            msg:`No exite el client con el ID ${idClient}`
        });

    }
};


export const postClient = async (req:Request, res:Response) =>{
    const {body} = req;
    try {
        await Cliente.create(body);
        res.json({
            msg:'Cliente Agregado Correctamente',
            body

    });
    } catch (error) {
        console.log(error);
        res.json({
            msg:'Error en el Servidor',
            body
    
        });
        
    };

};


export const deleteClient = async (req:Request, res:Response) =>{

    const {idClient} = req.params;
    const client = await Cliente.findByPk(idClient);

    if(!client){
        res.status(404).json({
            msg:`No exite el cliente con el ID ${idClient}`
        });
    } else{
        // Verificar si el monto está referenciado en la tabla de prestamos
        const prestamoRelacionado = await Prestamo.findOne({ where: { idClient } });

        if (prestamoRelacionado) {
            res.status(400).json({
                msg: `No es posible eliminar el cliente con ID ${idClient} porque está referenciado en prestamos`
            });
        } else {
            await client.destroy();
            res.json({
                msg: `El cliente fue eliminado correctamente`
            });
        }
    };

};

export const putClient = async (req:Request, res:Response) =>{

    const {idClient} = req.params;
    const {body} = req;
    const client = await Cliente.findByPk(idClient);

    try {
        if(client){
            await client.update(body);
            res.json({
             msg:`El producto fue Editado Correctamente`
         });
     
         }else{
             res.status(404).json({
                 msg:`No exite el producto con el ID ${idClient}`
             });
         };
        
    } catch (error) {
        console.log(error);
        res.json({
            msg:'Error en el Servidor',
            body
    
        });

    };

};
    
