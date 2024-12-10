import React from 'react';
import { motion } from 'framer-motion';

const suggestions = [
  'What services do you offer?',
  'How can I schedule an appointment?',
  'What are your business hours?',
  'Where are you located?',
  'How much do your services cost?',
  'Do you offer virtual consultations?',
  'Can I get a price quote?',
  'What payment methods do you accept?'
];

interface ChatSuggestionsProps {
  onSelect: (suggestion: string) => void;
}

export function ChatSuggestions({ onSelect }: ChatSuggestionsProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {suggestions.map((suggestion, index) => (
        <motion.button
          key={suggestion}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelect(suggestion)}
          className="px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-700 hover:bg-gray-200 transition-colors"
        >
          {suggestion}
        </motion.button>
      ))}
    </div>
  );
}