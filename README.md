# QuiqFlow Chat System

A modern, full-stack real-time chat application built with TypeScript, Express, Socket.IO, React, and Sequelize.

![Version](https://img.shields.io/badge/version-1.1.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## Overview

QuiqFlow is a feature-rich chat application that enables real-time messaging between users. The system is built with a clean architecture, separating frontend and backend concerns for better maintainability and scalability.

## Features

- **Real-time Messaging**: Instant message delivery using Socket.IO
- **User Authentication**: Secure login and registration system with JWT
- **Conversation Management**: Create, join, and manage conversations
- **Responsive UI**: Modern React-based interface that works on various devices
- **Database Persistence**: Reliable message and user data storage with PostgreSQL
- **TypeScript Support**: Full type safety across the entire application

## Tech Stack

### Backend
- **Runtime**: Node.js (v22+)
- **Framework**: Express.js (v5.1.0)
- **Language**: TypeScript (v5.8.3)
- **Database**: PostgreSQL (v8.15.6) with Sequelize ORM (v6.37.7)
- **Real-time Communication**: Socket.IO (v4.8.1)
- **Authentication**: JWT (v9.0.2)
- **Data Validation**: Joi (v17.13.3)

### Frontend
- **Framework**: React (v19.0.0)
- **Build Tool**: Vite (latest)
- **Styling**: CSS with modern patterns
- **State Management**: React Context
- **Form Handling**: Formik (v2.4.6) with Yup (v1.6.1) validation
- **Routing**: React Router (v7.5.2)
- **HTTP Client**: Axios (v1.9.0)
- **Design**: Custom components

## Project Structure

The application is organized as a monorepo with two main directories:

- `mini_chat_backend/`: Server application built with Express and TypeScript
- `mini_chat_frontend/`: Client application built with React and TypeScript

## Getting Started

### Prerequisites

- Node.js (v22 or later)
- PostgreSQL (v14 or later)
- Yarn or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/chat-system.git
   cd chat-system
   ```

2. **Set up the backend**
   ```bash
   cd mini_chat_backend
   yarn install
   # Create a .env file with your database credentials and JWT secret
   ```

3. **Set up the frontend**
   ```bash
   cd ../mini_chat_frontend
   npm install
   ```

4. **Initialize the database**
   ```bash
   cd ../mini_chat_backend
   yarn migrate
   yarn seed
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd mini_chat_backend
   yarn dev
   ```

2. **Start the frontend development server**
   ```bash
   cd mini_chat_frontend
   npm run dev
   ```

3. The frontend will be available at `http://localhost:5173`
4. The backend API will be available at `http://localhost:3777`

### Terminal Chat Client

For testing or command-line usage, you can use the built-in terminal chat client:

```bash
cd mini_chat_backend
yarn chat
```

## Database Migrations

The project uses Umzug for database migrations:

- **Run migrations**: `yarn migrate`
- **Undo migrations**: `yarn migrate:undo`
- **Seed data**: `yarn seed`

## API Documentation

The API follows RESTful principles with a base path of `/api/miniChat` and includes these main routes:

### Authentication Routes
- `POST /register`: Register a new user
- `POST /login`: Authenticate a user and get JWT token

### User Routes
- `GET /getAllUsers`: Get a list of all users (protected)
- `GET /:id/getUserById`: Get user details by ID (protected)
- `GET /:id/getUserLastActivity`: Get user's last activity timestamp (protected)
- `DELETE /deleteUser`: Delete a user account (protected)
- `PATCH /updateUser`: Update user profile information (protected)

### Conversation Routes
- `GET /getAllConversations`: Get all conversations (protected)
- `GET /:id/getConversationById`: Get conversation details by ID (protected)
- `GET /:id/getConversationUsers`: Get all users in a conversation (protected)
- `GET /getUserConversations`: Get all conversations for the current user (protected)
- `GET /:conversationId/getConversationMessages`: Get messages from a conversation (protected)
- `GET /:receiverId/checkOrCreateNewConversation`: Check if a conversation exists or create a new one (protected)
- `DELETE /deleteConversationAsync`: Delete a conversation (protected)

### Message Routes
- `POST /sendMessage`: Send a new message (protected)
- `GET /:id/updateMessageStatus`: Update message read status (protected)
- `PATCH /updateMessageContent`: Edit a message's content (protected)
- `DELETE /deleteMessage`: Delete a message (protected)

### User-Conversation Routes
- `GET /getAllUserConversations`: Get all user-conversation relationships (protected)
- `GET /:id/getUserConversationsById`: Get a specific user-conversation relationship (protected)
- `DELETE /deleteUserConversations`: Remove a user from a conversation (protected)

All protected routes require a valid JWT token in the Authorization header with format: `Bearer <token>`.

## Socket.IO Events

The real-time communication uses the following events to enable interactive chat features:

### Client to Server Events

- `userOnline`: Notifies server when a user comes online
- `userOffline`: Notifies server when a user manually goes offline
- `sendMessage`: Sends a new chat message to the server
  ```typescript
  socket.emit('sendMessage', { 
    conversationId: string, 
    receiverId: string, 
    content: string
  });
  ```
- `joinConversation`: Joins a specific conversation room
  ```typescript
  socket.emit('joinConversation', { conversationId: string });
  ```
- `leaveConversation`: Leaves a specific conversation room
  ```typescript
  socket.emit('leaveConversation', { conversationId: string });
  ```
- `isTyping`: Indicates user is currently typing in a conversation
  ```typescript
  socket.emit('isTyping', { conversationId: string });
  ```
- `getOnlineUsers`: Retrieves a list of currently online user IDs
  ```typescript
  socket.emit('getOnlineUsers', {}, (onlineUsers: string[]) => {
    // Handle the list of online users
  });
  ```

### Server to Client Events

- `receiveMessage`: Delivers a new message to recipients
  ```typescript
  socket.on('receiveMessage', (message) => {
    // message: {
    //   id: string,
    //   conversationId: string,
    //   senderId: string,
    //   receiverId: string,
    //   content: string,
    //   createdAt: string,
    //   isRead: boolean,
    //   flag: boolean
    // }
  });
  ```
- `userOnline`: Notifies clients when a user comes online
  ```typescript
  socket.on('userOnline', (user) => {
    // user: { id: string }
  });
  ```
- `userOffline`: Notifies clients when a user goes offline
  ```typescript
  socket.on('userOffline', (user) => {
    // user: { id: string }
  });
  ```
- `isTyping`: Notifies when a user is typing in a conversation
  ```typescript
  socket.on('isTyping', (data) => {
    // data: { id: string, conversationId: string }
  });
  ```
- `error`: Delivers error messages from the server
  ```typescript
  socket.on('error', (message) => {
    // message: string - error description
  });
  ```

### Authentication

Socket connections require JWT authentication through the handshake:

```typescript
// Client-side connection with auth token
const socket = io(SERVER_URL, {
  transports: ["websocket"],
  auth: {
    token: "your-jwt-token"
  }
});
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- All contributors who have helped shape this project
- Open source libraries that made this project possible
