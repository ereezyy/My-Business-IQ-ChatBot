import { BusinessConfig } from '../types/chat';

export const businessConfig: BusinessConfig = {
  name: 'MyBusinessIQ Demo',
  hours: {
    Monday: { open: '09:00', close: '17:00' },
    Tuesday: { open: '09:00', close: '17:00' },
    Wednesday: { open: '09:00', close: '17:00' },
    Thursday: { open: '09:00', close: '17:00' },
    Friday: { open: '09:00', close: '17:00' },
    Saturday: { open: '10:00', close: '15:00' },
    Sunday: { open: 'Closed', close: 'Closed' },
  },
  location: '3700 West Division St. Saint Cloud, MN 56303',
  phone: '320-267-7242',
  email: 'contact@mybusinessiq.demo',
  languages: ['en', 'es', 'fr'],
  services: [
    {
      id: 'basic-ai',
      name: 'AI Integration Basic',
      description: 'Monthly AI chatbot service with regular knowledge base updates and customization options',
      duration: 30,
      price: 89,
      billingType: 'monthly',
      features: [
        'Customizable chatbot',
        'Regular knowledge base updates',
        'Basic analytics',
        'Email support',
        'Standard response time'
      ]
    },
    {
      id: 'one-time',
      name: 'One-Time Chatbot Integration',
      description: 'Complete chatbot setup with knowledge base configuration and training',
      duration: 120,
      price: 599,
      billingType: 'one-time',
      features: [
        'Full chatbot implementation',
        'Initial knowledge base setup',
        'Integration support',
        'Training session',
        '30-day support'
      ]
    },
    {
      id: 'elite',
      name: 'Elite Red Carpet Service',
      description: '24/7 premium support with dedicated team member and comprehensive AI solutions',
      duration: 0,
      price: 999,
      billingType: 'monthly',
      features: [
        'Dedicated account manager',
        '24/7 technical support',
        'Priority response time',
        'Custom AI solutions',
        'Advanced analytics',
        'Monthly strategy sessions',
        'Unlimited knowledge base updates'
      ]
    }
  ],
};