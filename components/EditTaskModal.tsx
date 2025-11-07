import React, { useState, useEffect } from 'react';
import { Task, Avatar } from '../types';
import { CloseIcon } from './icons';

interface EditTaskModalProps {
  task: Task;
  avatars: Avatar[];
  onSave: (task: Task) => void;
  onClose: () => void;
}

export const EditTaskModal: React.FC<EditTaskModalProps> = ({ task, avatars, onSave, onClose }) => {
  const [title, setTitle] = useState(task.title);
  const [avatarId, setAvatarId] = useState(task.avatarId);
  const [dueDate, setDueDate] = useState(task.dueDate || '');

  useEffect(() => {
    setTitle(task.title);
    setAvatarId(task.avatarId);
    setDueDate(task.dueDate || '');
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...task,
      title,
      avatarId,
      dueDate,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md border border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Edit Task</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-gray-700 text-white rounded-lg p-2 border border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label htmlFor="avatar" className="block text-sm font-medium text-gray-300 mb-1">Avatar</label>
            <select
              id="avatar"
              value={avatarId}
              onChange={(e) => setAvatarId(e.target.value)}
              className="w-full bg-gray-700 text-white rounded-lg p-2 border border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              required
            >
              <option value="" disabled>Select an avatar</option>
              {avatars.map(avatar => (
                <option key={avatar.id} value={avatar.id}>{avatar.name}</option>
              ))}
            </select>
          </div>
           <div>
            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-300 mb-1">Due Date</label>
            <input
              id="dueDate"
              type="text"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              placeholder="e.g., Tomorrow, 2024-12-31"
              className="w-full bg-gray-700 text-white rounded-lg p-2 border border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
          <div className="flex justify-end space-x-3 pt-2">
            <button type="button" onClick={onClose} className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                Cancel
            </button>
             <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
