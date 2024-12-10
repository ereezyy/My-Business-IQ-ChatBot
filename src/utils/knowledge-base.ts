import { KnowledgeItem } from '../types/knowledge';

export const defaultKnowledgeBase: KnowledgeItem[] = [
  {
    id: 'general-knowledge-1',
    title: 'General Knowledge',
    content: `# General Knowledge Base

- World capitals and geography
- Basic mathematics and scientific concepts
- Historical events and figures
- Current events and news
- Technology and computing
- Arts and culture
- Sports and entertainment
- Health and wellness
- Business and economics
- Environmental science`,
    type: 'text/markdown',
    dateAdded: new Date(),
    tags: ['general', 'knowledge', 'education']
  },
  {
    id: 'business-knowledge-1',
    title: 'Business Knowledge',
    content: `# Business Knowledge Base

- Business strategy and planning
- Marketing and sales
- Financial management
- Operations and logistics
- Human resources
- Customer service
- Project management
- Leadership and management
- Business law and regulations
- Digital transformation`,
    type: 'text/markdown',
    dateAdded: new Date(),
    tags: ['business', 'management', 'strategy']
  },
  {
    id: 'tech-knowledge-1',
    title: 'Technology Knowledge',
    content: `# Technology Knowledge Base

- Software development
- Web technologies
- Mobile development
- Cloud computing
- Artificial Intelligence
- Machine Learning
- Cybersecurity
- Database management
- DevOps practices
- Emerging technologies`,
    type: 'text/markdown',
    dateAdded: new Date(),
    tags: ['technology', 'software', 'development']
  }
];