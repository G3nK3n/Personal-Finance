'use client'

import { Box, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import {Public_Sans} from 'next/font/google';
import { useEffect, useState } from "react";
import React from "react";


const public_sans = Public_Sans({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',

})

interface Bills {
    bill_id: number,
    bill_name: string,
    due_date: number,
    due_amount: number,
    bill_status: string,
}

export default function Recurring_Bills_Overview() {

    const [billsOverview, setBillsOverview] = useState<Bills[]>([])
    const [paidBillsTotal, setPaidBillsTotal] = useState<number>(0)
    const [upcomingTotal, setUpcomingTotal] = useState<number>(0)
    const [dueTotal, setDueTotal] = useState<number>(0)   
    
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
        
        billsOverview.map((bill, index) => {
            if(bill.bill_status === 'Payed') {
                totalPaidAmount = totalPaidAmount + bill.due_amount
            }
            else if(bill.bill_status === 'Due') {
                totalDueAmount = totalDueAmount + bill.due_amount
                totalUpcomingAmount = totalUpcomingAmount + bill.due_amount
            }
            else if(bill.bill_status === 'Pending') {
                totalUpcomingAmount = totalUpcomingAmount + bill.due_amount
            }
        })

        const totalPaidRounded = parseFloat(totalPaidAmount.toFixed(2))
        const totalUpcomingRounded = parseFloat(totalUpcomingAmount.toFixed(2))
        const totalDueRounded = parseFloat(totalDueAmount.toFixed(2))

        setPaidBillsTotal(totalPaidRounded)
        setUpcomingTotal(totalUpcomingRounded)
        setDueTotal(totalDueRounded)

    }, [billsOverview])

    return(
        <Box>
            {/* THE HEADER */}
            <Box>
                <Box sx={{display: 'inline-block'}}>
                    <Typography sx={{fontFamily: public_sans.style.fontFamily, fontSize: '20px', color: "#201F24", display: 'inline-block'}}><b>Recurring Bills</b></Typography>
                </Box>
                <Box sx={{float: 'right', display: 'inline-block',cursor: 'pointer',backgroundColor: 'background.secondary'}}>
                    <Typography sx={{marginRight: '10px', marginTop:'5px',display: 'inline-block',fontFamily: public_sans.style.fontFamily, fontSize: '16px', marginBottom: '0px', color: '#696868'}}>See details</Typography> 
                    <Image style={{paddingTop: '1px'}} alt='right_arrow' src={'/images/icon-caret-right.svg'} width={12} height={12}/>
                </Box>
            </Box>

            <Stack sx={{mt: '25px'}} direction={'column'}>
                <Box sx={{width: '399px', backgroundColor: '#F8F4F0', padding: '20px 20px', borderRadius: '15px', borderLeft: '5px solid #277C78', mb: '20px'}}>
                    <Typography sx={{marginRight: '10px', display: 'inline-block',fontFamily: public_sans.style.fontFamily, fontSize: '16px', marginBottom: '0px', color: '#696868'}}>Paid Bills</Typography> 
                    <Box sx={{display: 'inline-block', float: 'right'}}>
                        <Typography sx={{marginRight: '10px', display: 'inline-block',fontFamily: public_sans.style.fontFamily, fontSize: '16px', marginBottom: '0px', color: 'black'}}><b>${paidBillsTotal}</b></Typography> 
                    </Box>
                </Box>

                <Box sx={{width: '399px', backgroundColor: '#F8F4F0', padding: '20px 20px', borderRadius: '15px', borderLeft: '5px solid #F2CDAC', mb: '20px'}}>
                    <Typography sx={{marginRight: '10px', display: 'inline-block',fontFamily: public_sans.style.fontFamily, fontSize: '16px', marginBottom: '0px', color: '#696868'}}>Total Upcoming</Typography> 
                    <Box sx={{display: 'inline-block', float: 'right'}}>
                        <Typography sx={{marginRight: '10px', display: 'inline-block',fontFamily: public_sans.style.fontFamily, fontSize: '16px', marginBottom: '0px', color: 'black'}}><b>${upcomingTotal}</b></Typography> 
                    </Box>
                </Box>

                <Box sx={{width: '399px', backgroundColor: '#F8F4F0', padding: '20px 20px', borderRadius: '15px', borderLeft: '5px solid #82C9D7', mb: '20px'}}>
                    <Typography sx={{marginRight: '10px', display: 'inline-block',fontFamily: public_sans.style.fontFamily, fontSize: '16px', marginBottom: '0px', color: '#696868'}}>Due Soon</Typography> 
                    <Box sx={{display: 'inline-block', float: 'right'}}>
                        <Typography sx={{marginRight: '10px', display: 'inline-block',fontFamily: public_sans.style.fontFamily, fontSize: '16px', marginBottom: '0px', color: 'black'}}><b>${dueTotal}</b></Typography> 
                    </Box>
                </Box>
            </Stack>
        </Box>
    )
}