import React from 'react';
import { HomeIcon, ReportIcon, CalendarIcon, SettingsIcon } from './icons';

type View = 'dashboard' | 'reports' | 'calendar';

interface SidebarProps {
  currentView: View;
  setView: (view: View) => void;
}

const NavItem: React.FC<{
    icon: React.ReactNode;
    label: string;
    isActive: boolean;
    onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`flex items-center space-x-3 w-full text-left p-3 rounded-lg transition-colors duration-200 ${
            isActive
                ? 'bg-indigo-600 text-white'
                : 'text-gray-400 hover:bg-gray-700 hover:text-white'
        }`}
    >
        {icon}
        <span className="font-semibold">{label}</span>
    </button>
);

export const Sidebar: React.FC<SidebarProps> = ({ currentView, setView }) => {
  return (
    <aside className="w-64 bg-gray-800 p-4 border-r border-gray-700 flex-col justify-between hidden md:flex">
        <div>
            <div className="flex items-center space-x-2 mb-8">
                <div className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center font-bold text-xl">
                    P
                </div>
                <h1 className="text-2xl font-bold text-white">PAEI-Quest</h1>
            </div>
            <nav className="space-y-2">
                <NavItem 
                    label="Dashboard"
                    icon={<HomeIcon className="w-6 h-6" />}
                    isActive={currentView === 'dashboard'}
                    onClick={() => setView('dashboard')}
                />
                <NavItem 
                    label="Reports"
                    icon={<ReportIcon className="w-6 h-6" />}
                    isActive={currentView === 'reports'}
                    onClick={() => setView('reports')}
                />
                 <NavItem 
                    label="Calendar"
                    icon={<CalendarIcon className="w-6 h-6" />}
                    isActive={currentView === 'calendar'}
                    onClick={() => setView('calendar')}
                />
            </nav>
        </div>
        <div className="border-t border-gray-700 pt-4 mt-4">
             <NavItem 
                label="Settings"
                icon={<SettingsIcon className="w-6 h-6" />}
                isActive={false}
                onClick={() => { /* Implement settings */ }}
            />
        </div>
    </aside>
  );
};
