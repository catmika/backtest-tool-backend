import { CookieOptions } from 'express';

const calcExpiration = (min: string) => {
  return (+min.split('m')[0] - new Date().getTimezoneOffset()).toString() + 'm';
};

export const cookieOptionsAccessToken: CookieOptions = {
  expires: new Date(
    new Date().getTime() +
      +calcExpiration(process.env.JWT_EXPIRES_IN).split('m')[0] * 60 * 1000,
  ),
  httpOnly: true,
  sameSite: 'strict',
  secure: true,
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
  secure: true,
};
