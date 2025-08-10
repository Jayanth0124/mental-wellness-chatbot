import React, { useState } from 'react';
import { Smile, Meh, Frown, Sun, Cloud, CloudRain, Zap, Calendar } from 'lucide-react';

interface MoodEntry {
  mood: number;
  energy: number;
  note: string;
  timestamp: Date;
}

export const MoodTracker: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [selectedEnergy, setSelectedEnergy] = useState<number | null>(null);
  const [note, setNote] = useState('');
  const [entries, setEntries] = useState<MoodEntry[]>([]);

  const moodOptions = [
    { value: 1, icon: Frown, label: 'Struggling', color: 'text-red-500 bg-red-50' },
    { value: 2, icon: CloudRain, label: 'Difficult', color: 'text-orange-500 bg-orange-50' },
    { value: 3, icon: Meh, label: 'Okay', color: 'text-yellow-500 bg-yellow-50' },
    { value: 4, icon: Cloud, label: 'Good', color: 'text-blue-500 bg-blue-50' },
    { value: 5, icon: Smile, label: 'Great', color: 'text-green-500 bg-green-50' },
  ];

  const energyOptions = [
    { value: 1, icon: CloudRain, label: 'Very Low', color: 'text-gray-500 bg-gray-50' },
    { value: 2, icon: Cloud, label: 'Low', color: 'text-blue-500 bg-blue-50' },
    { value: 3, icon: Sun, label: 'Moderate', color: 'text-yellow-500 bg-yellow-50' },
    { value: 4, icon: Zap, label: 'High', color: 'text-orange-500 bg-orange-50' },
    { value: 5, icon: Zap, label: 'Very High', color: 'text-red-500 bg-red-50' },
  ];

  const handleSubmit = () => {
    if (selectedMood && selectedEnergy) {
      const newEntry: MoodEntry = {
        mood: selectedMood,
        energy: selectedEnergy,
        note: note.trim(),
        timestamp: new Date(),
      };
      setEntries([newEntry, ...entries]);
      setSelectedMood(null);
      setSelectedEnergy(null);
      setNote('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <Calendar className="w-12 h-12 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Mood Tracker</h1>
        <p className="text-gray-600">Check in with yourself and track your emotional journey 🌸</p>
      </div>

      {/* Mood Entry Form */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">How are you feeling today?</h2>
        
        {/* Mood Selection */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-700 mb-4">Your Mood</h3>
          <div className="grid grid-cols-5 gap-3">
            {moodOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setSelectedMood(option.value)}
                className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                  selectedMood === option.value
                    ? 'border-green-300 bg-green-50 shadow-md transform scale-105'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                }`}
              >
                <option.icon className={`w-8 h-8 mx-auto mb-2 ${option.color.split(' ')[0]}`} />
                <p className="text-sm font-medium text-gray-700">{option.label}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Energy Selection */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-700 mb-4">Your Energy Level</h3>
          <div className="grid grid-cols-5 gap-3">
            {energyOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setSelectedEnergy(option.value)}
                className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                  selectedEnergy === option.value
                    ? 'border-blue-300 bg-blue-50 shadow-md transform scale-105'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                }`}
              >
                <option.icon className={`w-8 h-8 mx-auto mb-2 ${option.color.split(' ')[0]}`} />
                <p className="text-sm font-medium text-gray-700">{option.label}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Note Input */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-700 mb-4">Optional Note</h3>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="What's on your mind? Share any thoughts, feelings, or events from your day..."
            className="w-full p-4 rounded-xl border border-gray-200 focus:border-green-300 focus:ring-2 focus:ring-green-100 resize-none h-24 transition-colors duration-200"
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={!selectedMood || !selectedEnergy}
          className={`w-full py-3 rounded-xl font-medium transition-all duration-200 ${
            selectedMood && selectedEnergy
              ? 'bg-green-500 text-white hover:bg-green-600 shadow-md hover:shadow-lg'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          Record Mood Entry
        </button>
      </div>

      {/* Recent Entries */}
      {entries.length > 0 && (
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Your Recent Entries</h2>
          <div className="space-y-4">
            {entries.slice(0, 5).map((entry, index) => {
              const moodOption = moodOptions.find(m => m.value === entry.mood);
              const energyOption = energyOptions.find(e => e.value === entry.energy);
              
              return (
                <div key={index} className="bg-white rounded-xl p-4 border border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        {moodOption && <moodOption.icon className={`w-5 h-5 ${moodOption.color.split(' ')[0]}`} />}
                        <span className="font-medium text-gray-700">{moodOption?.label}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {energyOption && <energyOption.icon className={`w-5 h-5 ${energyOption.color.split(' ')[0]}`} />}
                        <span className="text-sm text-gray-600">{energyOption?.label} Energy</span>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">
                      {entry.timestamp.toLocaleString()}
                    </span>
                  </div>
                  {entry.note && (
                    <p className="text-gray-600 italic">{entry.note}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};