
import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { CloseIcon, MicrophoneIcon } from './icons';

interface MartinChatProps {
  messages: Message[];
  onSendMessage: (text: string) => void;
  isLoading: boolean;
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
  isRecording: boolean;
  onVoiceInputToggle: () => void;
}

// FIX: Defined props with an interface to resolve TypeScript inference issue on line 53.
interface ChatBubbleProps {
  message: Message;
}

const ChatBubble = ({ message }: ChatBubbleProps) => {
    const isMartin = message.sender === 'martin';
    return (
        <div className={`flex ${isMartin ? 'justify-start' : 'justify-end'}`}>
            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-xl ${
                isMartin 
                    ? 'bg-indigo-500 text-white rounded-bl-none' 
                    : 'bg-gray-600 text-white rounded-br-none'
            }`}>
                <p className="text-sm">{message.text}</p>
            </div>
        </div>
    );
};


export const MartinChat: React.FC<MartinChatProps> = ({ messages, onSendMessage, isLoading, isOpen, setOpen, isRecording, onVoiceInputToggle }) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input);
      setInput('');
    }
  };

  const showVoiceButton = input.trim() === '';

  return (
    <div className={`fixed md:relative inset-y-0 right-0 bg-gray-800 border-l border-gray-700 flex flex-col h-full z-30 w-full max-w-sm sm:max-w-md md:w-96 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} md:translate-x-0`}>
      <div className="p-4 border-b border-gray-700 flex justify-between items-center">
        <div>
            <h2 className="text-xl font-bold">Martin</h2>
            <p className="text-sm text-gray-400">Your AI Assistant</p>
        </div>
        <button onClick={() => setOpen(false)} className="md:hidden text-gray-400 hover:text-white">
            <CloseIcon className="w-6 h-6" />
        </button>
      </div>
      <div className="flex-grow p-4 space-y-4 overflow-y-auto">
        {messages.map(msg => (
          <ChatBubble key={msg.id} message={msg} />
        ))}
        {isLoading && (
          <div className="flex justify-start">
             <div className="max-w-xs lg:max-w-md px-4 py-2 rounded-xl bg-indigo-500 text-white rounded-bl-none">
                <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 border-t border-gray-700 bg-gray-800">
        <form onSubmit={handleSend}>
          <div className="flex items-center bg-gray-700 rounded-lg">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isRecording ? "Listening..." : "Ask Martin anything..."}
              className="w-full bg-transparent p-3 focus:outline-none"
              disabled={isLoading || isRecording}
            />
             {showVoiceButton ? (
                 <button
                    type="button"
                    onClick={onVoiceInputToggle}
                    disabled={isLoading}
                    className={`p-3 transition-colors ${isRecording ? 'text-red-500 animate-pulse' : 'text-gray-400 hover:text-white'}`}
                    aria-label={isRecording ? 'Stop listening' : 'Start listening'}
                 >
                    <MicrophoneIcon className="w-6 h-6" />
                 </button>
             ) : (
                <button
                    type="submit"
                    disabled={isLoading}
                    className="p-3 text-gray-400 hover:text-white disabled:text-gray-600 disabled:cursor-not-allowed transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                    </svg>
                </button>
             )}
          </div>
        </form>
      </div>
    </div>
  );
};