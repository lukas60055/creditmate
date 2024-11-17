import { Router } from 'express';
import { calculateCredit } from '../controllers/creditController';

const router = Router();

router.post('/', calculateCredit);

export default router;
