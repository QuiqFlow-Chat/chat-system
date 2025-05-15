import readline from 'readline';
import axios from 'axios';

const API_URL = 'http://localhost:3777/api/miniChat'; // غيّريه حسب سيرفرك
let userToken: any;
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const prompt = (question: string): Promise<string> => {
  return new Promise((resolve) => rl.question(question, resolve));
};

const login = async () => {
  try {
    const email = await prompt('📧 Email: ');
    const password = await prompt('🔒 Password: ');

    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });

    const token = response.data.data.token;
    console.log('✅ Logged in successfully!');
    console.log('🔐 Token:', token);
    userToken = token;
    return userToken;
  } catch (error: any) {
    if (error.response) {
      console.log('❌ Login failed:', error.response.data.message);
    } else {
      console.log('❌ Error:', error);
    }
    process.exit(1);
  }
};

const userConversations = async () => {
  try {
    const response = await axios.get(`${API_URL}/getUserConversations`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    let count = 0;
    const conversations = response.data.data.data;
    const filteredConversation = conversations.map((convo: any) => ({
      count: count++,
      id: convo.id,
      users: convo.users.map((user: any) => user.fullName),
    }));
    console.log('📚 User Conversations:', filteredConversation);

    const conversationCount = await prompt('🔢 Pick conversation number: ');
    const index = conversationCount;
    if (index.trim() === '') {
      console.log('⚠️ No conversation selected, skipping...');
      return null;
    }
    if (parseInt(index) < 0 || parseInt(index) >= filteredConversation.length) {
      console.log('❌ Invalid conversation number');
      process.exit(1);
    }

    const selectedConversation = filteredConversation[parseInt(index)];
    console.log('📩 Selected Conversation:', selectedConversation);

    return selectedConversation;
  } catch (error: any) {
    if (error.response) {
      console.log('❌ Get user conversations failed:', error.response.data.message);
    } else {
      console.log('❌ Error:', error);
    }
    process.exit(1);
  }
};
const conversationMessages = async (conversationId: string) => {
  try {
    const response = await axios.get(`${API_URL}/${conversationId}/getConversationMessages`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    const messages = response.data.data.data;
    const filteredMessages = messages.map((message: any) => ({
      senderId: message.senderId,
      receiverId: message.receiverId,
      content: message.content,
    }));
    console.log('✉️ Messages:', filteredMessages);
  } catch (error: any) {
    if (error.response) {
      console.log('❌ Get conversation messages failed:', error.response.data.message);
    } else {
      console.log('❌ Error:', error);
    }
    process.exit(1);
  }
};

const search = async () => {
  try {
    const response = await axios.get(`${API_URL}/getAllUsers`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    const users = response.data.data.data;
    const userEmail = await prompt('📧 Enter user email to search: ');
    console.log('🔍 Searching for:', userEmail);
    const filteredUsers = users.filter((user: any) => user.email === userEmail);
    if (filteredUsers.length > 0) {
      console.log('✅ User(s) found:');
      filteredUsers.forEach((user: any) => {
        console.log(`👤 Name: ${user.fullName} | 📧  Email: ${user.email} | 🆔 ID: ${user.id}`);
      });
    } else {
      console.log('❌ No user found with this email.');
    }
    return filteredUsers;
  } catch (error: any) {
    if (error.response) {
      console.log('❌ Get user failed:', error.response.data.message);
    } else {
      console.log('❌ Error:', error.message);
    }
    process.exit(1);
  }
};
const checkConversation = async (selectedUserId:string) => {
  try {
    const response = await axios.get(`${API_URL}/${selectedUserId}/checkOrCreateNewConversation`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    const conversationId = response.data.data;
    await conversationMessages(conversationId);
    await userConversations();
   
  } catch (error: any) {
    if (error.response) {
      console.log('❌ Check user conversation failed:', error.response.data.message);
    } else {
      console.log('❌ Error:', error.message);
    }
    process.exit(1);
  }
};
const main = async () => {
  await login();
  const selectedConversation = await userConversations();
  if (selectedConversation) {
    await conversationMessages(selectedConversation.id);
  }
  let selectedUser;
  const isActiveSearch = await prompt('🔍 Do you want to search about specific user? (y/n): ');
  if (isActiveSearch.toLocaleLowerCase() === 'y') {
    selectedUser = await search();
  }

  const isActiveClick = await prompt('🖱️ Do you want to click on this user? (y/n): ');
   if (isActiveClick.toLocaleLowerCase() === 'y') {
    await checkConversation(selectedUser[0].id);
  }
  rl.close();
};

main();
