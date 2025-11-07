// FIX: Define enums and interfaces for the application data structures.

export enum PAEIRole {
  Producer = 'P',
  Administrator = 'A',
  Entrepreneur = 'E',
  Integrator = 'I',
}

export interface Avatar {
  id: string;
  name: string;
  description: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  paeiRole: PAEIRole;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  progress: number;
  avatarId: string;
}

export interface Task {
  id: string;
  title: string;
  questId: string;
  avatarId: string;
  completed: boolean;
  dueDate?: string;
}

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'martin';
}
