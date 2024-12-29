'use client';

import { Box, Container, Stack, Typography } from "@mui/material";
import {Public_Sans} from 'next/font/google';
import Image from 'next/image'
import { useBills } from "../components/Context/billsContext";

const public_sans = Public_Sans({
    subsets: ['latin'],
    weight: ['400'],
    display: 'swap',

})

export default function Bills() {
    const {totalAmount, paidBillsTotal, paidBillsCount, upcomingTotal, upcomingCount, dueTotal, dueCount} = useBills();

    return(
        <Box sx={{height: '100vh'}}>
            <Container maxWidth={'xl'}>
                <Box sx={{pt: '40px'}}>
                    <Typography sx={{fontFamily: public_sans.style.fontFamily, fontSize: '34px', color: "#201F24", display: 'inline-block'}}><b>Recurring Bills</b></Typography>
                </Box>
                <Stack sx={{mt: '30px'}} direction={'row'}>
                    <Stack direction={'column'}>
                        <Box sx={{backgroundColor: '#201F24', width: '337px', height: '190px', borderRadius: '20px'}}>
                            <Box sx={{padding: '20px', margin: '10px 0px 0px 10px'}}>
                                <Image alt='logo' src={'/images/icon-recurring-bills.svg'} width={35} height={35}/>
                            </Box>
                            <Box sx={{ml: '30px'}}>
                                <Typography sx={{fontFamily: public_sans.style.fontFamily, fontSize: '14px', color: "white", display: 'inline-block'}}>Total Bills</Typography>
                                <Typography variant="h1" sx={{fontFamily: public_sans.style.fontFamily, fontSize: '30px', color: "white", mt: '10px'}}><b>${totalAmount}</b></Typography>
                            </Box>
                        </Box>

                        <Box sx={{padding: '20px', width: '337px', backgroundColor: 'white', mt: '30px', borderRadius: '15px'}}>
                            <Typography sx={{fontFamily: public_sans.style.fontFamily, fontSize: '16px', color: "black", display: 'inline-block'}}><b>Summary</b></Typography>
                            <Box sx={{mt: '5px'}}>
                                {/* Display flex and justify content helps when aligning the items left and right */}
                                <Box sx={{display: 'flex', justifyContent: 'space-between', padding: '15px 0px', borderBottom: '1px solid rgba(105, 104, 104, 0.2)'}}>
                                    <Typography sx={{fontFamily: public_sans.style.fontFamily, fontSize: '12px', color: "#696868", display: 'inline-block'}}>Paid Bills</Typography>
                                    <Typography sx={{fontFamily: public_sans.style.fontFamily, fontSize: '12px', color: "black" }}><b>{paidBillsCount}(${paidBillsTotal})</b></Typography>                                   
                                </Box>
                                <Box sx={{display: 'flex', justifyContent: 'space-between', padding: '15px 0px', borderBottom: '1px solid rgba(105, 104, 104, 0.2)'}}>
                                    <Typography sx={{fontFamily: public_sans.style.fontFamily, fontSize: '12px', color: "#696868", display: 'inline-block'}}>Total Upcoming</Typography>
                                    <Typography sx={{fontFamily: public_sans.style.fontFamily, fontSize: '12px', color: "black" }}><b>{upcomingCount}(${upcomingTotal})</b></Typography>                                   
                                </Box>
                                <Box sx={{display: 'flex', justifyContent: 'space-between', padding: '15px 0px'}}>
                                    <Typography sx={{fontFamily: public_sans.style.fontFamily, fontSize: '12px', color: "#C94736", display: 'inline-block'}}>Due Soon</Typography>
                                    <Typography sx={{fontFamily: public_sans.style.fontFamily, fontSize: '12px', color: "#C94736" }}><b>{dueCount}(${dueTotal})</b></Typography>                                   
                                </Box>
                            </Box>
                        </Box>
                    </Stack>
                    <Box>
                        {/* Will be a new component */}
                        Test3
                    </Box>
                    
                </Stack>
            </Container>
        </Box>
    )
}