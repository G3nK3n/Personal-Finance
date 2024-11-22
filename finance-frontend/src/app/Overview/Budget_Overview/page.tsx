//USING Recharts API for charts!
'use client';

import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { Public_Sans } from 'next/font/google';
import Budget_Overview_Piechart from "./Budget_Overview_Piechart/page";
import { useEffect, useState } from "react";


const public_sans = Public_Sans({
    subsets: ['latin'],
    weight: ['400'],
    display: 'swap',
  
})

interface BudgetOverview {
    budget_id: number,
    category_name: string,
    max_amount: number,
    spent: number,
    remaining: number,
    color: string,
}


export default function Budget_Overview() {

    const [budgetOverview, setBudgetOverview] = useState<BudgetOverview[]>([])
    const [maxAmountTotal, setMaxAmountTotal] = useState<number>(0)
    const [spentTotal, setSpentTotal] = useState<number>(0)

    useEffect(() => {
        // Fetch data from the Node.js API when the component mounts
        const fetchPotsOverview = async () => {
          const res = await fetch('http://localhost:5000/getBudgetOverview');
          const data = await res.json();
          setBudgetOverview(data);
        };
    
        fetchPotsOverview();
        
      }, []);

    useEffect(() => {
        calculationAmounts();
    }, [budgetOverview])

    const calculationAmounts = React.useCallback(() => {
        
        let totalMaxAmount: number = 0
        let totalSpentAmount: number = 0
        
        budgetOverview.map((budget) => {
            totalSpentAmount = totalSpentAmount + budget?.spent
            totalMaxAmount = totalMaxAmount + budget?.max_amount
        })

        setMaxAmountTotal(totalMaxAmount)
        setSpentTotal(totalSpentAmount)
    }, [budgetOverview])
    
    return(
        <Box>
            {/* THE HEADER */}
            <Box>
                <Box sx={{display: 'inline-block'}}>
                    <Typography sx={{fontFamily: public_sans.style.fontFamily, fontSize: '20px', color: "#201F24", display: 'inline-block'}}><b>Budget</b></Typography>
                </Box>
                <Box sx={{float: 'right', display: 'inline-block',cursor: 'pointer',backgroundColor: 'background.secondary'}}>
                    <Typography sx={{marginRight: '10px', marginTop:'5px',display: 'inline-block',fontFamily: public_sans.style.fontFamily, fontSize: '16px', marginBottom: '0px', color: '#696868'}}>See details</Typography> 
                    <Image style={{paddingTop: '1px'}} alt='right_arrow' src={'/images/icon-caret-right.svg'} width={12} height={12}/>
                </Box>
            </Box>
            {/* THE BODY */}
            <Stack direction={'row'}>
                <Box sx={{marginTop: '30px'}}>
                    <Budget_Overview_Piechart budgetOverview={budgetOverview} />
                    <Box sx={{textAlign: 'center'}}>
                        <Typography sx={{marginRight: '10px', marginTop:'5px',display: 'inline-block',fontFamily: public_sans.style.fontFamily, fontSize: '22px', marginBottom: '0px', color: 'black'}}><b>${spentTotal} of ${maxAmountTotal} limit</b></Typography> 
                    </Box>
                </Box>
                
                <Stack sx={{ml: '40px', mt: '30px'}} direction={'column'}>
                    
                {budgetOverview ? 
                            budgetOverview.map((budget, index) => {
                                return (
                                    <Box key={index} sx={{display: budget ? 'inline-block' : 'none', width: '130.5px', height: '43px', borderLeft: '5px solid ' + budget?.color, ml: '20px', mb: '10px'}}>
                                        <Typography sx={{ml: '15px', marginRight: '10px',display: 'inline-block',fontFamily: public_sans.style.fontFamily, fontSize: '14px', marginBottom: '0px', color: '#696868'}}>{budget.category_name}</Typography>
                                        <Typography variant="h1" sx={{ml: '15px', fontFamily: public_sans.style.fontFamily, fontSize: '14px', color: "#201F24", mt: '2px'}}><b>${budget.max_amount}</b></Typography> 
                                    </Box>
                                )
                            })
                            :
                            <Box>No Transactions</Box>
                    }
                </Stack>
                
            
            </Stack>
        </Box>
    )
}