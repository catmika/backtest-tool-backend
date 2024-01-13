import { CookieOptions } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { RESPONSE_MESSAGES, STATUS_CODES } from '../../util/constants';
import User from '../../models/User.model';
import { ErrorHandler } from '../../util/errorHandler';

const signup = async (email: string, password: string) => {
  const user = await User.create({
    email,
    password,
  });

  const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  const refreshToken = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET_REFRESH,
    {
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
    },
  );

  const cookieOptionsAccessToken: CookieOptions = {
    expires: new Date(
      Date.now() + +process.env.JWT_EXPIRES_IN * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  };

  const cookieOptionsRefreshToken: CookieOptions = {
    expires: new Date(
      Date.now() + +process.env.JWT_REFRESH_EXPIRES_IN * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  };

  return {
    accessToken,
    refreshToken,
    cookieOptionsAccessToken,
    cookieOptionsRefreshToken,
  };
};

const login = async (email: string, password: string) => {
  const hashedEmail = await bcrypt.hash(email, 12);

  const user = await User.findOne({ email: hashedEmail });

  if (!user)
    throw new ErrorHandler(
      RESPONSE_MESSAGES.UNAUTHORIZED,
      STATUS_CODES.UNAUTHORIZED,
    );

  const isAuthorized = await bcrypt.compare(password, user.password);

  if (!isAuthorized) {
    throw new ErrorHandler(
      RESPONSE_MESSAGES.UNAUTHORIZED,
      STATUS_CODES.UNAUTHORIZED,
    );
  }

  const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  const refreshToken = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET_REFRESH,
    {
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
    },
  );

  const cookieOptionsAccessToken: CookieOptions = {
    expires: new Date(
      Date.now() + +process.env.JWT_EXPIRES_IN * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  };

  const cookieOptionsRefreshToken: CookieOptions = {
    expires: new Date(
      Date.now() + +process.env.JWT_REFRESH_EXPIRES_IN * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  };

  return {
    accessToken,
    refreshToken,
    cookieOptionsAccessToken,
    cookieOptionsRefreshToken,
  };
};

const refresh = async (refreshToken: string) => {
  const decoded = jwt.verify(
    refreshToken,
    process.env.JWT_SECRET,
  ) as JwtPayload;

  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    throw new ErrorHandler('User does not exist', STATUS_CODES.UNAUTHORIZED);
  }

  const accessToken = jwt.sign(
    { id: currentUser._id },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN },
  );

  const cookieOptionsAccessToken: CookieOptions = {
    expires: new Date(
      Date.now() + +process.env.JWT_EXPIRES_IN * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  };

  return { accessToken, cookieOptionsAccessToken };
};

export default {
  signup,
  login,
  refresh,
};
