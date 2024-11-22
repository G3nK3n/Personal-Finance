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

interface TransactionsOverview {
    transaction_id: number,
    name: string,
    category_name: string,
    avatar_path: string,
    transaction_date: Date,
    transaction_amount: number,
    transaction_type: string
}


export default function Transaction_Overview() {

    const [transactionOverview, setTransactionOverview] = useState<TransactionsOverview[]>([])

    useEffect(() => {
        // Fetch data from the Node.js API when the component mounts
        const fetchTransactionOverview = async () => {
          const res = await fetch('http://localhost:5000/getTransactionOverview');
          const data = await res.json();
          setTransactionOverview(data);
        };
    
        fetchTransactionOverview();
      }, []);
      
    return(
        <Box>
            {/* THE HEADER */}
            <Box>
                <Box sx={{display: 'inline-block'}}>
                    <Typography sx={{fontFamily: public_sans.style.fontFamily, fontSize: '20px', color: "#201F24", display: 'inline-block'}}><b>Transaction</b></Typography>
                </Box>
                <Box sx={{float: 'right', display: 'inline-block',cursor: 'pointer',backgroundColor: 'background.secondary'}}>
                    <Typography sx={{marginRight: '10px', marginTop:'5px',display: 'inline-block',fontFamily: public_sans.style.fontFamily, fontSize: '16px', marginBottom: '0px', color: '#696868'}}>View All</Typography> 
                    <Image style={{paddingTop: '1px'}} alt='right_arrow' src={'/images/icon-caret-right.svg'} width={12} height={12}/>
                </Box>
            </Box>
            {/* THE BODY */}

            <Box>
                {/* For layout */}
                <Box sx={{width: '544px', mt: '30px'}}>
                    {/* Transaction Data */}

                    {transactionOverview ? 
                            transactionOverview.map((transactions, index) => {
                                return (
                                    <Box key={index}>
                                        <Stack direction={'row'}>
                                            <Box sx={{width: '474px'}}>
                                                <Box sx={{marginTop: '6px'}}>
                                                    <Image style={{paddingTop: '1px', float: 'left', borderRadius: '20px'}} alt='right_arrow' src={transactions.avatar_path} width={40} height={40}/>
                                                    <Box sx={{display: 'inline-block', marginTop: '8px', ml: '20px'}}>
                                                        <Typography sx={{verticalAlign: 'middle',display: 'inline-block',fontFamily: public_sans.style.fontFamily, fontSize: '16px', color: 'black'}}><b>{transactions.name}</b></Typography>
                                                    </Box>
                                                </Box>
                                            </Box>

                                            <Box sx={{width: '87px', textAlign: 'right'}}>
                                                <Typography sx={{marginRight: '10px', marginTop:'5px',display: 'inline-block',fontFamily: public_sans.style.fontFamily, fontSize: '14px', marginBottom: '0px', color: transactions.transaction_type === "Received" ? '#277C78' : 'black'}}><b>{transactions.transaction_type === 'Received' ? '+$' + transactions.transaction_amount : '-$' + transactions.transaction_amount}</b></Typography>
                                                <Typography sx={{marginRight: '10px', marginTop:'5px',display: 'inline-block',fontFamily: public_sans.style.fontFamily, fontSize: '14px', marginBottom: '0px', color: '#696868'}}>{transactions.transaction_date ? new Date(transactions.transaction_date).toLocaleDateString() : 'N/A'}</Typography> 
                                            </Box>
                                        </Stack>
                                        <hr style={{marginTop: '20px', marginBottom: '20px', opacity: '0.2'}} className="solid" />
                                    </Box>
                                )
                            })
                            :
                            <Box>No Transactions</Box>
                    }
                    
                </Box>
            </Box>
        </Box>
    )
}

