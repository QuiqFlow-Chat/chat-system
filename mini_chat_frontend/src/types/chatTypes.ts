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
  