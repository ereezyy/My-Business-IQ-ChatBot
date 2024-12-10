export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  status?: 'sending' | 'sent' | 'error';
}

export interface ChatState {
  messages: Message[];
  isTyping: boolean;
  language: string;
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  setTyping: (typing: boolean) => void;
  setLanguage: (lang: string) => void;
  clearMessages: () => void;
}

export interface BusinessConfig {
  name: string;
  hours: {
    [key: string]: { open: string; close: string };
  };
  location: string;
  phone: string;
  email: string;
  languages: string[];
  services: Service[];
}

export interface Service {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  billingType: 'monthly' | 'one-time';
  features: string[];
}

export interface Appointment {
  id: string;
  serviceId: string;
  date: Date;
  customerName: string;
  customerEmail: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}