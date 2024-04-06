import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

import { STATUS_CODES } from '../util/constants';
import { ErrorHandler } from '../util/errorHandler';
import User from '../models/User.model';

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      throw new ErrorHandler(
        'There was no access token provided in the request.',
        STATUS_CODES.UNAUTHORIZED,
      );
    }

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

    (req as any).user = { name: currentUser.name, email: currentUser.email };
    next();
  } catch (error) {
    next(error);
  }
};

export default auth;
