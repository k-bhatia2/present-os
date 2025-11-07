
import { Avatar, Quest, Task, PAEIRole } from '../types';

export const initialAvatars: Avatar[] = [
  {
    id: 'producer',
    name: 'The Producer',
    description: 'Gets results, focuses on performance. Action-driven and urgent.',
    level: 7,
    xp: 150,
    xpToNextLevel: 1000,
    paeiRole: PAEIRole.Producer,
  },
  {
    id: 'administrator',
    name: 'The Administrator',
    description: 'Ensures structure, order, and consistency. Calm and organized.',
    level: 5,
    xp: 400,
    xpToNextLevel: 800,
    paeiRole: PAEIRole.Administrator,
  },
  {
    id: 'entrepreneur',
    name: 'The Entrepreneur',
    description: 'Drives innovation and vision. Creative and enthusiastic.',
    level: 8,
    xp: 200,
    xpToNextLevel: 1200,
    paeiRole: PAEIRole.Entrepreneur,
  },
  {
    id: 'integrator',
    name: 'The Integrator',
    description: 'Builds relationships and harmony. Empathetic and relationship-focused.',
    level: 6,
    xp: 750,
    xpToNextLevel: 900,
    paeiRole: PAEIRole.Integrator,
  },
];

export const initialQuests: Quest[] = [
  {
    id: 'q1',
    title: 'Launch New Product',
    description: 'Grow the business and solve customer problem X.',
    progress: 60,
    avatarId: 'entrepreneur',
  },
  {
    id: 'q2',
    title: 'Achieve Inbox Zero Mastery',
    description: 'Streamline communication and reduce mental clutter.',
    progress: 85,
    avatarId: 'administrator',
  },
  {
    id: 'q3',
    title: 'Run a 10k',
    description: 'Improve physical fitness and discipline.',
    progress: 25,
    avatarId: 'producer',
  },
   {
    id: 'q4',
    title: 'Strengthen Team Cohesion',
    description: 'Foster a positive and collaborative work environment.',
    progress: 70,
    avatarId: 'integrator',
  },
];

export const initialTasks: Task[] = [
  { id: 't1', title: 'Finalize Q3 marketing budget', questId: 'q1', avatarId: 'administrator', completed: false, dueDate: 'Tomorrow' },
  { id: 't2', title: 'Schedule team offsite event', questId: 'q4', avatarId: 'integrator', completed: false, dueDate: 'Today' },
  { id: 't3', title: 'Draft initial pitch deck for investors', questId: 'q1', avatarId: 'entrepreneur', completed: false, dueDate: 'Today' },
  { id: 't4', title: 'Morning 5k run', questId: 'q3', avatarId: 'producer', completed: true },
  { id: 't5', title: 'Resolve Sarah\'s project issue', questId: 'q4', avatarId: 'producer', completed: false, dueDate: 'Today' },
  { id: 't6', title: 'Pay electric bill', questId: 'q2', avatarId: 'administrator', completed: true },
];
