import { createContext, useContext, useState, ReactNode } from 'react';

type TimeOfDay = 'morning' | 'afternoon' | 'evening';

interface AppContextType {
  timeOfDay: TimeOfDay;
  setTimeOfDay: (time: TimeOfDay) => void;
  audioEnabled: boolean;
  setAudioEnabled: (enabled: boolean) => void;
  showAssistant: boolean;
  setShowAssistant: (show: boolean) => void;
  assistantMessage: string;
  setAssistantMessage: (message: string) => void;
  onlineUsers: string[];
  addOnlineUser: (user: string) => void;
  removeOnlineUser: (user: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('morning');
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [showAssistant, setShowAssistant] = useState(false);
  const [assistantMessage, setAssistantMessage] = useState('');
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  
  const addOnlineUser = (user: string) => {
    if (!onlineUsers.includes(user)) {
      setOnlineUsers([...onlineUsers, user]);
    }
  };
  
  const removeOnlineUser = (user: string) => {
    setOnlineUsers(onlineUsers.filter(u => u !== user));
  };
  
  return (
    <AppContext.Provider value={{
      timeOfDay,
      setTimeOfDay,
      audioEnabled,
      setAudioEnabled,
      showAssistant,
      setShowAssistant,
      assistantMessage,
      setAssistantMessage,
      onlineUsers,
      addOnlineUser,
      removeOnlineUser
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}