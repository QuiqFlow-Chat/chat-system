import readline from 'readline';
import axios from 'axios';
import { io, Socket } from 'socket.io-client';
import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';

// Base configuration
const API_URL = 'http://localhost:3777/api/miniChat';
const SOCKET_URL = 'http://localhost:3777';
const DEFAULT_PAGE_SIZE = 10;

// State management
interface AppState {
  token: string;
  userId: string;
  userEmail: string;
  currentView: 'login' | 'conversations' | 'search' | 'chat';
  currentConversation: {
    id: string;
    users: {
      id: string;
      fullName: string;
      email: string;
      isOnline: boolean;
    }[];
  } | null;
  conversations: {
    id: string;
    users: {
      id: string;
      fullName: string;
      email: string;
    }[];
    lastMessage?: {
      content: string;
      timestamp: string;
    };
  }[];
  conversationsPagination: {
    page: number;
    totalPages: number;
  };
  messages: {
    id: string;
    senderId: string;
    content: string;
    createdAt: string;
    isRead: boolean;
  }[];
  messagesPagination: {
    page: number;
    totalPages: number;
  };
  searchResults: {
    id: string;
    fullName: string;
    email: string;
  }[];
  searchPagination: {
    page: number;
    totalPages: number;
  };
  onlineUsers: string[];
  error: string | null;
  isTyping: {
    userId: string;
    timestamp: number;
  } | null;
}

// Initialize state
const state: AppState = {
  token: '',
  userId: '',
  userEmail: '',
  currentView: 'login',
  currentConversation: null,
  conversations: [],
  conversationsPagination: {
    page: 1,
    totalPages: 1,
  },
  messages: [],
  messagesPagination: {
    page: 1,
    totalPages: 1,
  },
  searchResults: [],
  searchPagination: {
    page: 1,
    totalPages: 1,
  },
  onlineUsers: [],
  error: null,
  isTyping: null,
};

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// API & Socket handlers
let socket: Socket | null = null;

// Helper for prompting user
const prompt = (question: string): Promise<string> => {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
};

// Clear screen and show app header
const renderHeader = () => {
  clear();
  console.log(
    chalk.cyan(
      figlet.textSync('Chat Client', {
        horizontalLayout: 'full',
      })
    )
  );
  console.log(chalk.yellow('======================================='));
  if (state.userEmail) {
    console.log(chalk.green(`Logged in as: ${state.userEmail}`));
  }
  console.log(chalk.yellow('=======================================\n'));
};

// ============== API METHODS ==============

// Login function
const login = async (): Promise<void> => {
  renderHeader();
  try {
    const email = await prompt(chalk.blue('Email: '));
    const password = await prompt(chalk.blue('Password: '));

    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });

    if (response.data && response.data.data && response.data.data.token) {
      state.token = response.data.data.token;
      state.userId = response.data.data.user.id;
      state.userEmail = response.data.data.user.email;
      
      // Initialize socket connection after successful login
      initSocketConnection();
      
      // Load conversations
      await fetchConversations();
      state.currentView = 'conversations';
      renderUI();
    }
  } catch (error: any) {
    state.error = error.response?.data?.message || 'Login failed';
    renderUI();
  }
};

// Fetch user conversations with pagination
const fetchConversations = async (page = 1): Promise<void> => {
  try {
    const response = await axios.get(`${API_URL}/getUserConversations`, {
      headers: {
        Authorization: `Bearer ${state.token}`,
      },
      params: {
        page,
        limit: DEFAULT_PAGE_SIZE,
      },
    });

    if (response.data && response.data.data) {
      state.conversations = response.data.data.data;
      state.conversationsPagination = {
        page: response.data.data.pagination.currentPage,
        totalPages: response.data.data.pagination.totalPages,
      };
    }
  } catch (error: any) {
    state.error = error.response?.data?.message || 'Failed to fetch conversations';
  }
};

// Fetch conversation messages with pagination
const fetchMessages = async (conversationId: string, page = 1): Promise<void> => {
  try {
    const response = await axios.get(`${API_URL}/${conversationId}/getConversationMessages`, {
      headers: {
        Authorization: `Bearer ${state.token}`,
      },
      params: {
        page,
        limit: DEFAULT_PAGE_SIZE,
      },
    });

    if (response.data && response.data.data) {
      state.messages = response.data.data.data;
      state.messagesPagination = {
        page: response.data.data.pagination.currentPage,
        totalPages: response.data.data.pagination.totalPages,
      };
    }
  } catch (error: any) {
    state.error = error.response?.data?.message || 'Failed to fetch messages';
  }
};

// Search users with pagination
const searchUsers = async (query: string, page = 1): Promise<void> => {
  try {
    // If we have a search query, we need to fetch all users to search across them
    // This is a workaround since the API doesn't support search parameters directly
    if (query) {
      // Initialize collections for all users and current page
      let allUsers: any[] = [];
      //let currentPage = 1;
      let totalPages = 1;
      
      // First request to get total pages
      const initialResponse = await axios.get(`${API_URL}/getAllUsers`, {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
        params: {
          page: 1,
          limit: DEFAULT_PAGE_SIZE,
        },
      });
      
      if (!initialResponse.data?.data) {
        throw new Error("Invalid response format");
      }
      
      // Get total pages
      totalPages = initialResponse.data.data.pagination.totalPages;
      allUsers = [...initialResponse.data.data.data];
      
      // Fetch remaining pages if needed
      for (let i = 2; i <= totalPages; i++) {
        const pageResponse = await axios.get(`${API_URL}/getAllUsers`, {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
          params: {
            page: i,
            limit: DEFAULT_PAGE_SIZE,
          },
        });
        
        if (pageResponse.data?.data?.data) {
          allUsers = [...allUsers, ...pageResponse.data.data.data];
        }
      }
      
      // Now filter across all users
      const filteredUsers = allUsers.filter((user) => 
        user.fullName.toLowerCase().includes(query.toLowerCase()) || 
        user.email.toLowerCase().includes(query.toLowerCase())
      );
      
      // Apply pagination to filtered results
      const startIdx = (page - 1) * DEFAULT_PAGE_SIZE;
      const endIdx = Math.min(startIdx + DEFAULT_PAGE_SIZE, filteredUsers.length);
      state.searchResults = filteredUsers.slice(startIdx, endIdx);
      
      state.searchPagination = {
        page,
        totalPages: Math.ceil(filteredUsers.length / DEFAULT_PAGE_SIZE) || 1,
      };
      
    } else {
      // If no query, just use regular pagination from the API
      const response = await axios.get(`${API_URL}/getAllUsers`, {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
        params: {
          page,
          limit: DEFAULT_PAGE_SIZE,
        },
      });
      
      if (response.data?.data) {
        state.searchResults = response.data.data.data;
        state.searchPagination = {
          page: response.data.data.pagination.currentPage,
          totalPages: response.data.data.pagination.totalPages,
        };
      }
    }
    
    // Filter out the current user from search results
    state.searchResults = state.searchResults.filter(user => user.id !== state.userId);
    
  } catch (error: any) {
    console.error("Search error:", error);
    state.error = error.response?.data?.message || 'Failed to search users';
  }
};

// Check or create conversation with a user
const checkOrCreateConversation = async (receiverId: string): Promise<void> => {
  try {
    const response = await axios.get(`${API_URL}/${receiverId}/checkOrCreateNewConversation`, {
      headers: {
        Authorization: `Bearer ${state.token}`,
      },
    });

    if (response.data && response.data.data) {
      const conversationId = response.data.data;
      
      // Fetch conversation details
      await openConversation(conversationId);
      
      // Update conversations sidebar
      await fetchConversations();
    }
  } catch (error: any) {
    state.error = error.response?.data?.message || 'Failed to create conversation';
  }
};

// Get conversation details and open it
const openConversation = async (conversationId: string): Promise<void> => {
  try {
    // Get conversation details
    const conversationResponse = await axios.get(`${API_URL}/${conversationId}/getConversationById`, {
      headers: {
        Authorization: `Bearer ${state.token}`,
      },
    });

    // Get conversation users
    const usersResponse = await axios.get(`${API_URL}/${conversationId}/getConversationUsers`, {
      headers: {
        Authorization: `Bearer ${state.token}`,
      },
    });

    if (conversationResponse.data && usersResponse.data) {
      const conversation = conversationResponse.data.data;
      const users = usersResponse.data.data;
      
      // Enhance user objects with online status
      const enhancedUsers = users.map((user: any) => ({
        ...user,
        isOnline: state.onlineUsers.includes(user.id),
      }));
      
      state.currentConversation = {
        id: conversation.id,
        users: enhancedUsers,
      };
      
      // Join the conversation room
      if (socket) {
        socket.emit('joinConversation', { conversationId });
      }
      
      // Fetch messages
      await fetchMessages(conversationId);
      
      state.currentView = 'chat';
      renderUI();
    }
  } catch (error: any) {
    state.error = error.response?.data?.message || 'Failed to open conversation';
  }
};

// Send a message in the current conversation
const sendMessage = async (content: string): Promise<void> => {
  if (!state.currentConversation) return;
  
  try {
    const receiverId = state.currentConversation.users.find(user => user.id !== state.userId)?.id;
    
    if (!receiverId) {
      state.error = 'Could not determine message recipient';
      renderUI();
      return;
    }
    
    // Emit message via socket
    if (socket) {
      socket.emit('sendMessage', {
        conversationId: state.currentConversation.id,
        // Remove senderId: state.userId,
        receiverId: receiverId,
        content: content,
      });
      
      // Optimistically add message to UI (will be replaced when received back)
      const tempId = `temp-${Date.now()}`;
      state.messages.push({
        id: tempId,
        senderId: state.userId, // This is still needed locally for UI rendering
        content,
        createdAt: new Date().toISOString(),
        isRead: false,
      });
      
      renderUI();
    } else {
      state.error = 'Socket connection not established';
      renderUI();
    }
  } catch (error: any) {
    state.error = error.message || 'Failed to send message';
    renderUI();
  }
};

// ============== SOCKET HANDLERS ==============

// Initialize socket connection
const initSocketConnection = (): void => {
  socket = io(SOCKET_URL, {
    auth: {
      token: state.token,
    },
  });

  // Socket connection events
  socket.on('connect', () => {
    console.log('Connected to socket server');
    
    // Get online users on connect
    socket?.emit('getOnlineUsers', {}, (onlineUsers: string[]) => {
      state.onlineUsers = onlineUsers;
      updateCurrentConversationStatus();
      renderUI();
    });
    
    // Announce online status
    socket?.emit('userOnline');
  });

  // Socket error handling
  socket.on('connect_error', (error) => {
    console.error('Socket connection error:', error);
    state.error = 'Failed to connect to chat server';
    renderUI();
  });

  // Message received handler
  socket.on('receiveMessage', (message) => {
    // If it's for the current conversation, add it to messages
    if (state.currentConversation && message.conversationId === state.currentConversation.id) {
      // Remove temporary message if it exists
      state.messages = state.messages.filter(msg => !msg.id.startsWith('temp-'));
      
      // Add the new message
      state.messages.push({
        id: message.id,
        senderId: message.senderId,
        content: message.content,
        createdAt: message.createdAt,
        isRead: message.isRead,
      });
      
      renderUI();
    }
    
    // If the message is from another conversation, update conversations list
    fetchConversations(state.conversationsPagination.page);
  });

  // Online status handlers
  socket.on('userOnline', (user) => {
    if (!state.onlineUsers.includes(user.id)) {
      state.onlineUsers.push(user.id);
    }
    updateCurrentConversationStatus();
    renderUI();
  });

  socket.on('userOffline', (user) => {
    state.onlineUsers = state.onlineUsers.filter(id => id !== user.id);
    updateCurrentConversationStatus();
    renderUI();
  });

  // Typing indicator handler
  socket.on('isTyping', (data) => {
    if (state.currentConversation && data.conversationId === state.currentConversation.id) {
      state.isTyping = {
        userId: data.id,
        timestamp: Date.now(),
      };
      renderUI();
      
      // Clear typing indicator after 3 seconds
      setTimeout(() => {
        if (state.isTyping && state.isTyping.userId === data.id) {
          state.isTyping = null;
          renderUI();
        }
      }, 3000);
    }
  });

  // Error handler
  socket.on('error', (message) => {
    state.error = message;
    renderUI();
  });
  
  // Disconnect handler
  socket.on('disconnect', () => {
    console.log('Disconnected from socket server');
  });
};

// Update online status of users in current conversation
const updateCurrentConversationStatus = (): void => {
  if (state.currentConversation) {
    state.currentConversation.users = state.currentConversation.users.map(user => ({
      ...user,
      isOnline: state.onlineUsers.includes(user.id),
    }));
  }
};

// Send typing indicator
const sendTypingIndicator = (): void => {
  if (state.currentConversation && socket) {
    socket.emit('isTyping', { conversationId: state.currentConversation.id });
  }
};

// ============== UI RENDERING ==============

// Main UI rendering function
const renderUI = (): void => {
  renderHeader();
  
  // Show error if exists
  if (state.error) {
    console.log(chalk.red(`Error: ${state.error}`));
    state.error = null;
  }
  
  // Render current view
  switch (state.currentView) {
    case 'login':
      renderLoginView();
      break;
    case 'conversations':
      renderConversationsView();
      break;
    case 'search':
      renderSearchView();
      break;
    case 'chat':
      renderChatView();
      break;
  }
};

// Login view
const renderLoginView = (): void => {
  // Login view is handled by the login function directly
  login();
};

// Conversations view (sidebar)
const renderConversationsView = (): void => {
  console.log(chalk.cyan('===== Conversations ====='));
  
  if (state.conversations.length === 0) {
    console.log(chalk.yellow('No conversations yet. Search for users to start chatting.'));
  } else {
    state.conversations.forEach((conv, index) => {
      const otherUser = conv.users.find(user => user.id !== state.userId);
      const isOnline = state.onlineUsers.includes(otherUser?.id || '');
      const statusIndicator = isOnline ? chalk.green('●') : chalk.gray('○');
      const lastMsg = conv.lastMessage ? ` - ${conv.lastMessage.content.substring(0, 30)}...` : '';
      
      console.log(chalk.white(`${index + 1}) ${statusIndicator} ${otherUser?.fullName || 'Unknown'}${lastMsg}`));
    });
    
    // Pagination
    console.log(chalk.yellow(`\nPage ${state.conversationsPagination.page} of ${state.conversationsPagination.totalPages}`));
    if (state.conversationsPagination.page > 1) {
      console.log(chalk.blue('p - Previous page'));
    }
    if (state.conversationsPagination.page < state.conversationsPagination.totalPages) {
      console.log(chalk.blue('n - Next page'));
    }
  }
  
  // Commands
  console.log(chalk.cyan('\n===== Commands ====='));
  console.log(chalk.blue('1-9 - Open conversation'));
  console.log(chalk.blue('s - Search users'));
  console.log(chalk.blue('r - Refresh conversations'));
  console.log(chalk.blue('q - Quit'));
  
  rl.question(chalk.green('\nEnter command: '), async (answer) => {
    if (answer === 'q') {
      console.log(chalk.yellow('Goodbye!'));
      rl.close();
      process.exit(0);
    } else if (answer === 's') {
      state.currentView = 'search';
      renderUI();
    } else if (answer === 'r') {
      await fetchConversations(state.conversationsPagination.page);
      renderUI();
    } else if (answer === 'p' && state.conversationsPagination.page > 1) {
      await fetchConversations(state.conversationsPagination.page - 1);
      renderUI();
    } else if (answer === 'n' && state.conversationsPagination.page < state.conversationsPagination.totalPages) {
      await fetchConversations(state.conversationsPagination.page + 1);
      renderUI();
    } else if (/^[1-9]$/.test(answer)) {
      const index = parseInt(answer) - 1;
      if (index >= 0 && index < state.conversations.length) {
        await openConversation(state.conversations[index].id);
      } else {
        state.error = 'Invalid conversation number';
        renderUI();
      }
    } else {
      state.error = 'Invalid command';
      renderUI();
    }
  });
};

// Search view
const renderSearchView = (): void => {
  console.log(chalk.cyan('===== Search Users ====='));
  
  rl.question(chalk.green('Search (leave empty to show all): '), async (query) => {
    await searchUsers(query);
    renderSearchResults();
  });
};

// Render search results
const renderSearchResults = (): void => {
  renderHeader();
  console.log(chalk.cyan('===== Search Results ====='));
  
  if (state.searchResults.length === 0) {
    console.log(chalk.yellow('No users found.'));
  } else {
    state.searchResults.forEach((user, index) => {
      const isOnline = state.onlineUsers.includes(user.id);
      const statusIndicator = isOnline ? chalk.green('●') : chalk.gray('○');
      
      console.log(chalk.white(`${index + 1}) ${statusIndicator} ${user.fullName} (${user.email})`));
    });
    
    // Pagination
    console.log(chalk.yellow(`\nPage ${state.searchPagination.page} of ${state.searchPagination.totalPages}`));
    if (state.searchPagination.page > 1) {
      console.log(chalk.blue('p - Previous page'));
    }
    if (state.searchPagination.page < state.searchPagination.totalPages) {
      console.log(chalk.blue('n - Next page'));
    }
  }
  
  // Commands
  console.log(chalk.cyan('\n===== Commands ====='));
  console.log(chalk.blue('1-9 - Select user to chat'));
  console.log(chalk.blue('s - New search'));
  console.log(chalk.blue('b - Back to conversations'));
  
  rl.question(chalk.green('\nEnter command: '), async (answer) => {
    if (answer === 'b') {
      state.currentView = 'conversations';
      renderUI();
    } else if (answer === 's') {
      state.currentView = 'search';
      renderUI();
    } else if (answer === 'p' && state.searchPagination.page > 1) {
      state.searchPagination.page--;
      renderSearchResults();
    } else if (answer === 'n' && state.searchPagination.page < state.searchPagination.totalPages) {
      state.searchPagination.page++;
      renderSearchResults();
    } else if (/^[1-9]$/.test(answer)) {
      const index = parseInt(answer) - 1;
      if (index >= 0 && index < state.searchResults.length) {
        const selectedUser = state.searchResults[index];
        await checkOrCreateConversation(selectedUser.id);
      } else {
        state.error = 'Invalid user number';
        renderSearchResults();
      }
    } else {
      state.error = 'Invalid command';
      renderSearchResults();
    }
  });
};

// Chat view
const renderChatView = (): void => {
  if (!state.currentConversation) {
    state.error = 'No conversation selected';
    state.currentView = 'conversations';
    renderUI();
    return;
  }
  
  // Find the other user in the conversation
  const otherUser = state.currentConversation.users.find(user => user.id !== state.userId);
  
  // Header with user information
  console.log(chalk.cyan(`===== Chat with ${otherUser?.fullName} =====`));
  const statusText = otherUser?.isOnline ? chalk.green('Online') : chalk.gray('Offline');
  console.log(`${statusText} | ${otherUser?.email}`);
  
  // Show typing indicator if applicable
  if (state.isTyping && state.currentConversation.users.some(u => u.id === state.isTyping?.userId)) {
    const typingUser = state.currentConversation.users.find(u => u.id === state.isTyping?.userId);
    console.log(chalk.italic.gray(`${typingUser?.fullName} is typing...`));
  }
  
  console.log(chalk.yellow('\n===== Messages ====='));
  
  // Display messages
  if (state.messages.length === 0) {
    console.log(chalk.yellow('No messages yet. Start the conversation!'));
  } else {
    state.messages.forEach(msg => {
      const isMine = msg.senderId === state.userId;
      const sender = state.currentConversation?.users.find(u => u.id === msg.senderId);
      const messageTime = new Date(msg.createdAt).toLocaleTimeString();
      
      if (isMine) {
        console.log(chalk.green(`You (${messageTime}):`));
        console.log(chalk.green(`  ${msg.content}`));
      } else {
        console.log(chalk.blue(`${sender?.fullName || 'Unknown'} (${messageTime}):`));
        console.log(chalk.blue(`  ${msg.content}`));
      }
      console.log();
    });
    
    // Pagination
    console.log(chalk.yellow(`\nPage ${state.messagesPagination.page} of ${state.messagesPagination.totalPages}`));
    if (state.messagesPagination.page > 1) {
      console.log(chalk.blue('p - Previous page'));
    }
    if (state.messagesPagination.page < state.messagesPagination.totalPages) {
      console.log(chalk.blue('n - Next page'));
    }
  }
  
  // Commands
  console.log(chalk.cyan('\n===== Commands ====='));
  console.log(chalk.blue('m - Send message'));
  console.log(chalk.blue('r - Refresh messages'));
  console.log(chalk.blue('b - Back to conversations'));
  
  rl.question(chalk.green('\nEnter command: '), async (answer) => {
    if (answer === 'b') {
      if (socket && state.currentConversation) {
        socket.emit('leaveConversation', { conversationId: state.currentConversation.id });
      }
      state.currentConversation = null;
      state.currentView = 'conversations';
      renderUI();
    } else if (answer === 'r') {
      if (state.currentConversation) {
        await fetchMessages(state.currentConversation.id, state.messagesPagination.page);
      }
      renderUI();
    } else if (answer === 'p' && state.messagesPagination.page > 1) {
      if (state.currentConversation) {
        await fetchMessages(state.currentConversation.id, state.messagesPagination.page - 1);
      }
      renderUI();
    } else if (answer === 'n' && state.messagesPagination.page < state.messagesPagination.totalPages) {
      if (state.currentConversation) {
        await fetchMessages(state.currentConversation.id, state.messagesPagination.page + 1);
      }
      renderUI();
    } else if (answer === 'm') {
      // Send typing indicator
      sendTypingIndicator();
      
      rl.question(chalk.green('Type your message: '), async (content) => {
        if (content.trim()) {
          await sendMessage(content);
        }
        renderUI();
      });
    } else {
      state.error = 'Invalid command';
      renderUI();
    }
  });
};

// Start the app
renderUI();

// Clean up on exit
process.on('SIGINT', () => {
  console.log(chalk.yellow('\nGoodbye!'));
  rl.close();
  if (socket) {
    socket.disconnect();
  }
  process.exit(0);
});