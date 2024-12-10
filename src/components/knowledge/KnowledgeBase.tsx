import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Upload, Trash2 } from 'lucide-react';
import Fuse from 'fuse.js';
import { useKnowledgeStore } from '../../store/knowledgeStore';
import { KnowledgeItem } from '../../types/knowledge';
import showdown from 'showdown';

const converter = new showdown.Converter();

export function KnowledgeBase() {
  const { items, addItem, removeItem } = useKnowledgeStore();
  const [searchQuery, setSearchQuery] = useState('');

  const fuse = new Fuse(items, {
    keys: ['title', 'content'],
    threshold: 0.3,
  });

  const searchResults = searchQuery 
    ? fuse.search(searchQuery).map(result => result.item)
    : items;

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      addItem({
        id: Math.random().toString(36).substring(7),
        title: file.name,
        content,
        type: file.type,
        dateAdded: new Date(),
      });
    };
    reader.readAsText(file);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search knowledge base..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
          />
        </div>
        <label className="cursor-pointer">
          <input
            type="file"
            accept=".md,.txt,.doc,.docx"
            onChange={handleFileUpload}
            className="hidden"
          />
          <div className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Upload className="h-5 w-5" />
            <span>Upload</span>
          </div>
        </label>
      </div>

      <div className="grid gap-4">
        {searchResults.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-white rounded-lg shadow-md"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium">{item.title}</h3>
              <button
                onClick={() => removeItem(item.id)}
                className="p-1 text-gray-500 hover:text-red-500 rounded-full"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <div 
              className="prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ 
                __html: converter.makeHtml(item.content) 
              }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}