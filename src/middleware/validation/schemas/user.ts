import Joi from 'joi';

const signup = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(64).required(),
});

const signin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const refresh = Joi.object({
  refreshToken: Joi.string().required(),
});

const forgotPassword = Joi.object({
  email: Joi.string().email().required(),
});

const resetPassword = Joi.object({
  newPassword: Joi.string()
    .min(8)
    .max(64)
    .pattern(new RegExp('^[0-9]'))
    .required(),
});

export default {
  signup,
  signin,
  refresh,
  forgotPassword,
  resetPassword,
};
