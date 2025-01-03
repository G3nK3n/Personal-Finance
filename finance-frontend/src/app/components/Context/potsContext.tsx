// context/BillsContext.tsx
'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface Pots {
    pots_id: number,
    category_id: number,
    target: number,
    total_amount: number,
    color: string,
    category_name: string,
}

interface PotsContextType {
    getPots: Pots[] | [];
    setGetPots: React.Dispatch<React.SetStateAction<Pots[] | []>>;
}

const PotsContext = createContext<PotsContextType | undefined>(undefined);

export const PotsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    
    const [getPots, setGetPots] = useState<Pots[]>([])

    useEffect(() => {
        // Fetch data from the Node.js API when the component mounts
        const fetchPotsOverview = async () => {
          const res = await fetch('http://localhost:5000/getAllPots');
          const data = await res.json();
          setGetPots(data);
        };
    
        fetchPotsOverview();
      }, []);

    

  return (
    <PotsContext.Provider value={{ getPots, setGetPots }}>
      {children}
    </PotsContext.Provider>
  );
};

// Hook for accessing user data
export const usePots = () => {
  const context = useContext(PotsContext);
  if (!context) throw new Error('useUser must be used within a BillsProvider');
  return context;
};
