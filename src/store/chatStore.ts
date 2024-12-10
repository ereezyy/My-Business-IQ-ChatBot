import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ChatState, Message } from '../types/chat';

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      messages: [],
      isTyping: false,
      language: 'en',
      addMessage: (message) =>
        set((state) => ({
          messages: [
            ...state.messages,
            {
              ...message,
              id: Math.random().toString(36).substring(7),
              timestamp: new Date(),
              status: 'sent',
            },
          ],
        })),
      setTyping: (typing) => set({ isTyping: typing }),
      setLanguage: (lang) => set({ language: lang }),
      clearMessages: () => set({ messages: [] }),
    }),
    {
      name: 'chat-storage',
    }
  )
);