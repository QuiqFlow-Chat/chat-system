  // Messagebar
  export interface User {
    id: string;
    email: string;
    fullName: string;
  }
  
  export interface Message {
    type: "incoming" | "outgoing";
    name: string;
    time: string;
    message: string;
  }
  
  // Sidebar
  export interface SidebarContact {
    user: User;
    conversationId: string;
    lastMessageTime: string;
  }
  
  export interface ChatSidebarProps {
    contacts: SidebarContact[];
    onSelectConversation: (conversationId: string, user: User) => void;
  }
  
  export interface Messages {
    id: string;
    content: string;
    senderId: string;
    receiverId: string;
    conversationId: string;
    isRead: boolean;
    createdAt: string;
  }

  export interface UserLoginParameters {
    email: string;
    password: string;
  }

  export interface AuthResponse {
    message: any;
    data: any;
    user: {
      id: string;
      email: string;
      fullName: string;
    };
    token: string;
  }

  export interface MessageCreateParameters {
    senderId:string;
    receiverId: string;
    conversationId: string;
    content: string;
  }

  export interface UserCreateParameters {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }