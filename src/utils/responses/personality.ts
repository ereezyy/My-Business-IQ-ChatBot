import { format } from 'date-fns';

export const greetings = {
  morning: [
    "☀️ Good morning! Ready to seize the day?",
    "🌅 Rise and shine! How can I brighten your morning?",
    "🌞 Morning! Got your coffee? Let's tackle this day together!"
  ],
  afternoon: [
    "🌤️ Good afternoon! Hope your day's going great!",
    "☀️ Afternoon! Ready to make the rest of today amazing?",
    "🎯 Perfect timing! Let's make this afternoon count!"
  ],
  evening: [
    "🌙 Good evening! Wrapping up or just getting started?",
    "✨ Evening! Still plenty of time to accomplish great things!",
    "🌆 Evening! Let's make the most of these productive hours!"
  ]
};

export function getTimeBasedGreeting(): string {
  const hour = new Date().getHours();
  const greetingType = 
    hour < 12 ? 'morning' :
    hour < 17 ? 'afternoon' : 'evening';
  
  const options = greetings[greetingType];
  return options[Math.floor(Math.random() * options.length)];
}

export const personalityTraits = {
  enthusiastic: [
    "💫 Absolutely fantastic question!",
    "🚀 Oh, this is exciting! Let me help you with that!",
    "✨ Love where you're going with this!"
  ],
  empathetic: [
    "I understand how important this is...",
    "Let's figure this out together...",
    "I'm here to help you every step of the way..."
  ],
  professional: [
    "I'd be happy to assist you with that.",
    "Let me provide you with detailed information.",
    "Here's what you need to know..."
  ]
};

export function addPersonality(response: string): string {
  const traits = Object.values(personalityTraits).flat();
  const intro = traits[Math.floor(Math.random() * traits.length)];
  return `${intro}\n\n${response}`;
}

export const followUps = {
  general: [
    "🤔 What else would you like to know?",
    "💭 Feel free to ask me anything else!",
    "📝 Need any clarification on that?",
    "🎯 Can I help you with anything specific?",
    "✨ What other questions do you have?"
  ],
  specific: {
    services: [
      "💫 Which service catches your eye?",
      "🎯 Would you like to hear more about any specific service?",
      "✨ Ready to transform your business with any of these services?"
    ],
    scheduling: [
      "📅 Shall we find the perfect time for you?",
      "⭐ What day works best for your schedule?",
      "🗓️ Would you like to see our available slots?"
    ],
    pricing: [
      "💎 Would you like a detailed breakdown of any package?",
      "✨ Ready to invest in your business's success?",
      "🚀 Which option aligns with your goals?"
    ]
  }
};

export function addFollowUp(response: string, type: keyof typeof followUps.specific | 'general' = 'general'): string {
  const options = type === 'general' ? 
    followUps.general : 
    followUps.specific[type];
  
  const followUp = options[Math.floor(Math.random() * options.length)];
  return `${response}\n\n${followUp}`;
}