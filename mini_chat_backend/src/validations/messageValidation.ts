import Joi from 'joi';
export const sendMessageSchema = Joi.object({
  receiverId: Joi.string().uuid().required().messages({
    'string.base': 'ReceiverId must be a string',
    'string.empty': 'ReceiverId is required',
    'string.guid': 'ReceiverId must be a valid UUID',
  }),
  conversationId: Joi.string().uuid().required().messages({
    'string.base': 'ConversationId must be a string',
    'string.empty': 'ConversationId is required',
    'string.guid': 'ConversationId must be a valid UUID',
  }),
  content: Joi.string().min(1).required().messages({
    'string.base': 'Content must be a string',
    'string.empty': 'Content is required',
    'string.min': 'Content must be at least one characters',
  }),
});

export const messageIdSchema = Joi.object({
  id: Joi.string().uuid().required().messages({
    'string.base': 'ID must be a string',
    'string.empty': 'ID is required',
    'string.guid': 'ID must be a valid UUID',
  }),
});

export const messageUpdateContentSchema = Joi.object({
  id: Joi.string().uuid().required().messages({
    'string.base': 'ID must be a string',
    'string.empty': 'ID is required',
    'string.guid': 'ID must be a valid UUID',
  }),
  content: Joi.string().min(1).required().messages({
    'string.base': 'Content must be a string',
    'string.empty': 'Content is required',
    'string.min': 'Content must be at least one characters',
  }),
});
