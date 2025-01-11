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
    color_name: string
}

interface Colors {
    color_id: number,
    color: string,
    color_name: string
}

interface PotsContextType {
    getPots: Pots[] | [];
    setGetPots: React.Dispatch<React.SetStateAction<Pots[] | []>>;


    getListOfColors: Colors[] | [];
    setListOfColors: React.Dispatch<React.SetStateAction<Colors[] | []>>;
}

const PotsContext = createContext<PotsContextType | undefined>(undefined);

export const PotsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    
    const [getPots, setGetPots] = useState<Pots[]>([])
    const [getListOfColors, setListOfColors] = useState<Colors[]>([])

    useEffect(() => {
        // Fetch data from the Node.js API when the component mounts
        const fetchPotsOverview = async () => {
          const res = await fetch('http://localhost:5000/getAllPots');
          const data = await res.json();
          setGetPots(data);
        };
    
        fetchPotsOverview();
        
        const fetchListOfColors = async () => {
          const res = await fetch('http://localhost:5000/getListOfColors');
          const data = await res.json();
          setListOfColors(data);
        };
        
        fetchListOfColors();
      
      }, [setGetPots, setListOfColors]);
    

  return (
    <PotsContext.Provider value={{ getPots, setGetPots, getListOfColors, setListOfColors }}>
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
