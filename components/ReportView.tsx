
import React from 'react';
import { Avatar, Quest } from '../types';
import { QuestCard } from './QuestCard';

interface ReportViewProps {
  avatars: Avatar[];
  quests: Quest[];
  // In a real app, this would be generated data
  reportData: any; 
  onGenerateReport: () => void;
  isGenerating: boolean;
}

const Bar = ({ label, value, color }: { label: string, value: number, color: string }) => (
    <div className="flex items-center my-2">
        <div className="w-32 text-sm text-gray-300">{label}</div>
        <div className="flex-1 bg-gray-700 rounded-full h-6">
            <div 
                className={`h-6 rounded-full ${color} flex items-center justify-end pr-2 text-white font-bold text-xs`}
                style={{ width: `${value}%` }}
            >
                {value.toFixed(0)}%
            </div>
        </div>
    </div>
);

export const ReportView: React.FC<ReportViewProps> = ({ avatars, quests, reportData, onGenerateReport, isGenerating }) => {
  const totalXP = avatars.reduce((sum, a) => sum + a.xp, 1); // Avoid division by zero

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Weekly Report</h1>
        <button
          onClick={onGenerateReport}
          disabled={isGenerating}
          className="bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-500 disabled:bg-indigo-800 disabled:cursor-wait transition-colors"
        >
          {isGenerating ? 'Generating...' : 'Generate New Report'}
        </button>
      </div>
      
      {reportData ? (
        <div className="space-y-6">
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
                <h2 className="text-2xl font-bold text-white mb-2">{reportData.title}</h2>
                <p className="text-gray-300">{reportData.summary}</p>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
                <h2 className="text-2xl font-bold text-white mb-4">Behavioral Insights</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                    {reportData.insights.map((insight: string, index: number) => <li key={index}>{insight}</li>)}
                </ul>
            </div>
        </div>
      ) : (
        <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 text-center text-gray-400">
          <p>Click "Generate New Report" to get your weekly insights.</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-4">PAEI Balance (XP Distribution)</h2>
            <div>
                <Bar label="Producer" value={(avatars.find(a=>a.id==='producer')?.xp || 0) / totalXP * 100} color="bg-red-500" />
                <Bar label="Administrator" value={(avatars.find(a=>a.id==='administrator')?.xp || 0) / totalXP * 100} color="bg-blue-500" />
                <Bar label="Entrepreneur" value={(avatars.find(a=>a.id==='entrepreneur')?.xp || 0) / totalXP * 100} color="bg-yellow-500" />
                <Bar label="Integrator" value={(avatars.find(a=>a.id==='integrator')?.xp || 0) / totalXP * 100} color="bg-green-500" />
            </div>
        </div>
         <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-4">Quest Progress</h2>
            <div className="space-y-4">
                {quests.map(quest => <QuestCard key={quest.id} quest={quest} avatar={avatars.find(a => a.id === quest.avatarId)} />)}
            </div>
        </div>
      </div>

    </div>
  );
};
