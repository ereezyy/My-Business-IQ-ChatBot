export interface ChatAnalytics {
  totalConversations: number;
  averageResponseTime: number;
  popularTopics: Array<{
    topic: string;
    count: number;
  }>;
  satisfactionRate: number;
  messagesByHour: Record<number, number>;
}

export interface BusinessAnalytics {
  totalAppointments: number;
  revenue: number;
  popularServices: Array<{
    serviceId: string;
    count: number;
  }>;
  customerSatisfaction: number;
  appointmentsByDay: Record<string, number>;
}