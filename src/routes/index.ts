import { Router } from 'express';

import usersRouter from './users/route';
import symbolsRouter from './symbols/route';
import instrumentsRouter from './instruments/route';

const router = Router();

router.use('/', usersRouter);
router.use('/symbols', symbolsRouter);
router.use('/instruments', instrumentsRouter);

export default router;
