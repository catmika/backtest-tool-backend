import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

import User from '../models/User.model';
import { ErrorHandler } from '../util/errorHandler';
import { STATUS_CODES } from '../util/constants';
import { IRequestWithUser } from '../routes/users/interfaces';

const auth = async (
  req: IRequestWithUser,
  res: Response,
  next: NextFunction,
) => {
  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      throw new ErrorHandler(
        'There was no access token provided in the request.',
        STATUS_CODES.UNAUTHORIZED,
      );
    }

    let decoded: JwtPayload;

    try {
      decoded = jwt.verify(accessToken, process.env.JWT_SECRET) as JwtPayload;
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        throw new ErrorHandler(
          'Invalid or expired access token',
          STATUS_CODES.UNAUTHORIZED,
        );
      }
      throw error;
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

    req.user = { name: currentUser.name, email: currentUser.email };
    next();
  } catch (error) {
    next(error);
  }
};

export default auth;
