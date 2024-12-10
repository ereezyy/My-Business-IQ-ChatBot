import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { KnowledgeState, KnowledgeItem } from '../types/knowledge';
import Fuse from 'fuse.js';

export const useKnowledgeStore = create<KnowledgeState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) =>
        set((state) => ({
          items: [...state.items, item],
        })),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      searchItems: (query) => {
        const fuse = new Fuse(get().items, {
          keys: ['title', 'content', 'tags'],
          threshold: 0.3,
        });
        return fuse.search(query).map((result) => result.item);
      },
    }),
    {
      name: 'knowledge-storage',
    }
  )
);