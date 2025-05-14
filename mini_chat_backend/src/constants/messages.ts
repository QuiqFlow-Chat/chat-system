export const MESSAGES = {
  AUTH: {
    REGISTER: {
      REQUIRED_FIELDS: 'Full name, email, password, and confirm password are required.',
      USER_EXISTS: 'This user already exists.',
      PASSWORD_MISMATCH: 'Password and confirm password must be the same.',
      SUCCESS: 'Registration successful.',
      FAILED: 'An error occurred while registering the user',
    },
    LOGIN: {
      INVALID_PASSWORD: 'Wrong password.',
      INVALID_USER: 'User doesnt exist.',
      REQUIRED_FIELDS: 'Please enter at least one field.',
      SUCCESS: 'Login successful.',
      FAILED: 'An error occurred while logging in the user',
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
    GET_ALL_FAILED: 'Failed to get all users',
    GET_FAILED: 'Failed to get user',
    DELETE_FAILED: 'Failed to delete user',
    UPDATE_FAILED: 'Failed to update user',
    UPDATE_ACTIVITY_FAILED: 'Failed to update user last activity',
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
    DELETE_FAILED: 'Failed to delete conversation',
    GET_ALL_FAILED: 'Failed to get all conversations',
    GET_BY_ID_FAILED: 'Failed to get conversation by ID',
    GET_MESSAGES_FAILED: 'Failed to get conversation messages',
    GET_USERS_FAILED: 'Failed to get conversation users',
    GET_USER_CONVS_FAILED: 'Failed to get user conversations',
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
      FAILED: 'Failed to send message',
      UNAUTHORIZED: 'Unauthorized: Cannot send messages as another user',
    },
    UPDATED: {
      CONTENT: 'Message content updated successfully.',
      CONTENT_FAILED: 'Failed to update message content',
      STATUS: 'Message status updated successfully.',
      STATUS_FAILED: 'Failed to update message status',
    },
    DELETED: 'Message deleted successfully.',
    DELETE_FAILED: 'Failed to delete message',
    SUCCESS: {
      SENT: 'Message sent successfully.',
      DELIVERED: 'Message delivered successfully.',
      READ: 'Message marked as read successfully.',
    },
  },

  USER_CONVERSATION: {
    NOT_FOUND: 'User conversations not found.',
    DELETED: 'User conversation deleted successfully.',
    GET_ALL_FAILED: 'Failed to get all user conversations',
    GET_BY_ID_FAILED: 'Failed to get user conversation',
    DELETE_FAILED: 'Failed to delete user conversation',
    SUCCESS: {
      FETCHED: 'User conversations retrieved successfully.',
    },
  },

  SOCKET: {
    CONNECTION: {
      SUCCESS: '✅ Connected to the server',
      ERROR: '❌ Connection error:',
      SOCKET_ERROR: '⚠️ Socket error:',
    },
    USER: {
      ONLINE: '🟢 User',
      ONLINE_SUFFIX: 'is online',
      OFFLINE: '🔴 User',
      OFFLINE_SUFFIX: 'is offline',
      CONNECTED: '⚡ New client connected:',
      DISCONNECTED: '🔌 Client disconnected:',
    },
    MESSAGE: {
      NEW: '📩 New message from',
      TYPING: '✏️ User',
      TYPING_SUFFIX: 'is typing...',
    },
    AUTH: {
      TOKEN_MISSING: 'Authentication token is missing',
      AUTH_FAILED: 'Authentication failed',
      USER_AUTHENTICATED: '[AUTH] User authenticated:',
    },
    ERROR: {
      ONLINE_STATUS_FAILED: 'Failed to set user online status',
      OFFLINE_STATUS_FAILED: 'Failed to set user offline status',
      JOIN_CONVERSATION_FAILED: 'Failed to join conversation',
      LEAVE_CONVERSATION_FAILED: 'Failed to leave conversation',
      SEND_MESSAGE_FAILED: 'Failed to send message',
      MISSING_CONVERSATION_ID: 'Missing conversationId',
      TYPING_INDICATOR_FAILED: 'Failed to send typing indicator',
      CONNECTION: 'An error occurred during connection.',
    },
    ONLINE_USERS: '[ONLINE USERS] Now online:',
  },

  TERMINAL: {
    WELCOME: 'Welcome to the Terminal Messaging App!',
    GOODBYE: 'Goodbye!',
    USER_ID_PROMPT: 'Enter your user ID: ',
    CONVERSATION_ID_PROMPT: 'Enter the conversation ID: ',
  },

  ERROR: {
    INTERNAL_SERVER_ERROR: 'Internal server error',
    ROUTE_NOT_FOUND: 'Route not found',
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

  SEED: {
    START: 'Starting seed process...',
    SUCCESS: 'All seeds executed successfully',
    FAILURE: 'Seeds execution failed:',
  },
};

export const AUTH_MESSAGES = {
  MISSING_TOKEN: 'Authorization token is missing or invalid',
  INVALID_TOKEN: 'Invalid token',
};

export const AUTH_CONSTANTS = {
  TOKEN_PREFIX: 'Bearer ',
};

export const HTTP_STATUS_CODES = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
};

export const ERROR_CONSTANTS = {
  STATUS: 'error'
};

export const DB_CONSTANTS = {
  BCRYPT_SALT_ROUNDS: 10,
  TABLE_NAMES: {
    USERS: 'Users',
    CONVERSATIONS: 'Conversations',
    USER_CONVERSATIONS: 'UserConversations',
    MESSAGES: 'Messages'
  }
};

export const SUCCESS_STATUS_CODE = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204
};

export const RESPONSE_STATUS = {
  SUCCESS: 'success'
};

export const PAGINATION_CONSTANTS = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MIN_VALUE: 1
};

export const ROUTES = {
  BASE:{
  API_PATH : '/api/miniChat'
  },
  
  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register'
  },
  USER: {
    ALL: '/getAllUsers',
    BY_ID: '/:id/getUserById',
    LAST_ACTIVITY: '/:id/getUserLastActivity',
    DELETE: '/deleteUser',
    UPDATE: '/updateUser'
  },
  CONVERSATION: {
    ALL: '/getAllConversations',
    BY_ID: '/:id/getConversationById',
    USERS: '/:id/getConversationUsers',
    USER_CONVERSATIONS: '/:id/getUserConversations',
    MESSAGES: '/getConversationMessages',
    DELETE: '/deleteConversationAsync'
  },
  MESSAGE: {
    SEND: '/sendMessage',
    DELETE: '/deleteMessage',
    UPDATE_CONTENT: '/updateMessageContent',
    UPDATE_STATUS: '/:id/updateMessageStatus'
  },
  USER_CONVERSATION: {
    ALL: '/getAllUserConversations',
    BY_ID: '/:id/getUserConversationsById',
    DELETE: '/deleteUserConversations'
  }
};
