
export interface Project {
  id: number;
  title: string;
  description: string;
  metrics: string[];
  imageUrl: string;
}

export interface GeneratedResume {
  summary: string;
  bulletPoints: string[];
}

export interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
}
