// context/BillsContext.tsx
'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface Bills {
    bill_id: number,
    bill_name: string,
    due_date: number,
    due_amount: number,
    bill_status: string,
}

interface BillsContextType {
  billsOverview: Bills[] | [];
  setBillsOverview: React.Dispatch<React.SetStateAction<Bills[] | []>>;
  paidBillsTotal: number | 0;
  setPaidBillsTotal: React.Dispatch<React.SetStateAction<number | 0>>;
  upcomingTotal: number | 0;
  setUpcomingTotal: React.Dispatch<React.SetStateAction<number | 0>>;
  dueTotal: number | 0;
  setDueTotal: React.Dispatch<React.SetStateAction<number | 0>>;
  totalAmount: number | 0;
  setTotalAmount: React.Dispatch<React.SetStateAction<number | 0>>;
  paidBillsCount: number | 0;
  upcomingCount: number | 0;
  dueCount: number | 0;

}

const BillsContext = createContext<BillsContextType | undefined>(undefined);

export const BillsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [billsOverview, setBillsOverview] = useState<Bills[]>([])
    const [paidBillsTotal, setPaidBillsTotal] = useState<number>(0)
    const [upcomingTotal, setUpcomingTotal] = useState<number>(0)
    const [dueTotal, setDueTotal] = useState<number>(0)
    const [totalAmount, setTotalAmount] = useState<number>(0)

    const [paidBillsCount, setPaidBillsCount] = useState<number>(0)
    const [upcomingCount, setUpcomingCount] = useState<number>(0)
    const [dueCount, setDueCount] = useState<number>(0)   

    useEffect(() => {
        // Fetch data from the Node.js API when the component mounts
        const fetchBillsOverview = async () => {
            const res = await fetch('http://localhost:5000/getAllBills');
            const data = await res.json();
            setBillsOverview(data);
        };
    
        fetchBillsOverview();
        
    }, []);

    useEffect(() => {
        calculateBills();
    },[billsOverview])

    const calculateBills = React.useCallback(() => {
            
        let totalPaidAmount: number = 0
        let totalUpcomingAmount: number = 0
        let totalDueAmount: number = 0
        
        let totalPaidCount: number = 0
        let totalUpcomingCount: number = 0
        let totalDueCount: number = 0

        billsOverview.map((bill) => {
            if(bill.bill_status === 'Payed') {
                totalPaidAmount = totalPaidAmount + bill.due_amount
                totalPaidCount += 1
            }
            else if(bill.bill_status === 'Due') {
                totalDueAmount = totalDueAmount + bill.due_amount
                totalUpcomingAmount = totalUpcomingAmount + bill.due_amount
                totalDueCount += 1
            }
            else if(bill.bill_status === 'Pending') {
                totalUpcomingAmount = totalUpcomingAmount + bill.due_amount
                totalUpcomingCount += 1
            }
        })


        const totalPaidRounded = parseFloat(totalPaidAmount.toFixed(2))
        const totalUpcomingRounded = parseFloat(totalUpcomingAmount.toFixed(2))
        const totalDueRounded = parseFloat(totalDueAmount.toFixed(2))
        const totalBillsAmount: number = parseFloat((totalUpcomingAmount + totalPaidAmount).toFixed(2))

        setPaidBillsTotal(totalPaidRounded)
        setUpcomingTotal(totalUpcomingRounded)
        setDueTotal(totalDueRounded)
        setTotalAmount(totalBillsAmount)

        setPaidBillsCount(totalPaidCount)
        setDueCount(totalDueCount)
        setUpcomingCount(totalUpcomingCount)

    }, [billsOverview])

  return (
    <BillsContext.Provider value={{ billsOverview, setBillsOverview, paidBillsTotal, setPaidBillsTotal, upcomingTotal, setUpcomingTotal, dueTotal, setDueTotal, totalAmount, setTotalAmount, paidBillsCount, dueCount, upcomingCount }}>
      {children}
    </BillsContext.Provider>
  );
};

// Hook for accessing user data
export const useBills = () => {
  const context = useContext(BillsContext);
  if (!context) throw new Error('useUser must be used within a BillsProvider');
  return context;
};
