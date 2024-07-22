import express , {Router} from 'express';
import { deleteAmount, getAmount, getAmounts, postAmount, putAmount } from '../controllers/amountController';


const router = Router();

router.get('/', getAmounts);
router.get('/:idAmount', getAmount);
router.post('/', postAmount);
router.delete('/:idAmount', deleteAmount);
router.put('/:idAmount', putAmount);



export default router;