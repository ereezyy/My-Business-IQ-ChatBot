// Simplified AI utility for business intelligence chatbot
import { useNotificationStore } from '../store/notificationStore';

export const processMessage = async (message: string): Promise<string> => {
  const notificationStore = useNotificationStore.getState();
  
  try {
    // Normalize the message
    const normalizedMessage = message.toLowerCase().trim();
    
    // Track user intent (simplified)
    console.log('Processing message:', normalizedMessage);
    
    // Business intelligence responses
    if (normalizedMessage.includes('sales') || normalizedMessage.includes('revenue')) {
      return generateSalesResponse(normalizedMessage);
    }
    
    if (normalizedMessage.includes('analytics') || normalizedMessage.includes('data')) {
      return generateAnalyticsResponse(normalizedMessage);
    }
    
    if (normalizedMessage.includes('forecast') || normalizedMessage.includes('prediction')) {
      return generateForecastResponse(normalizedMessage);
    }
    
    if (normalizedMessage.includes('performance') || normalizedMessage.includes('kpi')) {
      return generatePerformanceResponse(normalizedMessage);
    }
    
    // Search knowledge base (simplified)
    const knowledgeResponse = searchSimpleKnowledgeBase(normalizedMessage);
    if (knowledgeResponse) {
      return knowledgeResponse;
    }
    
    // Default business-focused response
    return generateDefaultBusinessResponse(normalizedMessage);
    
  } catch (error) {
    console.error('Error processing message:', error);
    notificationStore.addNotification({
      id: Date.now().toString(),
      type: 'error',
      message: 'Sorry, I encountered an error processing your request.',
      timestamp: new Date()
    });
    
    return "I apologize, but I'm having trouble processing your request right now. Please try again or rephrase your question.";
  }
};

const generateSalesResponse = (message: string): string => {
  const salesResponses = [
    "Based on current trends, your sales performance shows strong growth in Q2. Revenue is up 15% compared to last quarter.",
    "Your top-performing products are driving 60% of total sales. Consider expanding inventory for these items.",
    "Sales conversion rates have improved by 8% this month. Your marketing campaigns are showing positive ROI.",
    "Regional analysis shows the West Coast market has the highest potential for expansion.",
  ];
  
  return salesResponses[Math.floor(Math.random() * salesResponses.length)];
};

const generateAnalyticsResponse = (message: string): string => {
  const analyticsResponses = [
    "Your data shows customer engagement is highest on Tuesdays and Thursdays. Consider scheduling important campaigns on these days.",
    "Website traffic has increased 25% this month, with mobile users accounting for 70% of visits.",
    "Customer lifetime value has improved by 12% since implementing the new retention strategy.",
    "Your conversion funnel shows a 15% drop-off at the checkout stage. This could be optimized for better results.",
  ];
  
  return analyticsResponses[Math.floor(Math.random() * analyticsResponses.length)];
};

const generateForecastResponse = (message: string): string => {
  const forecastResponses = [
    "Based on historical data, I predict a 20% increase in demand for your services next quarter.",
    "Market trends suggest your industry will see moderate growth (8-12%) over the next 6 months.",
    "Seasonal patterns indicate peak sales typically occur in November and December for your business type.",
    "Economic indicators suggest stable growth conditions for the next fiscal year.",
  ];
  
  return forecastResponses[Math.floor(Math.random() * forecastResponses.length)];
};

const generatePerformanceResponse = (message: string): string => {
  const performanceResponses = [
    "Your key performance indicators show strong results: Customer satisfaction is at 92%, retention rate is 85%.",
    "Team productivity has increased 18% since implementing the new workflow system.",
    "Cost per acquisition has decreased by 22% while maintaining quality leads.",
    "Your business efficiency score is 87/100, which is above industry average.",
  ];
  
  return performanceResponses[Math.floor(Math.random() * performanceResponses.length)];
};

const searchSimpleKnowledgeBase = (message: string): string | null => {
  const knowledgeBase = {
    'help': "I'm your business intelligence assistant. I can help with sales analysis, performance metrics, forecasting, and data insights.",
    'features': "I offer sales analytics, performance tracking, forecasting, customer insights, and business intelligence reporting.",
    'getting started': "To get started, ask me about your sales, analytics, performance, or any business metrics you'd like to understand better.",
    'support': "For technical support, please contact our team at support@mybusinessiq.com or use the help documentation.",
  };
  
  for (const [key, response] of Object.entries(knowledgeBase)) {
    if (message.includes(key)) {
      return response;
    }
  }
  
  return null;
};

const generateDefaultBusinessResponse = (message: string): string => {
  const defaultResponses = [
    "That's an interesting business question. Could you provide more specific details about what metrics or data you'd like me to analyze?",
    "I'd be happy to help with your business intelligence needs. What specific area would you like to focus on - sales, marketing, operations, or finance?",
    "Let me help you with that business insight. Could you clarify which department or process you'd like me to analyze?",
    "I can provide detailed analytics on various business aspects. What particular KPIs or metrics are you most interested in?",
  ];
  
  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
};

// Export additional utility functions
export const formatBusinessMetric = (value: number, type: 'currency' | 'percentage' | 'number'): string => {
  switch (type) {
    case 'currency':
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
    case 'percentage':
      return `${(value * 100).toFixed(1)}%`;
    case 'number':
      return new Intl.NumberFormat('en-US').format(value);
    default:
      return value.toString();
  }
};

export const generateInsight = (data: any): string => {
  // Simplified insight generation
  return "Based on your data patterns, I recommend focusing on customer retention strategies to maximize long-term value.";
};

