import React from 'react';
import { MessageSquare, Calendar, BarChart2, Book, Globe, Trash2 } from 'lucide-react';
import { businessConfig } from '../config/business';
import { useChatStore } from '../store/chatStore';
import { useViewStore } from '../store/viewStore';
import { NotificationCenter } from './notifications/NotificationCenter';

export function Header() {
  const { language, setLanguage, clearMessages } = useChatStore();
  const { currentView, setView } = useViewStore();

  const navItems = [
    { id: 'chat', icon: MessageSquare, label: 'Chat' },
    { id: 'schedule', icon: Calendar, label: 'Schedule' },
    { id: 'analytics', icon: BarChart2, label: 'Analytics' },
    { id: 'knowledge', icon: Book, label: 'Knowledge' },
  ] as const;

  return (
    <div className="flex flex-col border-b bg-white">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <MessageSquare className="h-6 w-6 text-blue-600" />
          <div>
            <h1 className="text-xl font-semibold text-gray-900">{businessConfig.name}</h1>
            <p className="text-sm text-gray-500">AI Assistant</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <NotificationCenter />
          
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="px-2 py-1 border rounded-md text-sm"
          >
            {businessConfig.languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang.toUpperCase()}
              </option>
            ))}
          </select>
          
          <button
            onClick={clearMessages}
            className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
            title="Clear chat"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>

      <nav className="flex border-t px-4">
        {navItems.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => setView(id)}
            className={`px-4 py-2 flex items-center gap-2 border-b-2 transition-colors ${
              currentView === id
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <Icon className="h-5 w-5" />
            <span>{label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}