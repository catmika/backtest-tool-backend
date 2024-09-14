import { Router } from 'express';

import handler from './handler';
import auth from '../../middleware/auth';
import validation from '../../middleware/validation';
import schemas from '../../middleware/validation/schemas';
import formatSymbol from '../../middleware/formatSymbol';

const router = Router();

router.get(
  '/earliest-timestamp',
  auth,
  validation(schemas.instruments.getEarliestTimestamp),
  formatSymbol,
  handler.getEarliestTimestamp,
);

router.get(
  '/consecutive-candles',
  auth,
  validation(schemas.instruments.testConsecutiveCandles),
  formatSymbol,
  handler.testConsecutiveCandles,
);

router.get(
  '/previous-key-levels',
  auth,
  validation(schemas.instruments.testPreviousKeyLevels),
  formatSymbol,
  handler.testPreviousKeyLevels,
);

export default router;
