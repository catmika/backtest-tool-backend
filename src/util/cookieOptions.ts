import { CookieOptions } from 'express';
import { calcExpiration } from '../routes/users/service';

export const cookieOptionsAccessToken: CookieOptions = {
  expires: new Date(
    new Date().getTime() +
      +calcExpiration(process.env.JWT_EXPIRES_IN).split('m')[0] * 60 * 1000,
  ),
  httpOnly: true,
  sameSite: 'strict',
  secure: process.env.NODE_ENV === 'production',
};

export const cookieOptionsRefreshToken: CookieOptions = {
  expires: new Date(
    new Date().getTime() +
      +calcExpiration(process.env.JWT_REFRESH_EXPIRES_IN).split('m')[0] *
        60 *
        1000,
  ),
  httpOnly: true,
  sameSite: 'strict',
  secure: process.env.NODE_ENV === 'production',
};
