import  { Request, Response} from 'express';
import Prestamo from '../models/loan';
import Cliente from '../models/client';
import Monto from '../models/amount';
import Plazo from '../models/period';
import Interest from '../models/interest';


export const getLoans = async (req:Request, res:Response) =>{
    try {
        const listLoan = await Prestamo.findAll({
          include: [
            { model: Cliente, attributes: ['nameClient'] },
            { model: Monto, attributes: ['totalAmount'] },
            { model: Plazo, attributes: ['description'] },
            { model: Interest, attributes: ['interest'] },

          ],
        });
        res.json(listLoan);
      } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error en el servidor' });
      }
};

export const getLoan = async(req:Request, res:Response) =>{

    const {idLoan} = req.params;
    const loan = await Prestamo.findByPk(idLoan);
    console.log(idLoan)

    if(loan){
        res.json(loan);
    } else{
        res.status(404).json({
            msg:`No exite el prestamo con el ID ${idLoan}`
        });

    }
};


// Tu método postLoan en el backend
export const postLoan = async (req: Request, res: Response) => {
    const { idClient, idAmount, idPeriod , idInterest} = req.body;
    console.log('Datos recibidos:', req.body);
  
    try {
      const newLoan = await Prestamo.create({
        idClient,
        idAmount,
        idPeriod,
        idInterest
      });
      res.json({
        msg: 'Prestamo Agregado Correctamente',
        loan: newLoan
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: 'Error en el Servidor'
      });
    }
  };
  


export const deleteLoan = async (req:Request, res:Response) =>{
    const {idLoan} = req.params;
    const loan = await Prestamo.findByPk(idLoan);

    if(!loan){
        res.status(404).json({
            msg:`No exite el cliente con el ID ${idLoan}`
        });
    } else{
        await loan.destroy();
        res.json({
            msg:`El cliente fue Eliminado Correctamente`
        });
    };

};

export const getInterestsByPeriod = async (req: Request, res: Response) => {
  const { periodId } = req.query;
  try {
    const interests = await Interest.findAll({ where: { idPeriod: periodId } });
    res.json(interests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error en el servidor' });
  }
};



