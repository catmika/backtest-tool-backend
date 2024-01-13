import { Response, NextFunction, Request } from 'express';

import service from './service';

const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const {
      accessToken,
      refreshToken,
      cookieOptionsAccessToken,
      cookieOptionsRefreshToken,
    } = await service.signup(email, password);

    res.cookie('accessToken', accessToken, cookieOptionsAccessToken);
    res.cookie('refreshToken', refreshToken, cookieOptionsRefreshToken);
  } catch (error) {
    next(error);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const {
      accessToken,
      refreshToken,
      cookieOptionsAccessToken,
      cookieOptionsRefreshToken,
    } = await service.login(email, password);

    res.cookie('accessToken', accessToken, cookieOptionsAccessToken);
    res.cookie('refreshToken', refreshToken, cookieOptionsRefreshToken);
  } catch (error) {
    next(error);
  }
};

const refresh = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken } = req.body;

    const { accessToken, cookieOptionsAccessToken } =
      await service.refresh(refreshToken);

    res.cookie('accessToken', accessToken, cookieOptionsAccessToken);
  } catch (error) {
    next(error);
  }
};

export default {
  signup,
  login,
  refresh,
};
