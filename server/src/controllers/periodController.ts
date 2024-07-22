import  { Request, Response} from 'express';
import PLazo from '../models/period';
import Prestamo from '../models/loan';


export const getPeriods = async (req:Request, res:Response) =>{
    const listPeriods = await PLazo.findAll();
    res.json(listPeriods);
};

export const getPeriod = async(req:Request, res:Response) =>{
    const {idPeriod} = req.params;
    const period = await PLazo.findByPk(idPeriod);
    console.log(idPeriod)
    if(period){
        res.json(period);
    } else{
        res.status(404).json({
            msg:`No exite el plazo con el ID ${idPeriod}`
        });

    }
};


export const postPeriod = async (req:Request, res:Response) =>{
    const {body} = req;
    try {
        await PLazo.create(body);
        res.json({
            msg:'Plazo Agregado Correctamente',
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


export const deletePeriod = async (req: Request, res: Response) => {
    const { idPeriod } = req.params;
    const period = await PLazo.findByPk(idPeriod);

    if (!period) {
        res.status(404).json({
            msg: `No existe el plazo con el ID ${idPeriod}`
        });
    } else {
        // Verificar si el plazo está referenciado en la tabla de préstamos
        const prestamoRelacionado = await Prestamo.findOne({ where: { idPeriod } });

        if (prestamoRelacionado) {
            res.status(400).json({
                msg: `No es posible eliminar el plazo con ID ${idPeriod} porque está referenciado en préstamos`
            });
        } else {
            await period.destroy();
            res.json({
                msg: `El plazo fue eliminado correctamente`
            });
        }
    }
};

export const putPeriod = async (req:Request, res:Response) =>{
    const {idPeriod} = req.params;
    const {body} = req;
    const period = await PLazo.findByPk(idPeriod);
    try {
        if(period){
            await period.update(body);
            res.json({
             msg:`El plazo fue Editado Correctamente`
         });
     
         }else{
             res.status(404).json({
                 msg:`No exite el plazo con el ID ${idPeriod}`
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
    
