import { Router } from 'express';

import handler from './handler';
import auth from '../../middleware/auth';

const router = Router();

router.get('/', auth, handler.getSymbols);

export default router;
