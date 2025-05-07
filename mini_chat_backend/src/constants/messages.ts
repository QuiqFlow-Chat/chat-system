export const MESSAGES = {
  AUTH: {
    REGISTER: {
      REQUIRED_FIELDS: 'Full name, email, password, and confirm password are required.',
      USER_EXISTS: 'This user already exists.',
      PASSWORD_MISMATCH: 'Password and confirm password must be the same.',
      SUCCESS: 'Registration successful.',
    },
    LOGIN: {
      INVALID_PASSWORD: 'Invalid password.',
      INVALID_USER: 'This user is not allowed to log in.',
      REQUIRED_FIELDS: 'Please enter at least one field.',
      SUCCESS: 'Login successful.',
    },
    LOGOUT: {
      SUCCESS: 'Logout successful.',
    },
    UPDATE: {
      REQUIRED_FIELDS: 'Please enter at least one field.',
    },
    TOKEN: {
      EXPIRED: 'Token has expired. Please log in again.',
      INVALID: 'Invalid token. Please log in again.',
      MISSING: 'Authorization token is missing or invalid.',
      VERIFICATION_FAILED: 'Authentication failed.',
    },
  },

  USER: {
    NOT_FOUND: 'User not found.',
    CREATED: 'Registration completed successfully.',
    UPDATED: 'User updated successfully.',
    DELETED: 'User deleted successfully.',
    SUCCESS: {
      PROFILE_FETCHED: 'User profile retrieved successfully.',
      SETTINGS_UPDATED: 'User settings updated successfully.',
    },
  },

  CONVERSATION: {
    NOT_FOUND: 'Conversation not found.',
    CREATED: 'Conversation created successfully.',
    UPDATED: 'Conversation updated successfully.',
    DELETED: 'Conversation deleted successfully.',
    SUCCESS: {
      FETCHED: 'Conversations retrieved successfully.',
    },
  },

  MESSAGE: {
    NOT_FOUND: 'Message not found.',
    CREATE: {
      REQUIRED_FIELDS: 'Sender ID, conversation ID, and message content are required.',
      EMPTY_CONTENT: 'You cannot send an empty message.',
      SENDER_NOT_FOUND: 'Sender not found.',
      RECEIVER_NOT_FOUND: 'Receiver not found.',
      SUCCESS: 'Message sent successfully.',
    },
    UPDATED: {
      CONTENT: 'Message content updated successfully.',
      STATUS: 'Message status updated successfully.',
    },
    DELETED: 'Message deleted successfully.',
    SUCCESS: {
      SENT: 'Message sent successfully.',
      DELIVERED: 'Message delivered successfully.',
      READ: 'Message marked as read successfully.',
    },
  },

  USER_CONVERSATION: {
    NOT_FOUND: 'User conversations not found.',
    DELETED: 'User conversation deleted successfully.',
    SUCCESS: {
      FETCHED: 'User conversations retrieved successfully.',
    },
  },

  COMMON: {
    SUCCESS: {
      OK: 'Operation completed successfully.',
      CREATED: 'Resource created successfully.',
      UPDATED: 'Resource updated successfully.',
      DELETED: 'Resource deleted successfully.',
    },
    NOT_FOUND: 'Resource not found.',
  },
};
