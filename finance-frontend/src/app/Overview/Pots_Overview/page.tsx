'use client';

import { Box, Container, Stack, Typography } from "@mui/material";

import Image from "next/image";

import {Public_Sans} from 'next/font/google';
import { useEffect, useState } from "react";

const public_sans = Public_Sans({
    subsets: ['latin'],
    weight: ['400'],
    display: 'swap',
  
  })

interface PotsOverview {
    pots_id: number,
    category_id: number,
    target: number,
    total_amount: number,
    color: string,
    category_name: string,
    total_sum: number
}

export default function Pots_Overview() {

    const [potsOverview, setPotsOverview] = useState<PotsOverview[]>([])

    useEffect(() => {
        // Fetch data from the Node.js API when the component mounts
        const fetchPotsOverview = async () => {
          const res = await fetch('http://localhost:5000/getOverviewPots');
          const data = await res.json();
          setPotsOverview(data);
        };
    
        fetchPotsOverview();
      }, []);


    return (
        <Box>
            {/* THE HEADER */}
            <Box>
                <Box sx={{display: 'inline-block'}}>
                    <Typography sx={{fontFamily: public_sans.style.fontFamily, fontSize: '20px', color: "#201F24", display: 'inline-block'}}><b>Pots</b></Typography>
                </Box>
                <Box sx={{float: 'right', display: 'inline-block',cursor: 'pointer',backgroundColor: 'background.secondary'}}>
                    <Typography sx={{marginRight: '10px', marginTop:'5px',display: 'inline-block',fontFamily: public_sans.style.fontFamily, fontSize: '16px', marginBottom: '0px', color: '#696868'}}>See Details</Typography> 
                    <Image style={{paddingTop: '1px'}} alt='right_arrow' src={'/images/icon-caret-right.svg'} width={12} height={12}/>
                </Box>
            </Box>
            {/* THE BODY */}
            <Box>
                <Stack direction={'row'}>
                    
                    <Box sx={{backgroundColor: '#F8F4F0', width: '247px', height: '110px', padding: '11px 15px 11px 15px', mt: '25px',  borderRadius: '20px'}}>
                        <Box sx={{display: 'inline-block', mb: '5px'}}>
                            <Image style={{paddingTop: '1px'}} alt='pots_icon' src={'/images/icon-pot.svg'} width={40} height={40}/>
                        </Box>
                        <Box sx={{display: 'inline-block', ml: '20px'}}>
                            <Typography sx={{marginRight: '10px', marginTop:'5px',display: 'inline-block',fontFamily: public_sans.style.fontFamily, fontSize: '16px', marginBottom: '0px', color: '#696868'}}>Total Saved</Typography>
                            <Typography variant="h1" sx={{fontFamily: public_sans.style.fontFamily, fontSize: '32px', color: "#201F24", mt: '10px'}}><b>${(potsOverview[0]?.total_sum || potsOverview[0]?.total_sum !== 0 || potsOverview[0]?.total_sum === null) ? potsOverview[0]?.total_sum : 0}</b></Typography> 
                        </Box>
                    </Box>

                    <Box sx={{display: 'inline-block', mt: '25px'}}>
                        <Stack direction={'row'}>
                            <Box sx={{display: potsOverview[0] ? 'inline-block' : 'none', width: '140.5px', height: '43px', borderLeft: '5px solid', borderLeftColor: potsOverview[0]?.color, ml: '20px'}}>
                                <Typography sx={{ml: '20px', marginRight: '10px',display: 'inline-block',fontFamily: public_sans.style.fontFamily, fontSize: '14px', marginBottom: '0px', color: '#696868'}}>{potsOverview[0]?.category_name}</Typography>
                                <Typography variant="h1" sx={{ml: '20px', fontFamily: public_sans.style.fontFamily, fontSize: '14px', color: "#201F24", mt: '2px'}}><b>${potsOverview[0]?.total_amount}</b></Typography> 
                            </Box>
                            <Box sx={{display: potsOverview[1] ? 'inline-block' : 'none', width: '140.5px', height: '43px', borderLeft: '5px solid', borderLeftColor: potsOverview[1]?.color, ml: '20px'}}>
                                <Typography sx={{ml: '20px', marginRight: '10px', display: 'inline-block',fontFamily: public_sans.style.fontFamily, fontSize: '14px', marginBottom: '0px', color: '#696868'}}>{potsOverview[1]?.category_name}</Typography>
                                <Typography variant="h1" sx={{ml: '20px', fontFamily: public_sans.style.fontFamily, fontSize: '14px', color: "#201F24", mt: '2px'}}><b>${potsOverview[1]?.total_amount}</b></Typography> 
                            </Box>
                        </Stack>

                        <Stack sx={{mt: '20px'}} direction={'row'}>
                            <Box sx={{display: potsOverview[2] ? 'inline-block' : 'none', width: '140.5px', height: '43px', borderLeft: '5px solid', borderLeftColor: potsOverview[2]?.color, ml: '20px'}}>
                                <Typography sx={{ml: '20px', marginRight: '10px', display: 'inline-block',fontFamily: public_sans.style.fontFamily, fontSize: '14px', marginBottom: '0px', color: '#696868'}}>{potsOverview[2]?.category_name}</Typography>
                                <Typography variant="h1" sx={{ml: '20px', fontFamily: public_sans.style.fontFamily, fontSize: '14px', color: "#201F24", mt: '2px'}}><b>${potsOverview[2]?.total_amount}</b></Typography> 
                            </Box>
                            <Box sx={{display: potsOverview[3] ? 'inline-block' : 'none', width: '140.5px', height: '43px', borderLeft: '5px solid', borderLeftColor: potsOverview[3]?.color, ml: '20px'}}>
                                <Typography sx={{ml: '20px', marginRight: '10px', display: 'inline-block',fontFamily: public_sans.style.fontFamily, fontSize: '14px', marginBottom: '0px', color: '#696868'}}>{potsOverview[3]?.category_name}</Typography>
                                <Typography variant="h1" sx={{ml: '20px', fontFamily: public_sans.style.fontFamily, fontSize: '14px', color: "#201F24", mt: '2px'}}><b>${potsOverview[3]?.total_amount}</b></Typography> 
                            </Box>
                        </Stack>
                    </Box>
                    
                </Stack>

            </Box>
        </Box>
    );
  }