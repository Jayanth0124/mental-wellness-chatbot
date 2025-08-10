import React from 'react';
import { Phone, Globe, Heart, AlertTriangle, BookOpen, Users } from 'lucide-react';

export const Resources: React.FC = () => {
  const crisisResources = [
    {
      name: "KIRAN Mental Health Helpline",
      phone: "1800-599-0019",
      description: "24/7 free mental health support by Ministry of Social Justice, Government of India",
      website: "https://www.mohfw.gov.in"
    },
    {
      name: "Vandrevala Foundation Helpline",
      phone: "1860-2662-345 or 1800-2333-330",
      description: "24/7 free counseling support for mental health and suicide prevention",
      website: "https://www.vandrevalafoundation.com"
    },
    {
      name: "Sneha India Foundation",
      phone: "044-24640050",
      description: "Suicide prevention and emotional support helpline",
      website: "https://snehaindia.org"
    },
    {
      name: "iCall Psychosocial Helpline",
      phone: "9152987821",
      description: "Professional counseling support by TISS Mumbai",
      website: "https://icallhelpline.org"
    }
  ];

  const mentalHealthResources = [
    {
      name: "National Institute of Mental Health (NIMHANS)",
      description: "Premier mental health institute providing treatment and research",
      website: "https://nimhans.ac.in",
      icon: Users
    },
    {
      name: "The Live Love Laugh Foundation",
      description: "Mental health awareness and support resources in India",
      website: "https://www.thelivelovelaughfoundation.org",
      icon: Heart
    },
    {
      name: "White Swan Foundation",
      description: "Mental health information and support platform",
      website: "https://www.whiteswanfoundation.org",
      icon: BookOpen
    },
    {
      name: "Mpower - The Centre",
      description: "Mental health services and awareness programs",
      website: "https://mpowerminds.com",
      icon: Heart
    }
  ];

  const selfCareResources = [
    "Practice mindfulness and meditation daily",
    "Maintain regular sleep schedule (7-9 hours)",
    "Engage in regular physical activity",
    "Connect with supportive friends and family",
    "Limit alcohol and avoid drugs",
    "Eat nutritious, regular meals",
    "Practice gratitude and positive self-talk",
    "Seek professional help when needed"
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <BookOpen className="w-12 h-12 text-purple-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Mental Health Resources</h1>
        <p className="text-gray-600">Professional support and helpful resources for your mental wellness journey 🌿</p>
      </div>

      {/* Crisis Resources */}
      <div className="mb-8">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-6">
          <div className="flex items-center mb-4">
            <AlertTriangle className="w-6 h-6 text-red-600 mr-3" />
            <h2 className="text-xl font-bold text-red-800">Crisis Resources - Get Help Now</h2>
          </div>
          <p className="text-red-700 mb-4">
            If you are having thoughts of self-harm or suicide, please reach out for help immediately. You are not alone.
          </p>
          
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-4">
            {crisisResources.map((resource, index) => (
              <div key={index} className="bg-white rounded-xl p-4 border border-red-200">
                <h3 className="font-semibold text-gray-800 mb-2">{resource.name}</h3>
                <div className="flex items-center mb-2">
                  <Phone className="w-4 h-4 text-red-600 mr-2" />
                  <span className="font-bold text-red-600">{resource.phone}</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{resource.description}</p>
                <a
                  href={resource.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <Globe className="w-4 h-4 mr-1" />
                  Visit Website
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Professional Resources */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-gray-100">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Professional Mental Health Resources</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {mentalHealthResources.map((resource, index) => (
            <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-3">
                <resource.icon className="w-6 h-6 text-green-600 mr-3" />
                <h3 className="font-semibold text-gray-800">{resource.name}</h3>
              </div>
              <p className="text-gray-600 mb-4">{resource.description}</p>
              <a
                href={resource.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                <Globe className="w-4 h-4 mr-1" />
                Visit Website
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Self-Care Tips */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 mb-8 border border-green-100">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Self-Care Strategies</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {selfCareResources.map((tip, index) => (
            <div key={index} className="flex items-center bg-white/60 rounded-lg p-4">
              <Heart className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
              <span className="text-gray-700">{tip}</span>
            </div>
          ))}
        </div>
      </div>

      {/* When to Seek Professional Help */}
      <div className="bg-blue-50 rounded-2xl p-8 border border-blue-200">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">When to Seek Professional Help</h2>
        <p className="text-gray-700 mb-4">
          Consider reaching out to a mental health professional if you experience:
        </p>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start">
            <span className="text-blue-500 mr-2">•</span>
            Persistent feelings of sadness, anxiety, or hopelessness
          </li>
          <li className="flex items-start">
            <span className="text-blue-500 mr-2">•</span>
            Difficulty functioning in daily activities
          </li>
          <li className="flex items-start">
            <span className="text-blue-500 mr-2">•</span>
            Substance abuse or addictive behaviors
          </li>
          <li className="flex items-start">
            <span className="text-blue-500 mr-2">•</span>
            Relationship problems or social isolation
          </li>
          <li className="flex items-start">
            <span className="text-blue-500 mr-2">•</span>
            Trauma or significant life changes
          </li>
          <li className="flex items-start">
            <span className="text-blue-500 mr-2">•</span>
            Thoughts of self-harm or suicide
          </li>
        </ul>
        <p className="mt-4 text-gray-700 italic">
          Remember: Seeking help is a sign of strength, not weakness. Professional support can provide you with tools and strategies to improve your mental health and quality of life.
        </p>
      </div>
    </div>
  );
};