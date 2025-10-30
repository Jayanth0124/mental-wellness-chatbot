import React, { useState } from 'react';
import { Heart, Sparkles, Shield, Users } from 'lucide-react';

type Page = 'home' | 'mood' | 'breathing' | 'chat' | 'resources';

interface HomeProps {
  onNavigate: (page: Page) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  // 💡 List of affirmations
  const affirmations = [
    "You have the strength to overcome challenges, the wisdom to learn from experiences, and the courage to embrace each new day with hope and kindness toward yourself.",
    "You are worthy of love, peace, and happiness. Take time today to nurture your mind and heart. 🌿",
    "Your feelings are valid. Healing takes time, and every small step forward is a victory.",
    "You are capable of creating positive change in your life. Trust in your journey. ✨",
    "Even in difficult moments, you carry resilience and light within you. 💙",
  ];

  // 💡 State to track which affirmation is showing
  const [currentAffirmation, setCurrentAffirmation] = useState(affirmations[0]);

  // Function to get a new random affirmation
  const getNewAffirmation = () => {
    let newAffirmation = currentAffirmation;
    while (newAffirmation === currentAffirmation) {
      newAffirmation = affirmations[Math.floor(Math.random() * affirmations.length)];
    }
    setCurrentAffirmation(newAffirmation);
  };

  const features = [
    {
      icon: Heart,
      title: 'Track Your Mood',
      description: 'Monitor your emotional well-being with our gentle mood tracking system.',
      action: () => onNavigate('mood'),
      color: 'bg-pink-100 text-pink-700'
    },
    {
      icon: Sparkles,
      title: 'Mindful Breathing',
      description: 'Practice guided breathing exercises to find calm and center yourself.',
      action: () => onNavigate('breathing'),
      color: 'bg-blue-100 text-blue-700'
    },
    {
      icon: Users,
      title: 'Supportive Chat',
      description: 'Have a caring conversation with your AI wellness companion.',
      action: () => onNavigate('chat'),
      color: 'bg-green-100 text-green-700'
    },
    {
      icon: Shield,
      title: 'Crisis Resources',
      description: 'Access professional help and crisis support resources when needed.',
      action: () => onNavigate('resources'),
      color: 'bg-purple-100 text-purple-700'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-12 pt-8">
        <div className="mb-6">
          <Heart className="w-16 h-16 text-green-500 mx-auto mb-4 animate-pulse" />
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
            Welcome to <span className="text-green-600">MindoraGPT</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Your compassionate AI companion powered by advanced artificial intelligence for mental wellness, 
            mindfulness, and emotional support. We're here to help you find peace, manage stress, and nurture your well-being. 🌿
          </p>
        </div>
        
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 max-w-3xl mx-auto border border-green-100 shadow-lg">
          <p className="text-sm text-gray-500 mb-4">
            <strong>Important:</strong> MindoraGPT uses cutting-edge AI technology to provide emotional support and wellness tools. 
            For serious mental health concerns, please consult with a qualified healthcare professional.
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 mb-12">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-all duration-300 hover:transform hover:-translate-y-1 cursor-pointer group"
            onClick={feature.action}
          >
            <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
              <feature.icon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
            <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            <div className="mt-4 text-green-600 font-medium group-hover:text-green-700 transition-colors">
              Get started →
            </div>
          </div>
        ))}
      </div>

      {/* Daily Affirmation */} 
      <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl p-8 text-center border border-green-200">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Daily Affirmation 💙</h2>
        <p className="text-lg text-gray-700 italic max-w-2xl mx-auto leading-relaxed">
          "{currentAffirmation}"
        </p>
        <button 
          onClick={getNewAffirmation}
          className="mt-6 px-6 py-3 bg-white text-green-700 rounded-full font-medium hover:bg-green-50 transition-colors duration-200 shadow-sm"
        >
          Get New Affirmation
        </button>
      </div>
    </div>
  );
};

