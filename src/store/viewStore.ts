import { create } from 'zustand';

type View = 'chat' | 'schedule' | 'analytics' | 'knowledge';

interface ViewState {
  currentView: View;
  setView: (view: View) => void;
}

export const useViewStore = create<ViewState>((set) => ({
  currentView: 'chat',
  setView: (view) => set({ currentView: view }),
}));