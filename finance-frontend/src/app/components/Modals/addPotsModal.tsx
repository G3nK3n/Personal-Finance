'use client';

import { Box, Button, Container, FormControl, Grid2, InputAdornment, TextField, Typography } from "@mui/material";
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

interface ModalProps {
    open: boolean;
    onClose: () => void;
}

export default function addPotsModal(props: ModalProps) {

    const [potName, setPotName] = React.useState<string>('')
    const [potNameMaxCharacters, setPotNameMaxCharacters] = React.useState<number>(30)
    const [potTarget, setPotTarget] = React.useState<number>(0)

    const handlePotNameChange = React.useCallback((e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setPotName(e.target.value)
    }, [potName])

    const handlePotTargetChange = React.useCallback((e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setPotTarget(Number(e.target.value))
    }, [potTarget])

    useEffect(() => {
        const potNameMaxLength: number = 30
        setPotNameMaxCharacters(potNameMaxLength - potName.length)
    }, [potName])

    return (
        
        <Box sx={{display: props.open ? 'block' : 'none', position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', background: '#00000099', zIndex: '1'}}>
            <Box sx={{padding: '35px', position: 'fixed', background: 'white', width: '560px', height: '512px', top: '49%', left: '55%', transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', borderRadius: '20px', zIndex: '1' }}>
                
                <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <Typography sx={{fontFamily: public_sans.style.fontFamily, fontSize: '34px', color: "#201F24", display: 'inline-block'}}><b>Add New Pot</b></Typography>
                    <Image onClick={props.onClose} style={{marginTop: '12px', cursor: 'pointer'}} alt='logo' src={'/images/icon-close-modal.svg'} width={30} height={30}/>
                </Box>
                
                <Box>
                    <Typography sx={{fontFamily: public_sans.style.fontFamily, fontSize: '12px', color: "#696868", display: 'inline-block', pt: '15px'}}>Create a pot to set savings target. These can help keep you on track as you save for special purchases</Typography>
                </Box>
                
                <Box>
                    <TextField 
                        slotProps={{
                            input: {
                                style: {
                                    borderRadius: '15px',
                                    height: '55px',
                                }
                            }
                        }} 
                        sx={{width: '100%', fontFamily: 'Nunito', mt: '30px'}} 
                        label="Pot Name" 
                        id="potName"
                        margin="normal"
                        size={'medium'}
                        onChange={handlePotNameChange}
                    />
                    <Typography sx={{fontFamily: public_sans.style.fontFamily, fontSize: '12px', color: potNameMaxCharacters < 0 ? 'red' : "#696868", textAlign: 'right', fontWeight: potNameMaxCharacters < 0 ? 'bold' : "none"}}>{potNameMaxCharacters} Characters</Typography>
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
                        label="Target" 
                        id="potName"
                        margin="normal"
                        size={'medium'}
                        type="number"
                        onChange={handlePotTargetChange}
                    />
                </Box>
                
                <Button onClick={props.onClose}>
                    Close
                </Button>
            </Box>
        </Box>
    )
}