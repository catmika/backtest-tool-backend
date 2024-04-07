import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Document } from 'mongoose';

import { RESPONSE_MESSAGES, STATUS_CODES } from '../../util/constants';
import User from '../../models/User.model';
import { ErrorHandler } from '../../util/errorHandler';
import { sendEmail } from '../../util/email';

export const calcExpiration = (min: string) => {
  return (+min.split('m')[0] - new Date().getTimezoneOffset()).toString() + 'm';
};

const signup = async (email: string, password: string) => {
  const confirmationToken = jwt.sign(
    { email },
    process.env.JWT_SECRET_CONFIRMATION,
    {
      expiresIn: calcExpiration(process.env.JWT_CONFIRMATION_EXPIRES_IN),
    },
  );

  const existingUser = await User.findOne({ email });

  if (existingUser && existingUser.isConfirmed) {
    throw new ErrorHandler(
      'User with this email already exist',
      STATUS_CODES.UNAUTHORIZED,
    );
  }

  if (existingUser && !existingUser.isConfirmed) {
    existingUser.confirmationToken = confirmationToken;
    await existingUser.save();
  }

  if (!existingUser) {
    await User.create({
      email,
      password,
      confirmationToken,
    });
  }

  const link = `${process.env.APP_BASE_URL}/confirm?token=${confirmationToken}`;
  await sendEmail({
    email,
    subject: 'Email confirmation',
    link,
    template: 'email-confirmation',
  });
};

const confirm = async (confirmationToken: string) => {
  const decoded = jwt.verify(
    confirmationToken,
    process.env.JWT_SECRET_CONFIRMATION,
  ) as JwtPayload;

  if (!decoded) {
    throw new ErrorHandler(
      'Invalid or expired confirmation token',
      STATUS_CODES.UNAUTHORIZED,
    );
  }

  const user = await User.findOneAndUpdate(
    { email: decoded.email },
    { $set: { isConfirmed: true }, $unset: { confirmationToken: 1 } },
    { new: true },
  );

  if (!user) {
    throw new ErrorHandler('User does not exist', STATUS_CODES.NOT_FOUND);
  }

  return user.isConfirmed;
};

const signin = async (email: string, password: string) => {
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    throw new ErrorHandler('User does not exist', STATUS_CODES.NOT_FOUND);
  }

  if (!user.isConfirmed) {
    throw new ErrorHandler(
      'User email is not confirmed',
      STATUS_CODES.UNAUTHORIZED,
    );
  }

  if (user.isGoogle) {
    throw new ErrorHandler(
      'This email is used with google authentication',
      STATUS_CODES.UNAUTHORIZED,
    );
  }

  const isAuthorized = await bcrypt.compare(password, user.password);

  if (!isAuthorized) {
    throw new ErrorHandler(
      RESPONSE_MESSAGES.UNAUTHORIZED,
      STATUS_CODES.UNAUTHORIZED,
    );
  }

  const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: calcExpiration(process.env.JWT_EXPIRES_IN),
  });

  const refreshToken = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET_REFRESH,
    {
      expiresIn: calcExpiration(process.env.JWT_REFRESH_EXPIRES_IN),
    },
  );

  return {
    accessToken,
    refreshToken,
  };
};

const signinGoogle = async (token: string) => {
  const payload = jwt.decode(token) as JwtPayload;

  if (!payload?.email_verified) {
    throw new ErrorHandler(
      'Google account is not verified',
      STATUS_CODES.UNAUTHORIZED,
    );
  }

  if (!payload?.email) {
    throw new ErrorHandler(
      'There is error in google authentication',
      STATUS_CODES.UNAUTHORIZED,
    );
  }

  const user = await User.findOne({ email: payload?.email });

  let newUser: Document;

  if (!user) {
    newUser = new User({
      email: payload.email,
      isGoogle: true,
      isConfirmed: true,
    });
    await newUser.save({ validateBeforeSave: false });
  }

  const accessToken = jwt.sign(
    { id: user ? user._id : newUser._id },
    process.env.JWT_SECRET,
    {
      expiresIn: calcExpiration(process.env.JWT_EXPIRES_IN),
    },
  );

  const refreshToken = jwt.sign(
    { id: user ? user._id : newUser._id },
    process.env.JWT_SECRET_REFRESH,
    {
      expiresIn: calcExpiration(process.env.JWT_REFRESH_EXPIRES_IN),
    },
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refresh = async (refreshToken: string) => {
  const decoded = jwt.verify(
    refreshToken,
    process.env.JWT_SECRET,
  ) as JwtPayload;

  if (!decoded) {
    throw new ErrorHandler(
      'Invalid or expired refresh token',
      STATUS_CODES.UNAUTHORIZED,
    );
  }

  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    throw new ErrorHandler('User does not exist', STATUS_CODES.NOT_FOUND);
  }

  const accessToken = jwt.sign(
    { id: currentUser._id },
    process.env.JWT_SECRET,
    { expiresIn: calcExpiration(process.env.JWT_EXPIRES_IN) },
  );

  return { accessToken };
};

const forgotPassword = async (email: string) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new ErrorHandler('User does not exist', STATUS_CODES.NOT_FOUND);
  }

  const resetToken = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET_PASSWORD_RESET,
    {
      expiresIn: calcExpiration(process.env.JWT_PASSWORD_RESET_EXPIRES_IN),
    },
  );

  await User.findOneAndUpdate({ email }, { $set: { resetToken } });

  const link = `${process.env.FRONT_END_BASE_URL}/reset-password?token=${resetToken}`;
  await sendEmail({
    email,
    subject: 'Password reset',
    link,
    template: 'password-reset',
  });
};

const resetPassword = async (resetToken: string, newPassword: string) => {
  const decoded = jwt.verify(
    resetToken,
    process.env.JWT_SECRET_PASSWORD_RESET,
  ) as JwtPayload;

  if (!decoded) {
    throw new ErrorHandler(
      'Invalid or expired reset token',
      STATUS_CODES.UNAUTHORIZED,
    );
  }

  const user = await User.findById(decoded.id);
  if (!user) {
    throw new ErrorHandler('User does not exist', STATUS_CODES.NOT_FOUND);
  }

  user.password = newPassword;
  user.resetToken = undefined;
  await user.save({ validateBeforeSave: false });
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
