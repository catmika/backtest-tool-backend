import { Router } from 'express';

import usersRouter from './users/route';
import symbolsRouter from './symbols/route';

const router = Router();

router.use('/', usersRouter);
router.use('/symbols', symbolsRouter);

export default router;
