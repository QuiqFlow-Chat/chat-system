import readline from 'readline';
import { io } from 'socket.io-client';
import { MESSAGES } from '@/constants/messages';

const SERVER_URL = 'http://localhost:3777';
const COMMANDS = {
  EXIT: '/exit',
  TYPING: '/typing',
};

interface UserInfo {
  id: string;
}

interface ConversationInfo {
  conversationId: string;
}

interface MessageInfo {
  senderId: string;
  content: string;
}

interface TypingInfo {
  conversationId: string;
  userId: string;
}

const socket = io(SERVER_URL);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let userId: string;
let conversationId: string;

const prompt = (question: string): Promise<string> => {
  return new Promise((resolve) => rl.question(question, resolve));
};

socket.on('connect', () => {
  console.log(MESSAGES.SOCKET.CONNECTION.SUCCESS);
});

socket.on('receiveMessage', (message: MessageInfo) => {
  console.log(`${MESSAGES.SOCKET.MESSAGE.NEW} ${message.senderId}: ${message.content}`);
});

socket.on('isTyping', (user: UserInfo) => {
  console.log(
    `${MESSAGES.SOCKET.MESSAGE.TYPING} ${user.id} ${MESSAGES.SOCKET.MESSAGE.TYPING_SUFFIX}`
  );
});

socket.on('userOnline', (user: UserInfo) => {
  console.log(`${MESSAGES.SOCKET.USER.ONLINE} ${user.id} ${MESSAGES.SOCKET.USER.ONLINE_SUFFIX}`);
});

socket.on('userOffline', (user: UserInfo) => {
  console.log(`${MESSAGES.SOCKET.USER.OFFLINE} ${user.id} ${MESSAGES.SOCKET.USER.OFFLINE_SUFFIX}`);
});

socket.on('connect_error', (error) => {
  console.log(`${MESSAGES.SOCKET.CONNECTION.ERROR} ${error.message}`);
});

socket.on('error', (error) => {
  console.log(`${MESSAGES.SOCKET.CONNECTION.SOCKET_ERROR} ${error}`);
});

const main = async (): Promise<void> => {
  console.log(MESSAGES.TERMINAL.WELCOME);

  userId = await prompt(MESSAGES.TERMINAL.USER_ID_PROMPT);
  conversationId = await prompt(MESSAGES.TERMINAL.CONVERSATION_ID_PROMPT);

  socket.emit('joinConversation', { conversationId } as ConversationInfo);
  socket.emit('userOnline', { id: userId } as UserInfo);

  rl.on('line', (input: string) => {
    const trimmedInput = input.trim();

    if (trimmedInput === COMMANDS.EXIT) {
      socket.emit('userOffline', { id: userId } as UserInfo);
      console.log(MESSAGES.TERMINAL.GOODBYE);
      rl.close();
      socket.disconnect();
      process.exit(0);
    } else if (trimmedInput === COMMANDS.TYPING) {
      socket.emit('isTyping', {
        conversationId,
        userId,
      } as TypingInfo);
    } else {
      socket.emit('sendMessage', {
        conversationId,
        senderId: userId,
        content: trimmedInput,
      });
    }
  });
};

main();
