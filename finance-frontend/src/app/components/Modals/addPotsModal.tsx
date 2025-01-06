'use client';

import { Box, Button, Container, FormControl, Grid2, Typography } from "@mui/material";
import {Public_Sans} from 'next/font/google';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from "react";

import Image from 'next/image'
import React from "react";

import { usePots } from "../Context/potsContext";

const public_sans = Public_Sans({
    subsets: ['latin'],
    weight: ['400'],
    display: 'swap',

})

interface ModalProps {
    open: boolean;
    onClose: () => void;
}

export default function addPotsModal(props: ModalProps) {
    return (
        
        <Box sx={{display: props.open ? 'block' : 'none', position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', background: '#00000099', zIndex: '1'}}>
            <Box sx={{position: 'fixed', background: 'white', width: '560px', height: '512px', top: '49%', left: '55%', transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', borderRadius: '20px', zIndex: '1' }}>
                <Box sx={{padding: '35px', display: 'flex', justifyContent: 'space-between'}}>
                    
                    <Typography sx={{fontFamily: public_sans.style.fontFamily, fontSize: '34px', color: "#201F24", display: 'inline-block'}}><b>Add New Pot</b></Typography>
                    <Image onClick={props.onClose} style={{marginTop: '12px', cursor: 'pointer'}} alt='logo' src={'/images/icon-close-modal.svg'} width={30} height={30}/>
                </Box>
                <Button onClick={props.onClose}>
                    Close
                </Button>
            </Box>
        </Box>
    )
}