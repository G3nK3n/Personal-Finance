'use client'

import { Box, Container, Stack, Typography } from "@mui/material";

import {Public_Sans} from 'next/font/google';


import { useEffect, useState } from "react";

const public_sans = Public_Sans({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',

})

interface BalanceOverview {
    balance_id: number,
    user_id: number,
    balance: number,
    income: number,
    expense: number
}

export default function Balance_Overview() {

    const [balanceOverview, setBalanceOverview] = useState<BalanceOverview[]>([])

    useEffect(() => {
        // Fetch data from the Node.js API when the component mounts
        const fetchBalanceOverview = async () => {
          const res = await fetch('http://localhost:5000/getBalances');
          const data = await res.json();
          setBalanceOverview(data);
        };
    
        fetchBalanceOverview();
      }, []);

    return (
        // FOR NOW, SET THE STATE FOR FIRST USER IN DATABASE
      <Box>
          
            <Box sx={{marginTop: '45px'}}>
                <Typography variant="h1" sx={{fontFamily: public_sans.style.fontFamily, fontSize: '32px', color: "#201F24"}}><b>Overview</b></Typography>
            </Box> 
            <Box sx={{marginTop: '45px'}}>
              {['Current Balance', 'Income', 'Expenses'].map((text, index) => {
                if(index === 0) {
                  return(
                    <Box key={index} sx={{backgroundColor: '#201F24', display: 'inline-block', width: '337px', padding: '30px', mr: '158px', borderRadius: '20px'}}>
                      {/* Temporary data until backend from database */}
                      <Typography sx={{fontFamily: public_sans.style.fontFamily, fontSize: '12px', color: "white"}}>{text}</Typography>
                      <Typography variant="h1" sx={{fontFamily: public_sans.style.fontFamily, fontSize: '32px', color: "white", mt: '10px'}}><b>${balanceOverview[0]?.balance.toFixed(2)}</b></Typography>
                    </Box>
                  )
                }
                else if(index === 1){
                  return(
                    <Box key={index} sx={{backgroundColor: 'white', display: 'inline-block', width: '337px', padding: '30px', mr: '158px', borderRadius: '20px'}}>
                      {/* Temporary data until backend from database */}
                      <Typography sx={{fontFamily: public_sans.style.fontFamily, fontSize: '12px', color: "#696868"}}>{text}</Typography>
                      <Typography variant="h1" sx={{fontFamily: public_sans.style.fontFamily, fontSize: '32px', color: "#201F24", mt: '10px'}}><b>${balanceOverview[0]?.income?.toFixed(2)}</b></Typography>
                    </Box>
                  )
                }
                else {
                  return(
                    <Box key={index} sx={{backgroundColor: 'white', display: 'inline-block', width: '337px', padding: '30px', mr: '158px', borderRadius: '20px'}}>
                      {/* Temporary data until backend from database */}
                      <Typography sx={{fontFamily: public_sans.style.fontFamily, fontSize: '12px', color: "#696868"}}>{text}</Typography>
                      <Typography variant="h1" sx={{fontFamily: public_sans.style.fontFamily, fontSize: '32px', color: "#201F24", mt: '10px'}}><b>${balanceOverview[0]?.expense?.toFixed(2)}</b></Typography>
                    </Box>
                  )
                }
              })}
            </Box>
            
      </Box>
    );
  }