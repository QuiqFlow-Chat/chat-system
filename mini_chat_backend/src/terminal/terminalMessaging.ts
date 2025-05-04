import { io } from 'socket.io-client';
import readline from 'readline';

// Connect to the server
const SERVER_URL = 'http://localhost:3777';
const socket = io(SERVER_URL);

// Create a readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// User information
let userId: string;
let conversationId: string;

// Function to prompt the user for input
const prompt = (question: string): Promise<string> => {
  return new Promise((resolve) => rl.question(question, resolve));
};

// Handle server events
socket.on('connect', () => {
  console.log('✅ Connected to the server');
});

socket.on('receiveMessage', (message) => {
  console.log(`📩 New message from ${message.senderId}: ${message.content}`);
});

socket.on('isTyping', (userId) => {
  console.log(`✏️ User ${userId} is typing...`);
});

socket.on('userOnline', (user) => {
  console.log(`🟢 User ${user.id} is online`);
});

socket.on('userOffline', (user) => {
  console.log(`🔴 User ${user.id} is offline`);
});

// Add these to your existing socket event listeners
socket.on('connect_error', (error) => {
  console.log('❌ Connection error:', error.message);
});

socket.on('error', (error) => {
  console.log('⚠️ Socket error:', error);
});

// Main function
const main = async () => {
  console.log('Welcome to the Terminal Messaging App!');

  // Get user details
  userId = await prompt('Enter your user ID: ');
  conversationId = await prompt('Enter the conversation ID: ');

  // Join the conversation room
  socket.emit('joinConversation', { conversationId });

  // Notify the server that the user is online
  socket.emit('userOnline', { id: userId });

  // Listen for user input
  rl.on('line', (input: string) => {
    if (input.trim() === '/exit') {
      // Notify the server that the user is offline and exit
      socket.emit('userOffline', { id: userId });
      console.log('Goodbye!');
      rl.close();
      socket.disconnect();
      process.exit(0);
    } else if (input.trim() === '/typing') {
      // Notify the server that the user is typing
      socket.emit('isTyping', { conversationId, userId });
    } else {
      // Send a message
      socket.emit('sendMessage', {
        conversationId,
        senderId: userId,
        content: input.trim(),
      });
    }
  });
};

main();
