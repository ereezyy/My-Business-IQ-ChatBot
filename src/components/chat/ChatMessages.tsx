import React, { useRef, useEffect } from 'react';
import { ChatMessage } from '../ChatMessage';
import { ChatFeedback } from './ChatFeedback';
import { useChatStore } from '../../store/chatStore';
import { motion } from 'framer-motion';

export function ChatMessages() {
  const { messages, isTyping } = useChatStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-gray-500 py-8"
        >
          <p>Welcome! How can I assist you today?</p>
        </motion.div>
      ) : (
        messages.map((message) => (
          <div key={message.id} className="space-y-2">
            <ChatMessage message={message} />
            {message.role === 'assistant' && (
              <ChatFeedback messageId={message.id} />
            )}
          </div>
        ))
      )}
      
      {isTyping && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex gap-2 items-center text-gray-500"
        >
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
        </motion.div>
      )}
      
      <div ref={messagesEndRef} />
    </div>
  );
}