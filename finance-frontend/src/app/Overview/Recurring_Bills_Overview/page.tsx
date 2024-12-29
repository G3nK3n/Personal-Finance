'use client'

import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";
import {Public_Sans} from 'next/font/google';
import React from "react";
import { useBills } from "../../components/Context/billsContext"

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

    const {paidBillsTotal, upcomingTotal, dueTotal} = useBills();

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