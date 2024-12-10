import React from 'react';
import { ChatMessages } from './ChatMessages';
import { ChatInput } from '../ChatInput';
import { ChatSuggestions } from './ChatSuggestions';
import { useChatStore } from '../../store/chatStore';
import { generateResponse } from '../../utils/ai';

export function ChatContainer() {
  const { isTyping, addMessage, setTyping } = useChatStore();

  const handleSend = async (content: string) => {
    if (!content.trim()) return;
    
    // Add user message
    addMessage({ role: 'user', content });
    
    // Generate AI response
    setTyping(true);
    try {
      const response = await generateResponse(content);
      addMessage({ role: 'assistant', content: response });
    } catch (error) {
      console.error('Error generating response:', error);
    } finally {
      setTyping(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <ChatMessages />
      <div className="p-4 border-t">
        <ChatSuggestions onSelect={handleSend} />
        <ChatInput onSend={handleSend} disabled={isTyping} />
      </div>
    </div>
  );
}