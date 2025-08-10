import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { Home } from './pages/Home';
import { MoodTracker } from './pages/MoodTracker';
import { Breathing } from './pages/Breathing';
import { Chat } from './pages/Chat';
import { Resources } from './pages/Resources';
import { Footer } from './components/Footer';

type Page = 'home' | 'mood' | 'breathing' | 'chat' | 'resources';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={setCurrentPage} />;
      case 'mood':
        return <MoodTracker />;
      case 'breathing':
        return <Breathing />;
      case 'chat':
        return <Chat />;
      case 'resources':
        return <Resources />;
      default:
        return <Home onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-purple-50">
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="container mx-auto px-4 py-8">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}

export default App;