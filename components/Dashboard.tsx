import React from 'react';
import { Avatar, Quest, Task } from '../types';
import { AvatarCard } from './AvatarCard';
import { QuestCard } from './QuestCard';
import { TaskItem } from './TaskItem';

interface DashboardProps {
  avatars: Avatar[];
  quests: Quest[];
  tasks: Task[];
  onCompleteTask: (taskId: string) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ avatars, quests, tasks, onCompleteTask, onEditTask, onDeleteTask }) => {
  const incompleteTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t => t.completed);

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Avatars Section */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Your Avatars</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {avatars.map(avatar => (
            <AvatarCard key={avatar.id} avatar={avatar} />
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tasks Section */}
        <div className="lg:col-span-2 bg-gray-800/50 p-4 sm:p-6 rounded-xl border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-4">Today's Focus</h2>
          <div className="space-y-3">
              {incompleteTasks.length > 0 ? (
                incompleteTasks.map(task => (
                    <TaskItem 
                        key={task.id} 
                        task={task} 
                        avatar={avatars.find(a => a.id === task.avatarId)}
                        onComplete={onCompleteTask}
                        onEdit={onEditTask}
                        onDelete={onDeleteTask}
                    />
                ))
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <p>All tasks for today are complete. Well done!</p>
                </div>
              )}

              {completedTasks.length > 0 && (
                <>
                    <h3 className="text-lg font-semibold text-gray-300 pt-6 pb-2 border-b border-gray-700">Completed</h3>
                    {completedTasks.map(task => (
                        <TaskItem 
                            key={task.id} 
                            task={task} 
                            avatar={avatars.find(a => a.id === task.avatarId)}
                            onComplete={onCompleteTask}
                            onEdit={onEditTask}
                            onDelete={onDeleteTask}
                        />
                    ))}
                </>
              )}
          </div>
        </div>
        
        {/* Quests Section */}
        <div className="bg-gray-800/50 p-4 sm:p-6 rounded-xl border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-4">Active Quests</h2>
            <div className="space-y-4">
                {quests.map(quest => (
                    <QuestCard 
                        key={quest.id} 
                        quest={quest}
                        avatar={avatars.find(a => a.id === quest.avatarId)}
                    />
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};