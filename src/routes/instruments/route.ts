import { Router } from 'express';

import handler from './handler';
import auth from '../../middleware/auth';
import validation from '../../middleware/validation';
import schemas from '../../middleware/validation/schemas';

const router = Router();

router.get(
  '/earliest-timestamp',
  auth,
  validation(schemas.instruments.getEarliestTimestamp),
  handler.getEarliestTimestamp,
);

router.get(
  '/consecutive-candles',
  auth,
  validation(schemas.instruments.testConsecutiveCandles),
  handler.testConsecutiveCandles,
);

export default router;
