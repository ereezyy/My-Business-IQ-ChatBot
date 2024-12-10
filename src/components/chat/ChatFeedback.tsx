import React from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAnalyticsStore } from '../../store/analyticsStore';

interface ChatFeedbackProps {
  messageId: string;
}

export function ChatFeedback({ messageId }: ChatFeedbackProps) {
  const { updateChatAnalytics } = useAnalyticsStore();

  const handleFeedback = (positive: boolean) => {
    updateChatAnalytics((prev) => ({
      satisfactionRate:
        (prev.satisfactionRate * prev.totalConversations + (positive ? 100 : 0)) /
        (prev.totalConversations + 1),
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center gap-2"
    >
      <button
        onClick={() => handleFeedback(true)}
        className="p-1 hover:bg-gray-100 rounded-full"
        title="Helpful"
      >
        <ThumbsUp className="h-4 w-4 text-gray-500" />
      </button>
      <button
        onClick={() => handleFeedback(false)}
        className="p-1 hover:bg-gray-100 rounded-full"
        title="Not helpful"
      >
        <ThumbsDown className="h-4 w-4 text-gray-500" />
      </button>
    </motion.div>
  );
}