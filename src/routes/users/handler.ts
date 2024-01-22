import { Response, NextFunction, Request } from 'express';

import service from './service';
import {
  cookieOptionsAccessToken,
  cookieOptionsRefreshToken,
} from '../../util/cookieOptions';
import { RESPONSE_MESSAGES } from '../../util/constants';

const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    await service.signup(email, password);

    res.send({ message: 'Email for confirmation was sent' });
  } catch (error) {
    next(error);
  }
};

const confirm = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.query.token as string;

    await service.confirm(token);

    res.redirect(`${process.env.FRONT_END_BASE_URL}/signin`);
  } catch (error) {
    next(error);
  }
};

const signin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const { accessToken, refreshToken } = await service.signin(email, password);

    res.cookie('accessToken', accessToken, cookieOptionsAccessToken);
    res.cookie('refreshToken', refreshToken, cookieOptionsRefreshToken);
    res.send({ message: RESPONSE_MESSAGES.SUCCESS });
  } catch (error) {
    next(error);
  }
};

const signinGoogle = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { credential } = req.body;

    const { accessToken, refreshToken } =
      await service.signinGoogle(credential);

    res.cookie('accessToken', accessToken, cookieOptionsAccessToken);
    res.cookie('refreshToken', refreshToken, cookieOptionsRefreshToken);
    // res.redirect(`${process.env.FRONT_END_BASE_URL}/about`);
    res.send({ message: RESPONSE_MESSAGES.SUCCESS });
  } catch (error) {
    next(error);
  }
};

const refresh = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken } = req.body;

    const { accessToken } = await service.refresh(refreshToken);

    res.cookie('accessToken', accessToken, cookieOptionsAccessToken);
    res.send({ message: RESPONSE_MESSAGES.SUCCESS });
  } catch (error) {
    next(error);
  }
};

const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email } = req.body;

    await service.forgotPassword(email);

    res.send({ message: 'Email for resetting password was sent' });
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.query.token as string;
    const { newPassword } = req.body;

    await service.resetPassword(token, newPassword);

    res.redirect(`${process.env.FRONT_END_BASE_URL}/signin`);
  } catch (error) {
    next(error);
  }
};

export default {
  signup,
  confirm,
  signin,
  signinGoogle,
  refresh,
  forgotPassword,
  resetPassword,
};
