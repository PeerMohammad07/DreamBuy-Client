import React, { createContext, ReactNode, useContext, useMemo } from 'react';
import { io, Socket } from 'socket.io-client';

interface SocketContextType {
  socket: Socket;
}

const SocketContext = createContext<SocketContextType | null>(null);

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const socket = useMemo(()=>io("http://localhost:3000"),[]) 

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (context === null) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};
