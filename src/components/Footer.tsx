import React from 'react';
import { Heart, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-b from-white/70 to-green-50/60 backdrop-blur-md border-t border-gray-200 mt-12">
      <div className="container mx-auto px-4 py-10">
        <div className="text-center">
          {/* Logo / Title */}
          <div className="flex items-center justify-center mb-4">
            <Heart className="w-6 h-6 text-green-500 mr-2 animate-pulse" />
            <span className="text-lg font-semibold text-gray-900 tracking-wide">
              MindoraGPT
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto leading-relaxed">
            Your compassionate AI companion for mental wellness powered by advanced artificial intelligence. 
            Remember, you are not alone in your journey — seeking support is a sign of strength. 🌿
          </p>

          {/* Disclaimer Box */}
          <div className="bg-white/70 border border-gray-200 rounded-xl shadow-sm p-4 mb-6 max-w-3xl mx-auto">
            <p className="text-sm text-gray-600">
              <strong>Important:</strong> MindoraGPT uses advanced AI technology for emotional support and wellness guidance. 
              It is <span className="font-semibold text-gray-800">not a substitute</span> for professional care. 
              For serious mental health concerns or crisis situations, please consult with qualified healthcare professionals 
              or contact emergency services immediately.
            </p>
          </div>

          {/* Signature & Credits */}
          <div className="mt-6 text-sm text-gray-500 space-y-2">
            <p>💚 Made with care for mental wellness and self-care</p>
            <p className="flex items-center justify-center">
              Designed by{' '}
              <a
                href="https://www.jayanth.site"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-1 text-green-600 hover:text-green-800 font-medium transition-colors flex items-center"
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
