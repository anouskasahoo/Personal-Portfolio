import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import useSound from 'use-sound';
import revealSound from '../assets/sounds/reveal.mp3';

interface RevealAnimationProps {
  onComplete: () => void;
}

const RevealAnimation = ({ onComplete }: RevealAnimationProps) => {
  const [clicked, setClicked] = useState(false);
  const [circlePosition, setCirclePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [playRevealSound] = useSound(revealSound, { volume: 0.5 });
  
  const handleClick = (e: React.MouseEvent) => {
    if (clicked) return;
    
    // Get click position
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setCirclePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
    
    // Play sound effect
    playRevealSound();
    
    // Start animation
    setClicked(true);
    
    // Notify parent after animation completes
    setTimeout(onComplete, 1500);
  };
  
  // Cursor follow effect before click
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <div 
      ref={containerRef}
      className="reveal-container" 
      onClick={handleClick}
    >
      {!clicked ? (
        <>
          <motion.div 
            className="reveal-message"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.5], transition: { repeat: Infinity, duration: 2 } }}
          >
            Click anywhere to reveal my design journey
          </motion.div>
          <motion.div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: 50,
              height: 50,
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              x: mousePosition.x - 25,
              y: mousePosition.y - 25,
              pointerEvents: 'none'
            }}
            animate={{
              scale: [1, 1.2, 1],
              transition: { duration: 1, repeat: Infinity }
            }}
          />
        </>
      ) : (
        <div 
          className={`reveal-circle ${clicked ? 'circle-expanded' : ''}`} 
          style={{ 
            left: circlePosition.x + 'px', 
            top: circlePosition.y + 'px',
            width: '100px',
            height: '100px'
          }}
        />
      )}
    </div>
  );
};

export default RevealAnimation;