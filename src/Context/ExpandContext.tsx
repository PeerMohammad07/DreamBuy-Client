import React, { createContext, useState, Dispatch, SetStateAction, ReactNode, useContext } from 'react';

// Define the context type
interface ExpandContextType {
  expanded: boolean;
  setExpanded: Dispatch<SetStateAction<boolean>>;
}

// Create the context with the correct type and default value
const ExpandContext = createContext<ExpandContextType | undefined>(undefined);

interface ExpandProviderProps {
  children: ReactNode;
}

const ExpandProvider: React.FC<ExpandProviderProps> = ({ children }) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <ExpandContext.Provider value={{ expanded, setExpanded }}>
      {children}
    </ExpandContext.Provider>
  );
};

const useExpandContext = () => {
  const context = useContext(ExpandContext);
  if (!context) {
    throw new Error('useExpandContext must be used within an ExpandProvider');
  }
  return context;
};

export { ExpandProvider, useExpandContext };
