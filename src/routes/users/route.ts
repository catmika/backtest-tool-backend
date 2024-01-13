import { Router } from 'express';

import handler from './handler';

const router = Router();

router.post('/signup', handler.signup);
router.post('/login', handler.login);
router.post('/refresh', handler.refresh);

export default router;
