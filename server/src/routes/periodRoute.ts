import express , {Router} from 'express';
import { deletePeriod, getPeriod, getPeriods, postPeriod, putPeriod } from '../controllers/periodController';


const router = Router();

router.get('/', getPeriods);
router.get('/:idPeriod', getPeriod);
router.post('/', postPeriod);
router.delete('/:idPeriod', deletePeriod);
router.put('/:idPeriod', putPeriod);



export default router;