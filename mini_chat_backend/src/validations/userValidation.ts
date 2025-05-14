import Joi from 'joi';
export const userIdSchema = Joi.object({
  id: Joi.string().uuid().required().messages({
    'string.base': 'ID must be a string',
    'string.empty': 'ID is required',
    'string.guid': 'ID must be a valid UUID',
  }),
});

export const userUpdateSchema = Joi.object({
  fullName: Joi.string().min(3).max(15).optional().allow('').messages({
    'string.base': 'Full name must be a string',
    'string.empty': 'Full name is required',
    'string.min': 'Full name must be at least 3 characters',
    'string.max': 'Full name must be at most 15 characters',
  }),
  password: Joi.string()
    .optional()
    .allow('')
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%#?&]).{8,}$/)
    .messages({
      'string.pattern.base': 'Invalid password format',
    }),
});
