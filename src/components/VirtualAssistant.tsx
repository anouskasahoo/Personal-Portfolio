import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { MessageSquare, X } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const VirtualAssistant = () => {
  const { timeOfDay, showAssistant, setShowAssistant, setAssistantMessage } = useAppContext();
  const [assistantState, setAssistantState] = useState<'idle' | 'thinking' | 'speaking'>('idle');
  const [avatarMood, setAvatarMood] = useState<'happy' | 'neutral' | 'curious'>('neutral');
  const location = useLocation();
  
  // Change assistant message based on page and time of day
  useEffect(() => {
    const currentPage = location.pathname;
    let message = '';
    
    // Greet based on time of day
    const greeting = timeOfDay === 'morning' 
      ? 'Good morning!'
      : timeOfDay === 'afternoon' 
        ? 'Good afternoon!'
        : 'Good evening!';
    
    // Context-aware messages
    if (currentPage === '/') {
      message = `${greeting} Welcome to my design journey portfolio. Feel free to explore my work and process.`;
      setAvatarMood('happy');
    } else if (currentPage === '/projects') {
      message = `Here are some of my design projects. Hover over the cards to see their 3D effect - it's one of the mixed reality features I've added.`;
      setAvatarMood('curious');
    } else if (currentPage === '/about') {
      message = `This page tells my story as a designer and my evolution through various experiences and learnings.`;
      setAvatarMood('neutral');
    } else if (currentPage === '/contact') {
      message = `Want to connect? You can reach me through any of these channels.`;
      setAvatarMood('happy');
    }
    
    // Set message with typing effect
    setAssistantState('thinking');
    setTimeout(() => {
      setAssistantState('speaking');
      setAssistantMessage(message);
    }, 1000);
  }, [location, timeOfDay, setAssistantMessage]);
  
  // Random assistant movements to appear more lifelike
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const moods: Array<'happy' | 'neutral' | 'curious'> = ['happy', 'neutral', 'curious'];
        const randomMood = moods[Math.floor(Math.random() * moods.length)];
        setAvatarMood(randomMood);
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  const toggleAssistant = () => {
    setShowAssistant(!showAssistant);
  };
  
  // Avatar expressions based on mood
  const getAvatarExpression = () => {
    switch (avatarMood) {
      case 'happy':
        return '😊';
      case 'curious':
        return '🤔';
      case 'neutral':
      default:
        return '😐';
    }
  };
  
  return (
    <div className="avatar-container">
      <motion.button
        className="avatar-toggle"
        onClick={toggleAssistant}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        style={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          backgroundColor: 'var(--color-accent)',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: 'none',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
        }}
      >
        {showAssistant ? <X size={20} /> : <MessageSquare size={20} />}
      </motion.button>
      
      <AnimatePresence>
        {showAssistant && (
          <motion.div
            className="assistant-bubble"
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ type: 'spring', damping: 20 }}
            style={{
              position: 'absolute',
              bottom: '70px',
              right: '0',
              width: '280px',
              backgroundColor: 'var(--color-background)',
              borderRadius: '12px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
              padding: '16px',
              zIndex: 100,
              border: '1px solid rgba(0, 0, 0, 0.1)'
            }}
          >
            <div className="assistant-header" style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
              <div 
                className="assistant-avatar"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '12px',
                  fontSize: '20px'
                }}
              >
                {getAvatarExpression()}
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: '16px' }}>Design Assistant</h4>
                <div style={{ fontSize: '12px', opacity: 0.7 }}>
                  {assistantState === 'idle' && 'Available'}
                  {assistantState === 'thinking' && 'Thinking...'}
                  {assistantState === 'speaking' && 'Online'}
                </div>
              </div>
            </div>
            
            <div className="assistant-message">
              {assistantState === 'thinking' ? (
                <div className="thinking-dots" style={{ display: 'flex', gap: '4px' }}>
                  <motion.div 
                    style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-accent)' }}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                  />
                  <motion.div 
                    style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-accent)' }}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut', delay: 0.2 }}
                  />
                  <motion.div 
                    style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-accent)' }}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut', delay: 0.4 }}
                  />
                </div>
              ) : (
                <p style={{ fontSize: '14px', lineHeight: 1.5 }}>
                  {assistantState === 'speaking' ? (
                    <TypewriterEffect text="Good morning! Welcome to my design journey portfolio. Feel free to explore my work and process." />
                  ) : ''}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Simple typewriter effect component
const TypewriterEffect = ({ text }: { text: string }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    // Reset when text changes
    setDisplayedText('');
    setCurrentIndex(0);
  }, [text]);
  
  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 30);
      
      return () => clearTimeout(timer);
    }
  }, [currentIndex, text]);
  
  return <>{displayedText}</>;
};

export default VirtualAssistant;