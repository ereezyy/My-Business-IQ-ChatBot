import React from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RefreshCw } from 'lucide-react';
import { useDemoStore } from '../../store/demoStore';
import { useNotificationStore } from '../../store/notificationStore';
import { useChatStore } from '../../store/chatStore';

export function DemoMode() {
  const { isActive, toggleDemo, resetDemo } = useDemoStore();
  const { addNotification } = useNotificationStore();
  const { addMessage } = useChatStore();

  const startDemo = () => {
    const demoScenarios = [
      {
        user: "Hi, I'd like to know about your services",
        delay: 1000,
      },
      {
        assistant: "I'd be happy to tell you about our services! We offer:\n\n1. Business Consultation (60 mins) - $150\n2. Financial Review (90 mins) - $200\n3. Strategic Planning (120 mins) - $300\n\nWould you like to know more about any specific service?",
        delay: 2000,
      },
      {
        user: "Yes, I'm interested in the Business Consultation",
        delay: 3000,
      },
      {
        assistant: "Great choice! Our Business Consultation service includes:\n\n• One-on-one strategy session\n• Market analysis\n• Growth planning\n• Competitor analysis\n\nWould you like to schedule a consultation?",
        delay: 2000,
      },
    ];

    let timeoutId: NodeJS.Timeout;
    demoScenarios.forEach((scenario, index) => {
      timeoutId = setTimeout(() => {
        if (scenario.user) {
          addMessage({ role: 'user', content: scenario.user });
        } else if (scenario.assistant) {
          addMessage({ role: 'assistant', content: scenario.assistant });
        }
      }, scenario.delay * (index + 1));
    });

    addNotification({
      type: 'info',
      title: 'Demo Mode Active',
      message: 'Running automated demo scenario',
    });

    return () => clearTimeout(timeoutId);
  };

  return (
    <div className="fixed bottom-4 right-4 flex items-center gap-2">
      <motion.button
        onClick={resetDemo}
        className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200"
        whileTap={{ scale: 0.95 }}
      >
        <RefreshCw className="h-5 w-5" />
      </motion.button>
      <motion.button
        onClick={() => {
          toggleDemo();
          if (!isActive) startDemo();
        }}
        className={`px-4 py-2 rounded-full flex items-center gap-2 ${
          isActive
            ? 'bg-red-100 text-red-600 hover:bg-red-200'
            : 'bg-green-100 text-green-600 hover:bg-green-200'
        }`}
        whileTap={{ scale: 0.95 }}
      >
        {isActive ? (
          <>
            <Pause className="h-5 w-5" />
            <span>Stop Demo</span>
          </>
        ) : (
          <>
            <Play className="h-5 w-5" />
            <span>Start Demo</span>
          </>
        )}
      </motion.button>
    </div>
  );
}