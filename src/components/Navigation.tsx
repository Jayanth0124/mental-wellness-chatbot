import React from 'react';
import { Heart, MessageCircle, Activity, Wind, BookOpen, Home } from 'lucide-react';

type Page = 'home' | 'mood' | 'breathing' | 'chat' | 'resources';

interface NavigationProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentPage, onNavigate }) => {
  const navItems = [
    { id: 'home' as Page, icon: Home, label: 'Home' },
    { id: 'mood' as Page, icon: Activity, label: 'Mood' },
    { id: 'breathing' as Page, icon: Wind, label: 'Breathe' },
    { id: 'chat' as Page, icon: MessageCircle, label: 'Chat' },
    { id: 'resources' as Page, icon: BookOpen, label: 'Resources' },
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-sm border-b border-green-100 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Heart className="w-8 h-8 text-green-500" />
            <h1 className="text-xl font-bold text-gray-800">MindoraGPT</h1>
          </div>
          
          <div className="hidden md:flex space-x-1">
            {navItems.map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => onNavigate(id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  currentPage === id
                    ? 'bg-green-100 text-green-700 shadow-sm'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium">{label}</span>
              </button>
            ))}
          </div>

          <div className="md:hidden flex space-x-1">
            {navItems.map(({ id, icon: Icon }) => (
              <button
                key={id}
                onClick={() => onNavigate(id)}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  currentPage === id
                    ? 'bg-green-100 text-green-700 shadow-sm'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                }`}
              >
                <Icon className="w-5 h-5" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};