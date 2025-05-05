import Joi from 'joi';
export const userConversationIdSchema = Joi.object({
  id: Joi.string().uuid().required().messages({
    'string.base': 'ID must be a string',
    'string.empty': 'ID is required',
    'string.guid': 'ID must be a valid UUID',
  }),
});
