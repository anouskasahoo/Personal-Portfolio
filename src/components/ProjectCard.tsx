import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
//import { useAppContext } from '../context/AppContext';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  onClick?: () => void;
}

const ProjectCard = ({ title, description, image, tags, onClick }: ProjectCardProps) => {
  //const { audioEnabled } = useAppContext();
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Values for 3D card effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Add spring physics
  const springConfig = { damping: 15, stiffness: 150 };
  const rotateX = useSpring(useTransform(y, [-100, 100], [30, -30]), springConfig);
  const rotateY = useSpring(useTransform(x, [-100, 100], [-30, 30]), springConfig);
  
  // Handle mouse move for 3D effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate distance from center
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    // Update motion values
    x.set(mouseX);
    y.set(mouseY);
  };
  
  return (
    <motion.div
      ref={cardRef}
      className="project-card three-d-card"
      style={{
        cursor: 'pointer',
        rotateX,
        rotateY,
        background: 'rgb(91, 76, 145)',
        transformStyle: 'preserve-3d',
        perspective: '1000px',
        transition: 'box-shadow 0.3s ease',
        boxShadow: isHovered 
          ? '0 22px 35px rgba(255, 255, 255, 0.2)' 
          : '0 10px 25px rgba(0, 0, 0, 0.1)'
      }}
      whileHover={{ scale: 1.02 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {
        setIsHovered(true);
        // Play sound if enabled
        //if (audioEnabled) {
          //const audio = new Audio('/src/assets/sounds/hover.mp3');
          //audio.volume = 0.2;
          //audio.play();
        //}
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
      }}
      onClick={onClick}
    >
      <div 
        style={{
          transformStyle: 'preserve-3d',
          transform: 'translateZ(0)'
        }}
      >
        <img 
          src={image} 
          alt={title}
          style={{
            transform: 'translateZ(20px)',
            transition: 'transform 0.3s ease'
          }}
        />
        
        <div className="project-content">
          
          <h3 
            style={{
              transform: 'translateZ(40px)',
              transition: 'transform 0.3s ease'
            }}
          >
            {title}
          </h3>
          
          <p 
            style={{
              transform: 'translateZ(30px)',
              transition: 'transform 0.3s ease'
            }}
          >
            {description}
          </p>
          
          <div className="project-tags">
            {tags.map((tag, index) => (
              <span
                key={index}
                className={`badge ${index % 2 === 0 ? 'badge-primary' : 'badge-accent'}`}
                style={{
                  transform: 'translateZ(50px)',
                  transition: 'transform 0.3s ease'
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;