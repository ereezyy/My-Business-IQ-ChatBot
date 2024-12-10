import { ChatAnalytics, BusinessAnalytics } from '../types/analytics';

interface Intent {
  category: string;
  confidence: number;
  entities?: Record<string, string>;
}

export function trackIntent(message: string): Intent {
  const intents = [
    { pattern: /service|offer/i, category: 'services' },
    { pattern: /price|cost|pricing/i, category: 'pricing' },
    { pattern: /hour|open|close/i, category: 'business-hours' },
    { pattern: /location|where|address/i, category: 'location' },
    { pattern: /appointment|schedule|book/i, category: 'scheduling' },
    { pattern: /contact|phone|email/i, category: 'contact' },
    { pattern: /help|support/i, category: 'support' },
    { pattern: /feature|capability/i, category: 'features' },
  ];

  const matchedIntent = intents.find(({ pattern }) => pattern.test(message));
  
  return {
    category: matchedIntent?.category || 'general',
    confidence: matchedIntent ? 0.8 : 0.4,
    entities: extractEntities(message)
  };
}

function extractEntities(message: string): Record<string, string> {
  const entities: Record<string, string> = {};

  // Extract dates
  const dateMatch = message.match(/\d{1,2}\/\d{1,2}(\/\d{2,4})?/);
  if (dateMatch) {
    entities.date = dateMatch[0];
  }

  // Extract times
  const timeMatch = message.match(/\d{1,2}:\d{2}(\s?[ap]m)?/i);
  if (timeMatch) {
    entities.time = timeMatch[0];
  }

  // Extract service types
  const serviceMatch = message.match(/basic|one-time|elite/i);
  if (serviceMatch) {
    entities.service = serviceMatch[0].toLowerCase();
  }

  return entities;
}

export function calculateSentiment(message: string): number {
  const positiveWords = ['great', 'good', 'excellent', 'thanks', 'helpful', 'perfect', 'awesome', 'amazing'];
  const negativeWords = ['bad', 'poor', 'terrible', 'unhelpful', 'wrong', 'not', 'issue', 'problem'];

  const words = message.toLowerCase().split(/\s+/);
  let sentiment = 0;

  words.forEach(word => {
    if (positiveWords.includes(word)) sentiment++;
    if (negativeWords.includes(word)) sentiment--;
  });

  return Math.max(-1, Math.min(1, sentiment / Math.max(words.length, 1)));
}

export function generateAnalyticsSummary(
  chatAnalytics: ChatAnalytics,
  businessAnalytics: BusinessAnalytics
) {
  return {
    performance: {
      responseRate: chatAnalytics.totalConversations > 0
        ? (chatAnalytics.satisfactionRate / chatAnalytics.totalConversations) * 100
        : 0,
      averageResponseTime: chatAnalytics.averageResponseTime,
      totalRevenue: businessAnalytics.revenue,
      customerSatisfaction: businessAnalytics.customerSatisfaction,
    },
    trends: {
      popularHours: Object.entries(chatAnalytics.messagesByHour)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 3)
        .map(([hour]) => hour),
      popularServices: businessAnalytics.popularServices
        .sort((a, b) => b.count - a.count)
        .slice(0, 3),
    },
  };
}