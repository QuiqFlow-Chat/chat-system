export const MESSAGES = {
  AUTH: {
    UN_VALID_REGISTER: [
      'full name , email , password and confirm password are required',
      'this user already exist',
      'password and confirm password must be a same',
    ],
    UN_VALID_LOGIN: [
      'Invalid password',
      'this user can not valid to login',
      'please enter at lest one field',
    ],
    UN_VALID_UPDATE: ['please enter at lest one field'],
    UN_VALID_MESSAGE: [
      'senderId , conversationId and message content are required',
      'you can not send empty message',
      'sender not found',
    ],
    TOKEN: {
      EXPIRED: 'Token has expired. Please log in again.',
      INVALID: 'Invalid token. Please log in again.',
      MISSING: 'Authorization token is missing or invalid',
      VERIFICATION_FAILED: 'Authentication failed'
    },
    SUCCESS: {
      LOGIN: 'Login successful',
      LOGOUT: 'Logout successful',
      REGISTER: 'Registration successful'
    }
  },

  USER: {
    NOT_FOUND: 'user not found',
    CREATED: 'Registration completed successfully',
    UPDATED: 'Update User Completed Successfully',
    DELETED: 'Delete User Completed Successfully ',
    SUCCESS: {
      PROFILE_FETCHED: 'User profile retrieved successfully',
      SETTINGS_UPDATED: 'User settings updated successfully'
    }
  },
  CONVERSATION: {
    NOT_FOUND: 'conversation not found',
    CREATED: 'Add Conversation Completed Successfuly',
    DELETED: 'Delete Conversation Completed Successfully',
    SUCCESS: {
      FETCHED: 'Conversations retrieved successfully',
      UPDATED: 'Conversation updated successfully'
    }
  },
  MESSAGE: {
    NOT_FOUND: 'user not found',
    CREATED: 'Add Message Completed Successfuly',
    UPDATED: ['Update Message content Successfully', 'Update Message status Successfully'],
    DELETED: 'Delete Message Completed Successfully',
    SUCCESS: {
      SENT: 'Message sent successfully',
      DELIVERED: 'Message delivered successfully',
      READ: 'Message marked as read successfully'
    }
  },
  USER_CONVERSATION: {
    DELETED: 'Delete User Conversation Completed Successfully',
    NOT_FOUND: 'user conversations not found',
    SUCCESS: {
      FETCHED: 'User conversations retrieved successfully'
    }
  },
  SUCCESS: {
    GENERAL: {
      OK: 'Operation completed successfully',
      CREATED: 'Resource created successfully',
      UPDATED: 'Resource updated successfully',
      DELETED: 'Resource deleted successfully'
    }
  }
};
