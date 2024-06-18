import { Router } from 'express';

import handler from './handler';
import validation from '../../middleware/validation';
import schemas from '../../middleware/validation/schemas';
import auth from '../../middleware/auth';

const router = Router();

router.get('/user', auth, handler.getUser);
router.get('/confirm', handler.confirm);

router.post('/signup', validation(schemas.users.signup), handler.signup);
router.post('/signin', validation(schemas.users.signin), handler.signin);
router.post('/signin-google', handler.signinGoogle);
router.post('/logout', handler.logout);
router.post('/refresh', handler.refresh);
router.post(
  '/forgot-password',
  validation(schemas.users.forgotPassword),
  handler.forgotPassword,
);
router.post(
  '/reset-password',
  validation(schemas.users.resetPassword),
  handler.resetPassword,
);

export default router;
