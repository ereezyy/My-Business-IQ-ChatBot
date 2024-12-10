import { KnowledgeItem } from '../../types/knowledge';
import { defaultKnowledgeBase } from '../knowledge-base';

export function searchKnowledgeBase(query: string): string | null {
  const matches = defaultKnowledgeBase.flatMap(item => {
    const relevantLines = item.content
      .split('\n')
      .filter(line => line.toLowerCase().includes(query.toLowerCase()));
    
    if (relevantLines.length === 0) return [];
    
    return [{
      title: item.title,
      content: relevantLines.join('\n'),
      tags: item.tags
    }];
  });

  if (matches.length === 0) return null;

  const response = matches
    .map(match => `📚 ${match.title}:\n${match.content}`)
    .join('\n\n');

  return `${response}\n\n🤔 Would you like to explore this topic further?`;
}

export function getRelatedTopics(query: string): string[] {
  const allTags = new Set(
    defaultKnowledgeBase.flatMap(item => item.tags || [])
  );
  
  return Array.from(allTags)
    .filter(tag => tag.includes(query.toLowerCase()))
    .slice(0, 5);
}