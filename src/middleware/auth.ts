import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

import { STATUS_CODES } from '../util/constants';
import { ErrorHandler } from '../util/errorHandler';
import User from '../models/User.model';

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeaderValue = req.headers.authorization;
    if (!authHeaderValue) {
      throw new ErrorHandler(
        'There was no "Authorization" header provided in the request.',
        STATUS_CODES.UNAUTHORIZED,
      );
    }
    const accessTokenMatch = authHeaderValue.match(/Bearer\s(.*)/);
    if (!accessTokenMatch || accessTokenMatch.length < 2) {
      throw new ErrorHandler(
        'There was no access token provided in the "Authorization" header.',
        STATUS_CODES.UNAUTHORIZED,
      );
    }

    const accessToken = accessTokenMatch[1];

    const decoded = jwt.verify(
      accessToken,
      process.env.JWT_SECRET,
    ) as JwtPayload;
    if (!decoded) {
      throw new ErrorHandler(
        'Invalid or expired access token',
        STATUS_CODES.UNAUTHORIZED,
      );
    }

    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      throw new ErrorHandler('User does not exist', STATUS_CODES.NOT_FOUND);
    }

    if (currentUser.changedPasswordAfter(decoded.iat)) {
      throw new ErrorHandler(
        'User recently changed password, please log in again',
        STATUS_CODES.UNAUTHORIZED,
      );
    }
    next();
  } catch (error) {
    next(error);
  }
};

export default auth;
