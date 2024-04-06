import Joi from 'joi';

const signup = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .regex(/^(?=.*[a-zA-Z])(?=.*\d)/)
    .min(8)
    .max(64)
    .required(),
});

const signin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const forgotPassword = Joi.object({
  email: Joi.string().email().required(),
});

const resetPassword = Joi.object({
  newPassword: Joi.string()
    .regex(/^(?=.*[a-zA-Z])(?=.*\d)/)
    .min(8)
    .max(64)
    .required(),
});

export default {
  signup,
  signin,
  forgotPassword,
  resetPassword,
};
