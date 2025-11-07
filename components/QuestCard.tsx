
import React from 'react';
import { Quest, Avatar } from '../types';
import { ProducerIcon, AdministratorIcon, EntrepreneurIcon, IntegratorIcon } from './icons';

interface QuestCardProps {
  quest: Quest;
  avatar: Avatar | undefined;
}

const getAvatarIcon = (avatar?: Avatar) => {
    if (!avatar) return null;
    switch (avatar.paeiRole) {
        case 'P': return <ProducerIcon className="w-5 h-5" />;
        case 'A': return <AdministratorIcon className="w-5 h-5" />;
        case 'E': return <EntrepreneurIcon className="w-5 h-5" />;
        case 'I': return <IntegratorIcon className="w-5 h-5" />;
        default: return null;
    }
}

export const QuestCard: React.FC<QuestCardProps> = ({ quest, avatar }) => {
  return (
    <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
      <div className="flex justify-between items-start">
        <div>
            <h4 className="font-bold text-white">{quest.title}</h4>
            <div className="flex items-center text-xs text-gray-400 mt-1">
                {getAvatarIcon(avatar)}
                <span className="ml-2">{avatar?.name || 'Unassigned'}</span>
            </div>
        </div>
        <span className="text-sm font-semibold text-indigo-400">{quest.progress}%</span>
      </div>
      <p className="text-sm text-gray-400 my-2">{quest.description}</p>
      <div className="w-full bg-gray-700 rounded-full h-1.5 mt-2">
        <div
          className="bg-indigo-500 h-1.5 rounded-full"
          style={{ width: `${quest.progress}%` }}
        ></div>
      </div>
    </div>
  );
};
