import  { Request, Response} from 'express';
import Interest from "../models/interest";
import PLazo from '../models/period';
import Prestamo from '../models/loan';


export const getInterests = async (req:Request, res:Response) =>{
    try {
        const listInterest = await Interest.findAll({
          include: [
            { model: PLazo, attributes: ['description'] }
          ],
        });
        res.json(listInterest);
      } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error en el servidor' });
      }
};

export const getInterest = async(req:Request, res:Response) =>{
    const {idInterest} = req.params;
    const interest = await Interest.findByPk(idInterest);
    console.log(idInterest)
    if(interest){
        res.json(interest);
    } else{
        res.status(404).json({
            msg:`No exite el plazo con el ID ${idInterest}`
        });

    }
};


export const postInterest = async (req:Request, res:Response) =>{
    const {body} = req;
    try {
        await Interest.create(body);
        res.json({
            msg:'Interes Agregado Correctamente',
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

export const deleteInterest = async (req:Request, res:Response) =>{
    const {idInterest} = req.params;
    const interest = await Interest.findByPk(idInterest);

    if(!interest){
        res.status(404).json({
            msg:`No exite el interes con el ID ${idInterest}`
        });
    } else{
        // Verificar si el monto está referenciado en la tabla de prestamos
        const prestamoRelacionado = await Prestamo.findOne({ where: { idInterest } });

        if (prestamoRelacionado) {
            res.status(400).json({
                msg: `No es posible eliminar el interes con ID ${idInterest} porque está referenciado en prestamos`
            });
        } else {
            await interest.destroy();
            res.json({
                msg: `El cliente fue eliminado correctamente`
            });
        }
    };

};