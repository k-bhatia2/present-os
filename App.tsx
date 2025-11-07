import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { ReportView } from './components/ReportView';
import { CalendarView } from './components/CalendarView';
import { MartinChat } from './components/MartinChat';
import { EditTaskModal } from './components/EditTaskModal';
import { initialAvatars, initialQuests, initialTasks } from './data/initialData';
import { Avatar, Quest, Task, Message } from './types';
import { generateWeeklyReport } from './services/geminiService';
import { GoogleGenAI, Chat } from "@google/genai";

// FIX: Initialize GoogleGenAI and create a chat instance as per guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
const chat: Chat = ai.chats.create({
  model: 'gemini-2.5-flash',
  config: {
    systemInstruction: `You are Martin, an AI assistant for a productivity app called "PAEI-Quest". 
The app is based on the PAEI management model (Producer, Administrator, Entrepreneur, Integrator). 
Users manage their life through four 'Avatars', each representing a PAEI role. They complete Tasks to gain XP for their avatars and make progress on larger Quests.
Be helpful, concise, and stay in character.`,
  },
});

type View = 'dashboard' | 'reports' | 'calendar';

const App: React.FC = () => {
    const [view, setView] = useState<View>('dashboard');
    const [avatars, setAvatars] = useState<Avatar[]>(initialAvatars);
    const [quests, setQuests] = useState<Quest[]>(initialQuests);
    const [tasks, setTasks] = useState<Task[]>(initialTasks);
    
    // Chat state
    const [isChatOpen, setChatOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', text: 'Hello! How can I help you be more effective today?', sender: 'martin' }
    ]);
    const [isMartinLoading, setMartinLoading] = useState(false);
    
    // Report state
    const [reportData, setReportData] = useState<any>(null);
    const [isGeneratingReport, setGeneratingReport] = useState(false);

    // Modal state
    const [editingTask, setEditingTask] = useState<Task | null>(null);

    const handleCompleteTask = (taskId: string) => {
        setTasks(prevTasks => {
            const newTasks = prevTasks.map(task => 
                task.id === taskId ? { ...task, completed: !task.completed } : task
            );
            const completedTask = newTasks.find(t => t.id === taskId);
            if (completedTask?.completed) {
                // Add XP to avatar
                setAvatars(prevAvatars => prevAvatars.map(avatar => 
                    avatar.id === completedTask.avatarId 
                    ? { ...avatar, xp: avatar.xp + 25 } // Arbitrary XP value
                    : avatar
                ));
            }
            return newTasks;
        });
    };

    const handleDeleteTask = (taskId: string) => {
        setTasks(tasks.filter(t => t.id !== taskId));
    };

    const handleSaveTask = (updatedTask: Task) => {
        setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
        setEditingTask(null);
    };

    const handleGenerateReport = async () => {
        setGeneratingReport(true);
        try {
            const data = await generateWeeklyReport(avatars, quests, tasks);
            setReportData(data);
        } catch (error) {
            console.error(error);
            // You might want to show an error to the user
        } finally {
            setGeneratingReport(false);
        }
    };

    const handleSendMessage = async (text: string) => {
        const userMessage: Message = { id: Date.now().toString(), text, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setMartinLoading(true);

        try {
            // FIX: Use chat.sendMessage and extract text from the response as per guidelines.
            const response = await chat.sendMessage({ message: text });
            const martinResponse: Message = { id: Date.now().toString() + 'm', text: response.text, sender: 'martin' };
            setMessages(prev => [...prev, martinResponse]);
        } catch (error) {
            console.error("Failed to get response from Martin:", error);
            const errorResponse: Message = { id: Date.now().toString() + 'm', text: "Sorry, I'm having trouble connecting right now.", sender: 'martin' };
            setMessages(prev => [...prev, errorResponse]);
        } finally {
            setMartinLoading(false);
        }
    };

    const renderView = () => {
        switch (view) {
            case 'reports':
                return <ReportView 
                    avatars={avatars}
                    quests={quests}
                    reportData={reportData}
                    onGenerateReport={handleGenerateReport}
                    isGenerating={isGeneratingReport}
                />;
            case 'calendar':
                return <CalendarView />;
            case 'dashboard':
            default:
                return <Dashboard 
                    avatars={avatars} 
                    quests={quests} 
                    tasks={tasks}
                    onCompleteTask={handleCompleteTask}
                    onEditTask={(task) => setEditingTask(task)}
                    onDeleteTask={handleDeleteTask}
                />;
        }
    };

    return (
        <div className="flex h-screen bg-gray-900 text-gray-200 font-sans">
            <Sidebar currentView={view} setView={setView} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header onChatToggle={() => setChatOpen(!isChatOpen)} />
                <main className="flex-1 overflow-y-auto">
                    {renderView()}
                </main>
            </div>
            <MartinChat 
                messages={messages}
                onSendMessage={handleSendMessage}
                isLoading={isMartinLoading}
                isOpen={isChatOpen}
                setOpen={setChatOpen}
                isRecording={false} // Voice input not implemented yet
                onVoiceInputToggle={() => {}} // Voice input not implemented yet
            />
            {editingTask && (
                <EditTaskModal 
                    task={editingTask}
                    avatars={avatars}
                    onSave={handleSaveTask}
                    onClose={() => setEditingTask(null)}
                />
            )}
        </div>
    );
};

export default App;
