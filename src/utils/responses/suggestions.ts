export function generateSuggestions(query: string): string[] {
  const commonSuggestions = [
    "📅 Schedule an appointment",
    "💰 View pricing",
    "📍 Get directions",
    "📞 Contact information",
    "⏰ Business hours"
  ];

  const topicSuggestions = [
    "💡 Learn about our services",
    "🤝 Business consultation",
    "📊 Financial planning",
    "📈 Strategic planning"
  ];

  if (query.length === 0) return commonSuggestions;

  return [...commonSuggestions, ...topicSuggestions]
    .filter(suggestion => 
      suggestion.toLowerCase().includes(query.toLowerCase())
    )
    .slice(0, 5);
}

export function formatDefaultResponse(): string {
  return `👋 Hello! I'm here to help! You can ask me about:

• 💼 Our services and pricing
• ⏰ Business hours
• 📅 Scheduling appointments
• 📍 Location and directions
• 📚 General knowledge on various topics

What would you like to know?`;
}