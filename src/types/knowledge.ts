export interface KnowledgeItem {
  id: string;
  title: string;
  content: string;
  type: string;
  dateAdded: Date;
  tags?: string[];
}

export interface KnowledgeState {
  items: KnowledgeItem[];
  addItem: (item: KnowledgeItem) => void;
  removeItem: (id: string) => void;
  searchItems: (query: string) => KnowledgeItem[];
}

export interface SearchResult {
  item: KnowledgeItem;
  score: number;
}