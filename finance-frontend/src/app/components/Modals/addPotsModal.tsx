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

interface ModalProps {
    open: boolean;
    onClose: () => void;
}

export default function addPotsModal(props: ModalProps) {

    const {getPots, getListOfColors} = usePots();

    const [potName, setPotName] = React.useState<string>('')
    const [potNameMaxCharacters, setPotNameMaxCharacters] = React.useState<number>(30)
    const [potTarget, setPotTarget] = React.useState<number>(0)
    const [dropDownValue, setDropDownValue] = React.useState<string>('')

    const handlePotNameChange = React.useCallback((e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setPotName(e.target.value)
    }, [potName])

    useEffect(() => {
        const potNameMaxLength: number = 30
        setPotNameMaxCharacters(potNameMaxLength - potName.length)
    }, [potName])

    const handlePotTargetChange = React.useCallback((e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setPotTarget(Number(e.target.value))
    }, [potTarget])

    const handleDropdownChange = React.useCallback((event: SelectChangeEvent) => {
        setDropDownValue(event.target.value);
    }, [dropDownValue]);

    const checkIfColorIsTaken = React.useCallback((theColor: string) => {
        let isColorTaken = false

        if(getPots.find(pots => pots.color === theColor)) {
            isColorTaken = true
        }
        else {
            isColorTaken = false
        }
        return isColorTaken

    }, [getListOfColors])



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
                    <FormControl variant="standard" sx={{ m: 1, marginTop: '10px', marginBottom: '5px !important', backgroundColor: "background.secondary", color: "text.primary", width: '100%', overflow: 'visible'}}>
                        <InputLabel sx={{color: "text.primary"}} id="demo-simple-select-standard-label">Color</InputLabel>  
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={dropDownValue}
                            onChange={handleDropdownChange}
                            label="Region"
                            sx={{backgroundColor: "background.secondary", padding: '4px 0px'}} 
                            MenuProps={{
                                disableScrollLock: false,
                                PaperProps: {
                                    style: {
                                        maxHeight: 200, // Set a max height
                                        overflowY: 'auto', // Ensure it scrolls when content exceeds maxHeight
                                    },
                                },
                            }}
                        >

                            {getListOfColors ? 
                                getListOfColors.map((color, index) => {
                                    return(<MenuItem key={index} sx={{backgroundColor: "background.secondary"}} disabled={checkIfColorIsTaken(color.color)} value={color.color_name}><Box sx={{display: 'inline-block', backgroundColor: color.color, borderRadius: '50%', width: '15px', height: '15px', marginRight: '20px'}} /><Box display={'inline-block'}><p>{color.color_name}</p></Box></MenuItem>)
                                })
                                :
                                <MenuItem sx={{backgroundColor: "background.secondary"}}>List is empty</MenuItem>
                            }


                            

                        </Select>
                    </FormControl>
                </Box>
                
                <Button sx={{background: 'black', color: 'white', height: '53px', mt: '20px', fontFamily: public_sans.style.fontFamily, textTransform: 'capitalize'}}>
                    <b>Add Pot</b>
                </Button>
            </Box>
        </Box>
    )
}