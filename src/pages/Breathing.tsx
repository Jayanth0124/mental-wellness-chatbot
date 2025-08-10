import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Wind } from 'lucide-react';

export const Breathing: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [timeLeft, setTimeLeft] = useState(4);
  const [cycle, setCycle] = useState(0);
  const [technique, setTechnique] = useState<'4-7-8' | '4-4-4' | 'box'>('4-4-4');

  const techniques = {
    '4-4-4': { inhale: 4, hold: 4, exhale: 4, name: '4-4-4 Technique' },
    '4-7-8': { inhale: 4, hold: 7, exhale: 8, name: '4-7-8 Relaxation' },
    'box': { inhale: 4, hold: 4, exhale: 4, name: 'Box Breathing' },
  };

  const currentTechnique = techniques[technique];

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      // Move to next phase
      if (phase === 'inhale') {
        setPhase('hold');
        setTimeLeft(currentTechnique.hold);
      } else if (phase === 'hold') {
        setPhase('exhale');
        setTimeLeft(currentTechnique.exhale);
      } else {
        setPhase('inhale');
        setTimeLeft(currentTechnique.inhale);
        setCycle(cycle + 1);
      }
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, phase, currentTechnique, cycle]);

  const startStop = () => {
    setIsActive(!isActive);
  };

  const reset = () => {
    setIsActive(false);
    setPhase('inhale');
    setTimeLeft(currentTechnique.inhale);
    setCycle(0);
  };

  const getPhaseColor = () => {
    switch (phase) {
      case 'inhale': return 'from-blue-400 to-blue-600';
      case 'hold': return 'from-yellow-400 to-yellow-600';
      case 'exhale': return 'from-green-400 to-green-600';
    }
  };

  const getPhaseInstruction = () => {
    switch (phase) {
      case 'inhale': return 'Breathe In... 🌬️';
      case 'hold': return 'Hold... ⏸️';
      case 'exhale': return 'Breathe Out... 😌';
    }
  };

  const getCircleScale = () => {
    if (phase === 'inhale') return isActive ? 'scale-110' : 'scale-100';
    if (phase === 'exhale') return isActive ? 'scale-90' : 'scale-100';
    return 'scale-100';
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <Wind className="w-12 h-12 text-blue-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Mindful Breathing</h1>
        <p className="text-gray-600">Find your center with guided breathing exercises 🌿</p>
      </div>

      {/* Technique Selection */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Choose Your Technique</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {Object.entries(techniques).map(([key, tech]) => (
            <button
              key={key}
              onClick={() => setTechnique(key as any)}
              className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                technique === key
                  ? 'border-blue-300 bg-blue-50 shadow-md'
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
              }`}
            >
              <h3 className="font-medium text-gray-800">{tech.name}</h3>
              <p className="text-sm text-gray-600 mt-1">
                {tech.inhale}s in, {tech.hold}s hold, {tech.exhale}s out
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Breathing Circle */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-gray-100">
        <div className="text-center">
          <div className="relative mx-auto mb-8" style={{ width: '300px', height: '300px' }}>
            <div
              className={`absolute inset-0 rounded-full bg-gradient-to-r ${getPhaseColor()} ${getCircleScale()} transition-all duration-1000 shadow-2xl flex items-center justify-center`}
            >
              <div className="text-center text-white">
                <div className="text-4xl font-bold mb-2">{timeLeft}</div>
                <div className="text-lg opacity-90">{getPhaseInstruction()}</div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {currentTechnique.name}
            </h3>
            <p className="text-gray-600">Cycle: {cycle}</p>
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={startStop}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-red-500 text-white hover:bg-red-600 shadow-md hover:shadow-lg'
                  : 'bg-green-500 text-white hover:bg-green-600 shadow-md hover:shadow-lg'
              }`}
            >
              {isActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              <span>{isActive ? 'Pause' : 'Start'}</span>
            </button>
            
            <button
              onClick={reset}
              className="flex items-center space-x-2 px-6 py-3 bg-gray-500 text-white rounded-xl font-medium hover:bg-gray-600 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8 border border-blue-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Breathing Instructions</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Wind className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-medium text-gray-800 mb-2">Inhale</h3>
            <p className="text-sm text-gray-600">Breathe in slowly through your nose, expanding your belly</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Pause className="w-6 h-6 text-yellow-600" />
            </div>
            <h3 className="font-medium text-gray-800 mb-2">Hold</h3>
            <p className="text-sm text-gray-600">Hold your breath comfortably, don't strain</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Wind className="w-6 h-6 text-green-600 rotate-180" />
            </div>
            <h3 className="font-medium text-gray-800 mb-2">Exhale</h3>
            <p className="text-sm text-gray-600">Breathe out slowly through your mouth, releasing tension</p>
          </div>
        </div>
      </div>
    </div>
  );
};