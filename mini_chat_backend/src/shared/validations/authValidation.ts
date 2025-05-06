import Joi from 'joi';

export const authRegisterSchema = Joi.object({
  fullName: Joi.string().min(3).max(15).required().messages({
    'string.base': 'Full name must be a string',
    'string.empty': 'Full name is required',
    'string.min': 'Full name must be at least 3 characters',
    'string.max': 'Full name must be at most 15 characters',
  }),
  email: Joi.string()
    .pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.empty': 'Email is required',
      'string.email': 'Invalid email',
      'string.pattern.base': 'Invalid email format',
    }),
  password: Joi.string()
    .required()
    .min(8)
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%#?&]).{8,}$/)
    .messages({
      'string.empty': 'Password is required',
      'string.min': 'Password must be at least 8 characters',
      'string.pattern.base': 'Invalid password formate',
    }),
  confirmPassword: Joi.string()
    .required()
    .min(8)
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%#?&]).{8,}$/)
    .messages({
      'string.empty': 'Confirm password is required',
      'string.min': 'Confirm password must be at least 8 characters',
      'string.pattern.base': 'Invalid confirm password formate',
    }),
});

export const authLoginSchema = Joi.object({
  email: Joi.string()
    .pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.empty': 'Email is required',
      'string.email': 'Invalid email',
      'string.pattern.base': 'Invalid email format',
    }),
  password: Joi.string()
    .required()
    .min(8)
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%#?&]).{8,}$/)
    .messages({
      'string.empty': 'Password is required',
      'string.min': 'Password must be at least 8 characters',
      'string.pattern.base': 'Invalid password formate',
    }),
});
