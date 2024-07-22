import express , {Router} from 'express';
import { deleteLoan, getLoan, getLoans, postLoan,} from '../controllers/loanController';



const router = Router();

router.get('/', getLoans);
router.get('/:idLoan', getLoan);
router.post('/', postLoan);
router.delete('/:idLoan', deleteLoan);



export default router;
