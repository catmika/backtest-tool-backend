import { Router } from 'express';

import handler from './handler';
import validation from '../../middleware/validation';
import schemas from '../../middleware/validation/schemas';

const router = Router();

router.get('/confirm', handler.confirm);

router.post('/signup', validation(schemas.user.signup), handler.signup);
router.post('/signin', validation(schemas.user.signin), handler.signin);
router.post('/signin-google', handler.signinGoogle);
router.post('/refresh', validation(schemas.user.refresh), handler.refresh);
router.post(
  '/forgot-password',
  validation(schemas.user.forgotPassword),
  handler.forgotPassword,
);
router.post(
  '/reset-password',
  validation(schemas.user.resetPassword),
  handler.resetPassword,
);

export default router;
