import  { Request, Response} from 'express';
import Monto from '../models/amount';
import Prestamo from '../models/loan';


export const getAmounts = async (req:Request, res:Response) =>{
    const listAmounts = await Monto.findAll();
    res.json(listAmounts);
};

export const getAmount = async(req:Request, res:Response) =>{

    const {idAmount} = req.params;
    const amount = await Monto.findByPk(idAmount);
    console.log(idAmount)

    if(amount){
        res.json(amount);
    } else{
        res.status(404).json({
            msg:`No exite el Monto con el ID ${idAmount}`
        });

    }
};


export const postAmount = async (req:Request, res:Response) =>{

    const {body} = req;

    try {
        await Monto.create(body);
        res.json({
            msg:'Monto Agregado Correctamente',
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


export const deleteAmount = async (req: Request, res: Response) => {
    const { idAmount } = req.params;
    const amount = await Monto.findByPk(idAmount);

    if (!amount) {
        res.status(404).json({
            msg: `No existe el monto con el ID ${idAmount}`
        });
    } else {
        // Verificar si el monto está referenciado en la tabla de prestamos
        const prestamoRelacionado = await Prestamo.findOne({ where: { idAmount } });

        if (prestamoRelacionado) {
            res.status(400).json({
                msg: `No es posible eliminar el monto con ID ${idAmount} porque está referenciado en prestamos`
            });
        } else {
            await amount.destroy();
            res.json({
                msg: `El monto fue eliminado correctamente`
            });
        }
    }
};

export const putAmount = async (req:Request, res:Response) =>{

    const {idAmount} = req.params;
    const {body} = req;
    const amount = await Monto.findByPk(idAmount);

    try {
        if(amount){
            await amount.update(body);
            res.json({
             msg:`El monto fue Editado Correctamente`
         });
     
         }else{
             res.status(404).json({
                 msg:`No exite el monto con el ID ${idAmount}`
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