export const MESSAGES = {
  AUTH: {
    UN_VALID_REGISTER: [
      'full name , email , password and confirm password are required',
      'this user already exist',
      'password and confirm password must be a same',
      'this user can not valid to login',
      'please enter at lest one field',
    ],
    UN_VALID_MESSAGE: [
      'senderId , conversationId and message content are required',
      'you can not send empty message',
      'sender not found',
    ],
  },

  USER: {
    NOT_FOUND: 'user not found',
    CREATED: 'Registration completed successfully',
    UPDATED: 'Update User Completed Successfully',
    DELETED: 'Delete User Completed Successfully ',
  },
  CONVERSATION: {
    NOT_FOUND: 'conversation not found',
    CREATED: 'Add Conversation Completed Successfuly',
    DELETED: 'Delete Conversation Completed Successfully',
  },
  MESSAGE: {
    NOT_FOUND: 'user not found',
    CREATED: 'Add Message Completed Successfuly',
    UPDATED: ['Update Message content Successfully', 'Update Message status Successfully'],
    DELETED: 'Delete Message Completed Successfully',
  },
  USER_CONVERSATION: {
    DELETED: 'Delete User Conversation Completed Successfully',
    NOT_FOUND: 'user conversations not found',
  },
};
