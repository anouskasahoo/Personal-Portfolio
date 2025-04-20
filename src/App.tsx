import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import Navbar from './components/Navbar';
import RevealAnimation from './components/RevealAnimation';
import AudioController from './components/AudioController';
import VirtualAssistant from './components/VirtualAssistant';
import OnlinePresence from './components/OnlinePresence';
import { useAppContext } from './context/AppContext';
import Duck from './components/Duck';

function App() {
  const [showReveal, setShowReveal] = useState(true);
  const { timeOfDay, setTimeOfDay } = useAppContext();
  
  // Determine time of day for context-aware features
  useEffect(() => {
    const updateTimeOfDay = () => {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 12) {
        setTimeOfDay('morning');
      } else if (hour >= 12 && hour < 18) {
        setTimeOfDay('afternoon');
      } else {
        setTimeOfDay('evening');
      }
    };
    
    updateTimeOfDay();
    const interval = setInterval(updateTimeOfDay, 60000);
    
    return () => clearInterval(interval);
  }, [setTimeOfDay]);
  
  // Add class to body based on time of day
  useEffect(() => {
    if (timeOfDay === 'evening') {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [timeOfDay]);
  
  if (showReveal) {
    return <RevealAnimation onComplete={() => setShowReveal(false)} />;
  }
  
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <VirtualAssistant />
      <Duck/>
    </>
  );
}

export default App;