import { create } from 'zustand';
import { ChatAnalytics, BusinessAnalytics } from '../types/analytics';

interface AnalyticsState {
  chatAnalytics: ChatAnalytics;
  businessAnalytics: BusinessAnalytics;
  updateChatAnalytics: (data: Partial<ChatAnalytics>) => void;
  updateBusinessAnalytics: (data: Partial<BusinessAnalytics>) => void;
}

const initialChatAnalytics: ChatAnalytics = {
  totalConversations: 0,
  averageResponseTime: 0,
  popularTopics: [],
  satisfactionRate: 0,
  messagesByHour: {},
};

const initialBusinessAnalytics: BusinessAnalytics = {
  totalAppointments: 0,
  revenue: 0,
  popularServices: [],
  customerSatisfaction: 0,
  appointmentsByDay: {},
};

export const useAnalyticsStore = create<AnalyticsState>((set) => ({
  chatAnalytics: initialChatAnalytics,
  businessAnalytics: initialBusinessAnalytics,
  updateChatAnalytics: (data) =>
    set((state) => ({
      chatAnalytics: { ...state.chatAnalytics, ...data },
    })),
  updateBusinessAnalytics: (data) =>
    set((state) => ({
      businessAnalytics: { ...state.businessAnalytics, ...data },
    })),
}));