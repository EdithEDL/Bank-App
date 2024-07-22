import express , {Router} from 'express';
import { deleteClient, getClient, getClients, postClient, putClient} from '../controllers/clientController';


const router = Router();

router.get('/', getClients);
router.get('/:idClient', getClient);
router.post('/', postClient);
router.delete('/:idClient', deleteClient);
router.put('/:idClient', putClient);



export default router;