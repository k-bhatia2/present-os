
import React from 'react';
import { Avatar, PAEIRole } from '../types';
import { ProducerIcon, AdministratorIcon, EntrepreneurIcon, IntegratorIcon } from './icons';

interface AvatarCardProps {
  avatar: Avatar;
}

const PAEI_DETAILS = {
  [PAEIRole.Producer]: { icon: <ProducerIcon className="w-6 h-6 text-red-400" />, color: 'red' },
  [PAEIRole.Administrator]: { icon: <AdministratorIcon className="w-6 h-6 text-blue-400" />, color: 'blue' },
  [PAEIRole.Entrepreneur]: { icon: <EntrepreneurIcon className="w-6 h-6 text-yellow-400" />, color: 'yellow' },
  [PAEIRole.Integrator]: { icon: <IntegratorIcon className="w-6 h-6 text-green-400" />, color: 'green' },
};

export const AvatarCard: React.FC<AvatarCardProps> = ({ avatar }) => {
  const { icon, color } = PAEI_DETAILS[avatar.paeiRole];
  const progress = (avatar.xp / avatar.xpToNextLevel) * 100;

  // FIX: Use a lookup object for Tailwind classes to ensure they are statically analyzable.
  const progressColorClass = {
    red: 'bg-red-500',
    blue: 'bg-blue-500',
    yellow: 'bg-yellow-500',
    green: 'bg-green-500',
  }[color] || 'bg-gray-500';

  return (
    <div className="bg-gray-800 rounded-xl p-4 flex flex-col h-full border border-gray-700 hover:border-indigo-500 transition-all duration-200">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
            <div className="p-2 bg-gray-700 rounded-full">
                {icon}
            </div>
            <div>
                <h3 className="font-bold text-white">{avatar.name}</h3>
                <p className="text-sm text-gray-400">Level {avatar.level}</p>
            </div>
        </div>
      </div>
      <p className="text-sm text-gray-400 my-3 flex-grow">{avatar.description}</p>
      <div>
        <div className="flex justify-between items-center text-xs text-gray-400 mb-1">
          <span>XP</span>
          <span>{avatar.xp} / {avatar.xpToNextLevel}</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className={`h-2 rounded-full ${progressColorClass}`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};
