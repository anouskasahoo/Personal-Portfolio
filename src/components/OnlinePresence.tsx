import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

// Random names for simulated online users
const names = [
  'Emma', 'Noah', 'Olivia', 'Liam', 'Ava', 'William', 'Sophia', 'Mason',
  'Isabella', 'James', 'Mia', 'Benjamin', 'Charlotte', 'Jacob', 'Amelia'
];

const OnlinePresence = () => {
  const { onlineUsers, addOnlineUser, removeOnlineUser } = useAppContext();
  
  // Simulate other users viewing the site
  useEffect(() => {
    // Add 1-3 random users initially
    const initialCount = Math.floor(Math.random() * 3) + 1;
    const initialUsers = [];
    
    for (let i = 0; i < initialCount; i++) {
      const randomIndex = Math.floor(Math.random() * names.length);
      initialUsers.push(names[randomIndex]);
    }
    
    // Add initial users
    initialUsers.forEach(user => addOnlineUser(user));
    
    // Occasionally add or remove users
    const interval = setInterval(() => {
      const action = Math.random();
      
      if (action < 0.3 && onlineUsers.length > 0) {
        // Remove random user
        const randomIndex = Math.floor(Math.random() * onlineUsers.length);
        removeOnlineUser(onlineUsers[randomIndex]);
      } else if (action > 0.7 && onlineUsers.length < 5) {
        // Add random user
        const randomIndex = Math.floor(Math.random() * names.length);
        const newUser = names[randomIndex];
        
        // Make sure we don't add duplicates
        if (!onlineUsers.includes(newUser)) {
          addOnlineUser(newUser);
        }
      }
    }, 10000);
    
    return () => clearInterval(interval);
  }, [addOnlineUser, removeOnlineUser, onlineUsers]);
  
  return (
    <AnimatePresence>
      {onlineUsers.length > 0 && (
        <motion.div
          className="online-indicator"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="online-dot" />
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Users size={16} />
            <span>
              {onlineUsers.length === 1 
                ? `${onlineUsers[0]} is also viewing`
                : `${onlineUsers.length} others are viewing`}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OnlinePresence;