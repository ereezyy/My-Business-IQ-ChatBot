import React from 'react';
import { Message } from '../types/chat';
import { User, Bot, CheckCircle2, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { TextToSpeech } from './voice/TextToSpeech';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      <div className={`flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full ${
        isUser ? 'bg-blue-600' : 'bg-gray-100'
      }`}>
        {isUser ? (
          <User className="h-5 w-5 text-white" />
        ) : (
          <Bot className="h-5 w-5 text-gray-600" />
        )}
      </div>
      <div className={`flex max-w-[80%] flex-col gap-2 ${isUser ? 'items-end' : 'items-start'}`}>
        <div className={`rounded-lg px-4 py-2 ${
          isUser ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'
        }`}>
          {message.content}
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span>{new Date(message.timestamp).toLocaleTimeString()}</span>
          {message.status === 'sent' && <CheckCircle2 className="h-3 w-3 text-green-500" />}
          {message.status === 'error' && <XCircle className="h-3 w-3 text-red-500" />}
          {!isUser && <TextToSpeech text={message.content} />}
        </div>
      </div>
    </motion.div>
  );
}