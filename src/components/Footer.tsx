import React from 'react';
import { Heart, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white/60 backdrop-blur-sm border-t border-gray-100 mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Heart className="w-6 h-6 text-green-500 mr-2" />
            <span className="text-lg font-semibold text-gray-800">MindoraGPT</span>
          </div>
          <p className="text-gray-600 mb-4 max-w-2xl mx-auto">
            Your compassionate AI companion for mental wellness powered by advanced artificial intelligence. 
            Remember, you are not alone in your journey, and seeking support is a sign of strength. 🌿
          </p>
          <div className="border-t border-gray-200 pt-4">
            <p className="text-sm text-gray-500">
              <strong>Important:</strong> MindoraGPT uses advanced AI technology for emotional support and wellness guidance. 
              For serious mental health concerns or crisis situations, please consult with qualified healthcare professionals 
              or contact emergency services.
            </p>
          </div>
          <div className="mt-4 text-sm text-gray-500 space-y-2">
            <p>Made with 💚 for mental wellness and self-care</p>
            <p className="flex items-center justify-center">
              Designed by{' '}
              <a
                href="https://www.jayanth.site"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-1 text-blue-600 hover:text-blue-800 font-medium transition-colors flex items-center"
              >
                Donavalli Jayanth
                <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};