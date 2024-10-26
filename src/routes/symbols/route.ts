import { Router } from 'express';

import handler from './handler';
import auth from '../../middleware/auth';
import validation from '../../middleware/validation';
import schemas from '../../middleware/validation/schemas';

const router = Router();

router.get(
  '/',
  auth,
  validation(schemas.symbols.getSymbols),
  handler.getSymbols,
);

export default router;
