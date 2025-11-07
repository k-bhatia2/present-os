import React from 'react';
import { Task, Avatar } from '../types';
import { ProducerIcon, AdministratorIcon, EntrepreneurIcon, IntegratorIcon, EditIcon, TrashIcon } from './icons';

interface TaskItemProps {
  task: Task;
  avatar: Avatar | undefined;
  onComplete: (taskId: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

const getAvatarIcon = (avatar?: Avatar) => {
    if (!avatar) return null;
    switch (avatar.paeiRole) {
        case 'P': return <ProducerIcon className="w-4 h-4 text-red-400" />;
        case 'A': return <AdministratorIcon className="w-4 h-4 text-blue-400" />;
        case 'E': return <EntrepreneurIcon className="w-4 h-4 text-yellow-400" />;
        case 'I': return <IntegratorIcon className="w-4 h-4 text-green-400" />;
        default: return null;
    }
}


export const TaskItem: React.FC<TaskItemProps> = ({ task, avatar, onComplete, onEdit, onDelete }) => {
  return (
    <div className={`flex items-center justify-between p-3 rounded-lg group ${task.completed ? 'bg-gray-800/50' : 'bg-gray-800'}`}>
        <div className="flex items-center overflow-hidden">
            <button 
                onClick={() => onComplete(task.id)}
                className={`w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all duration-200 ${task.completed ? 'border-green-500 bg-green-500' : 'border-gray-500 hover:border-indigo-500'}`}
                aria-label={task.completed ? 'Mark task as incomplete' : 'Mark task as complete'}
            >
                {task.completed && (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4 text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                )}
            </button>
            <div className="ml-4 overflow-hidden">
                <p className={`font-medium truncate ${task.completed ? 'text-gray-500 line-through' : 'text-white'}`}>{task.title}</p>
                <div className="flex items-center text-xs text-gray-400 mt-1">
                    {getAvatarIcon(avatar)}
                    <span className="ml-1.5">{avatar?.name}</span>
                </div>
            </div>
        </div>
        <div className="flex items-center flex-shrink-0 pl-2">
            {task.dueDate && !task.completed && <span className="text-sm text-indigo-400 font-medium mr-4">{task.dueDate}</span>}
             {!task.completed && (
                <div className="flex items-center space-x-2">
                     <button onClick={() => onEdit(task)} className="text-gray-500 hover:text-white transition-colors" aria-label="Edit task">
                        <EditIcon className="w-5 h-5" />
                    </button>
                    <button onClick={() => onDelete(task.id)} className="text-gray-500 hover:text-red-500 transition-colors" aria-label="Delete task">
                        <TrashIcon className="w-5 h-5" />
                    </button>
                </div>
            )}
        </div>
    </div>
  );
};