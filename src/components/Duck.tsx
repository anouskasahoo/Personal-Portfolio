import React, { useState, useEffect } from 'react';
import cat from '../assets/pics/billu.png';
import nightcat from '../assets/pics/nightbillu.png';

const Duck = () => {
  const [mouseX, setMouseX] = useState(0);
  const [isNight, setIsNight] = useState(false);

  useEffect(() => {
    // Track mouse position on mousemove event
    const handleMouseMove = (event: MouseEvent) => {
      setMouseX(event.clientX); // Update mouseX state with horizontal mouse position
    };

    // Attach mousemove event listener
    window.addEventListener('mousemove', handleMouseMove);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    // Check time of day for night mode (optional)
    const hour = new Date().getHours();
    if (hour >= 18 || hour < 5) {
      setIsNight(true); // Set night mode if after 6 PM or before 5 AM
    }
  }, []);

  const handleClick = () => {

    alert(isNight ? 'Zzz' : 'helo');
  };

  return (
    <div
      onClick={handleClick}
      style={{
        position: 'fixed',
        bottom: '0px',
        left: `${mouseX}px`, // Set duck's horizontal position based on mouseX
        transform: 'translateX(-50%)',
        transition: 'all 0.1s ease',
        cursor: 'pointer',
      }}
    >
      <img
        src={isNight ? nightcat : cat}
        alt="Duck"
        style={{
          width: '150px',
          height: '100px',
        }}
      />
    </div>
  );
};

export default Duck;
