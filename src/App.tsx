import React from 'react';
import { Header } from './components/Header';
import { ChatContainer } from './components/chat/ChatContainer';
import { AppointmentScheduler } from './components/scheduling/AppointmentScheduler';
import { AnalyticsDashboard } from './components/analytics/AnalyticsDashboard';
import { KnowledgeBase } from './components/knowledge/KnowledgeBase';
import { DemoMode } from './components/demo/DemoMode';
import { Toaster } from 'react-hot-toast';
import { useViewStore } from './store/viewStore';

function App() {
  const { currentView } = useViewStore();

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex flex-col flex-1 max-w-6xl mx-auto bg-white shadow-xl">
        <Header />
        
        <main className="flex-1 flex">
          {currentView === 'chat' && <ChatContainer />}
          {currentView === 'schedule' && <AppointmentScheduler />}
          {currentView === 'analytics' && <AnalyticsDashboard />}
          {currentView === 'knowledge' && <KnowledgeBase />}
        </main>
      </div>
      
      <DemoMode />
      <Toaster position="top-right" />
    </div>
  );
}

export default App;