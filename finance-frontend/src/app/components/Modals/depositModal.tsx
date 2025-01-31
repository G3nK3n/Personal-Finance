'use client';

import { Box, Button, Container, FormControl, Grid2, InputAdornment, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import {Public_Sans} from 'next/font/google';
import SearchIcon from '@mui/icons-material/Search';
import DollarSign from '@mui/icons-material/AttachMoney'
import { useEffect, useState } from "react";

import Image from 'next/image'
import React from "react";

import { usePots } from "../Context/potsContext";

const public_sans = Public_Sans({
    subsets: ['latin'],
    weight: ['400'],
    display: 'swap',

})

interface Pots {
    pots_id: number,
    category_id: number,
    target: number,
    total_amount: number,
    color: string,
    category_name: string,
    color_name: string
}


interface DepositModalProps {
    open: boolean; 
    onClose: () => void;
    thePot?: Pots | null;
}


export default function depositModal(props: DepositModalProps) {

    const {fetchPotsUpdate} = usePots();

    const [depositAmount, setDepositAmount] = React.useState<number>(0)
    const [depositAmountError, setDepositAmountError] = React.useState<string>('')

    const handleDepost = React.useCallback((e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setDepositAmount(Number(e.target.value))
    }, [depositAmount])

    const depositMoney = async () => {
        try{

            if(depositAmount <= 0) {
                setDepositAmountError('Negative numbers are not allowed')
                return;
            }

            const res = await fetch('http://localhost:5000/withdrawMoney', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ total_amount: depositAmount + Number(props.thePot?.total_amount), pots_id: props.thePot?.pots_id })
            });

            if(res.ok) {
                await fetchPotsUpdate();
                setDepositAmountError('')
                props.onClose()
            }
        } catch (error) {
            console.error("Network Error: ", error)
        }
    }

    //This sets the amount to 0 when closing the modal
    const handleClose = () => {
        setDepositAmount(0)
        props.onClose();
    };

    //Added key={props.open ? "open" : "closed"} because  the component is effectively being re-rendered as a "new" component each time. This resets the state because React will discard the old component's state on re-mount.
    return(
        <Box key={props.open ? "open" : "closed"} sx={{display: props.open ? 'block' : 'none', position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', background: '#0000001c', zIndex: '1'}}>
            <Box sx={{padding: '35px', position: 'fixed', background: 'white', width: '560px', height: '457px', top: '49%', left: '55%', transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', borderRadius: '20px', zIndex: '1' }}>
                <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <Typography sx={{fontFamily: public_sans.style.fontFamily, fontSize: '34px', color: "#201F24", display: 'inline-block'}}><b>Deposit to '{props.thePot?.category_name}'</b></Typography>
                    <Image onClick={handleClose} style={{marginTop: '12px', cursor: 'pointer'}} alt='logo' src={'/images/icon-close-modal.svg'} width={30} height={30}/> 
                    {/* Use () => props.onClose() to make sure the close works, since it will return null after closing  */}
                </Box>
                
                <Box>
                    <Typography sx={{fontFamily: public_sans.style.fontFamily, fontSize: '12px', color: "#696868", display: 'inline-block', pt: '15px'}}>Would you like to deposit to {props.thePot?.category_name} account?</Typography>
                </Box>
                
                <Box sx={{display: 'flex', justifyContent: 'space-between', mt: '30px'}}>
                    <Typography sx={{fontFamily: public_sans.style.fontFamily, fontSize: '12px', color: "#696868", display: 'inline-block', pt: '15px'}}>New Amount</Typography>
                    <Typography sx={{fontFamily: public_sans.style.fontFamily, fontSize: '32px', color: '#201F24', display: 'inline-block'}}><b>${parseFloat(Number(props.thePot?.total_amount).toFixed(2))}</b></Typography>
                </Box>
                <Box sx={{textAlign: 'center'}}>
                    <p><i>The bar graph will be here...</i></p>
                </Box>
                <Box sx={{display: 'flex', justifyContent: 'space-between', mt: '0px'}}>
                    <Typography sx={{fontFamily: public_sans.style.fontFamily, fontSize: '12px', color: "#696868", display: 'inline-block', pt: '15px'}}><b>{parseFloat(((Number(props.thePot?.total_amount)/Number(props.thePot?.target)) * 100).toFixed(2))}%</b></Typography>
                    <Typography sx={{fontFamily: public_sans.style.fontFamily, fontSize: '12px', color: "#696868", display: 'inline-block', pt: '15px'}}>Target of ${props.thePot?.target ?? 'N/A'}</Typography>
                </Box>
                
                <TextField 
                        slotProps={{
                            input: {
                                style: {
                                    borderRadius: '15px',
                                    height: '55px',
                                },
                                endAdornment: (<InputAdornment position="end" ><DollarSign /></InputAdornment>),
                                inputMode: 'numeric'
                            }
                        }} 
                        sx={{width: '100%', fontFamily: 'Nunito', mt: '30px'}} 
                        label="Amount to Deposit" 
                        id="potName"
                        margin="normal"
                        size={'medium'}
                        type="number"
                        defaultValue={depositAmount}
                        onChange={handleDepost}
                />
                <Typography sx={{fontFamily: public_sans.style.fontFamily, fontSize: '12px', color: 'red'}}>{depositAmountError}</Typography>

                <Button onClick={depositMoney} sx={{background: 'black', color: 'white', height: '53px', mt: '20px', fontFamily: public_sans.style.fontFamily, textTransform: 'capitalize'}}>
                    <b>Confirm Deposit</b>
                </Button>
            </Box>
        </Box>
    )
}