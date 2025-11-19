import { useState } from 'react';
import { Home } from './components/Home';
import { Elephants } from './components/Elephants';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Admin } from './components/Admin';
import { Navigation } from './components/Navigation';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'elephants' | 'about' | 'contact' | 'admin'>('home');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
      
      {currentPage === 'home' && <Home onNavigate={setCurrentPage} />}
      {currentPage === 'elephants' && <Elephants />}
      {currentPage === 'about' && <About />}
      {currentPage === 'contact' && <Contact />}
      {currentPage === 'admin' && <Admin />}
    </div>
  );
}