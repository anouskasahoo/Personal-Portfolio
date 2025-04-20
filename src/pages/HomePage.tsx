import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { useState } from 'react';
import '../styles/index.css';

const HomePage = () => {
  const { timeOfDay } = useAppContext();
  const scrollRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(featuredRef, { once: true, amount: 0.3 });
  
  // Context-aware background and text
  const getContextStyles = () => {
    switch(timeOfDay) {
      case 'morning':
        return {
          gradient: 'linear-gradient(135deg, #f5f7fa, #c3cfe2)',
          headingColor: '#000',
          text: 'Start your day exploring my design journey',
          bgColor: 'rgb(255, 255, 255)',
        };
      case 'afternoon':
        return {
          gradient: 'linear-gradient(135deg, #f6d365, #fda085)',
          headingColor: '#000',
          text: 'Take a break and discover my design evolution',
          bgColor: 'rgb(172, 198, 255)',
        };
      case 'evening':
        return {
          gradient: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)',
          headingColor: '#fff',
          text: 'Unwind with my creative portfolio',
          bgColor: 'rgb(10, 4, 54)',
        };
      default:
        return {
          gradient: 'linear-gradient(135deg, #f5f7fa, #c3cfe2)',
          headingColor: '#1e1e1e',
          text: 'Explore my design journey',
          bgColor: 'rgb(0, 0, 0)',
        };
    }
  };
  
  const contextStyles = getContextStyles();
  
  const scrollToFeatured = () => {
    featuredRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });


  // Apply gesture recognizers
  useEffect(() => {
    let startY = 0;
    
    const handleTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      const currentY = e.touches[0].clientY;
      const diff = startY - currentY;
      
      // Swipe down detection for scroll
      if (diff < -50) {
        scrollToFeatured();
      }
    };
    
    const element = scrollRef.current;
    if (element) {
      element.addEventListener('touchstart', handleTouchStart);
      element.addEventListener('touchmove', handleTouchMove);
      
      return () => {
        element.removeEventListener('touchstart', handleTouchStart);
        element.removeEventListener('touchmove', handleTouchMove);
      };
    }
  }, []);
  
  return (
    <div>
      {/* Hero Section - Context-aware background */}
      <section 
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePos({ x, y });
      }}
        ref={scrollRef}
        style={{ 
          height: '100vh',
          background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(48, 7, 171, 0.4), rgba(136, 7, 171, 0.1), rgba(160, 7, 171, 0.06), transparent), ${contextStyles.bgColor}`,
          color: contextStyles.headingColor,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        <div className="container text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ 
              fontSize: 'clamp(0rem, 8vw, 6rem)',
              fontWeight: 8, 
              marginBottom: '24px',
              color: contextStyles.headingColor
            }}
          >
            Anouska Sahoo
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{ 
              fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
              maxWidth: '800px',
              margin: '0 auto 48px',
              color: contextStyles.headingColor
            }}
          >
            Designing and developing playful interfaces with purpose and personality :)
            <br/>
            Let's explore where curiosity meets code and creativity!
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <Link to="/about">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: '12px 32px',
                  background: 'black',
                  color: 'white',
                  borderRadius: '30px',
                  fontSize: '1.1rem',
                  fontWeight: 200,
                  border: 'none',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                More about me
                <ArrowRight size={18} />
              </motion.button>
            </Link>
          </motion.div>
        </div>
        
        <motion.div
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ 
            opacity: { delay: 1.5, duration: 1 },
            y: { repeat: Infinity, duration: 1.5 }
          }}
          onClick={scrollToFeatured}
          style={{
            position: 'absolute',
            bottom: '32px',
            cursor: 'pointer'
          }}
        >
          <ChevronDown size={32} />
        </motion.div>
      </section>
      
      {/* Featured Section */}
      <section 
        ref={featuredRef}
        style={{ 
          padding: '80px 0',
          background: timeOfDay === 'evening' ? '#000000' : '#ffffff'
        }}
      >
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', marginBottom: '48px' }}
          >
            My Roles
          </motion.h2>
          
          <div className="grid" style={{ display: 'flex'}}>
            <InteractionFeature 
              title="Designer"
              description="Creating visually captivating designs that engage and communicate effectively."
              icon="☆☆☆"
              delay={0}
            />
            <InteractionFeature 
              title="Frontend Developer"
              description="Building interactive and responsive user interfaces with a focus on seamless user experience."
              icon="☆☆☆"
              delay={0.2}
            />
            
            <InteractionFeature 
              title="Backend Developer"
              description="Developing robust and efficient server-side applications to support dynamic web solutions."
              icon="☆☆☆"
              delay={0.4}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

// Helper component for featured items
const InteractionFeature = ({ 
  title, 
  description, 
  icon, 
  delay 
}: { 
  title: string; 
  description: string; 
  icon: string;
  delay: number;
}) => {
  const featureRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(featureRef, { once: true, amount: 0.3 });
  
  return (
    <motion.div 
      ref={featureRef}
      className="col-span-3"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      style={{
        background: 'var(--color-background)',
        borderRadius: '12px',
        padding: '32px',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.05)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        border: '1px solid rgba(0, 0, 0, 0.05)'
      }}
    >
      <div style={{ fontSize: '3rem', marginBottom: '8px' }}>{icon}</div>
      <h3 style={{ marginBottom: '8px' }}>{title}</h3>
      <p style={{ opacity: 0.8 }}>{description}</p>
    </motion.div>
  );
};

export default HomePage;