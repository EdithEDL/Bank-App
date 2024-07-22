import express , {Router} from 'express';
import { deleteInterest, getInterest, getInterests, postInterest } from '../controllers/interestController';

const router = Router();

router.get('/', getInterests);
router.get('/:idInterest', getInterest);
router.post('/', postInterest);
router.delete('/:idInterest', deleteInterest);

export default router;