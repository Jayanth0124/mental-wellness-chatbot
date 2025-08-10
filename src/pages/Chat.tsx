import React, { useState } from 'react';
import { Send, MessageCircle, User, Bot, Trash2 } from 'lucide-react';
import { openAIService } from '../services/openai';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm MindoraGPT, your gentle companion for mental wellness. I'm here to listen, support, and help you navigate your feelings. How are you doing today? 🌸",
      sender: 'bot',
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [userName, setUserName] = useState<string>('');
  const [showNameInput, setShowNameInput] = useState(false);

  const clearConversation = () => {
    setMessages([{
      id: '1',
      content: "Hello! I'm MindoraGPT, your gentle companion for mental wellness. I'm here to listen, support, and help you navigate your feelings. How are you doing today? 🌸",
      sender: 'bot',
      timestamp: new Date(),
    }]);
    openAIService.clearHistory();
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const response = await openAIService.sendMessage(inputMessage, userName);
      
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm experiencing some technical difficulties, but I want you to know that your feelings are valid and I'm here to support you. Please try again in a moment. 🌿",
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleNameSubmit = () => {
    if (userName.trim()) {
      setShowNameInput(false);
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        content: `Nice to meet you, ${userName}! I'm so glad you're here. How can I support you today? 🌸`,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, welcomeMessage]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <MessageCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Chat with MindoraGPT</h1>
        <p className="text-gray-600">Your compassionate AI companion powered by advanced AI technology 💚</p>
        
        <div className="flex justify-center space-x-4 mt-4">
          {!userName && (
            <button
              onClick={() => setShowNameInput(true)}
              className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium"
            >
              Tell me your name
            </button>
          )}
          <button
            onClick={clearConversation}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear Chat</span>
          </button>
        </div>
      </div>

      {/* Name Input Modal */}
      {showNameInput && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">What should I call you?</h3>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your name..."
              className="w-full p-3 border border-gray-200 rounded-lg focus:border-green-300 focus:ring-2 focus:ring-green-100 mb-4"
              onKeyPress={(e) => e.key === 'Enter' && handleNameSubmit()}
              autoFocus
            />
            <div className="flex space-x-3">
              <button
                onClick={handleNameSubmit}
                className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors font-medium"
              >
                Continue
              </button>
              <button
                onClick={() => setShowNameInput(false)}
                className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                Skip
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chat Container */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 overflow-hidden shadow-lg">
        {/* Chat Messages */}
        <div className="h-[500px] overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start space-x-3 ${
                message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                message.sender === 'user' 
                  ? 'bg-blue-100 text-blue-600' 
                  : 'bg-green-100 text-green-600'
              }`}>
                {message.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div className={`max-w-xs lg:max-w-md ${
                message.sender === 'user' ? 'text-right' : ''
              }`}>
                <div className={`rounded-2xl px-4 py-3 ${
                  message.sender === 'user'
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'
                    : 'bg-gradient-to-r from-gray-50 to-gray-100 text-gray-800 shadow-sm'
                }`}>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 text-gray-800 rounded-2xl px-4 py-3 shadow-sm">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Chat Input */}
        <div className="border-t border-gray-100 p-4">
          <div className="flex space-x-3">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={userName ? `Share what's on your mind, ${userName}... I'm here to listen 🌸` : "Share what's on your mind... I'm here to listen 🌸"}
              className="flex-1 resize-none rounded-xl border border-gray-200 focus:border-green-300 focus:ring-2 focus:ring-green-100 px-4 py-3 transition-colors duration-200 shadow-sm"
              rows={2}
            />
            <button
              onClick={sendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className={`px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                inputMessage.trim() && !isTyping
                  ? 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 shadow-md hover:shadow-lg transform hover:scale-105'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-6 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-4 shadow-sm">
        <p className="text-sm text-yellow-800">
          <strong>Please Note:</strong> MindoraGPT provides emotional support and wellness guidance powered by advanced AI, but is not a replacement for professional mental health care. If you're experiencing crisis thoughts or severe distress, please reach out to a mental health professional or crisis helpline immediately.
        </p>
      </div>
    </div>
  );
};