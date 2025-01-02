'use client';

import { Box, Button, Container, FormControl, InputAdornment, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField, Typography } from "@mui/material";
import {Public_Sans} from 'next/font/google';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from "react";

import Image from 'next/image'
import React from "react";

const public_sans = Public_Sans({
    subsets: ['latin'],
    weight: ['400'],
    display: 'swap',

})

export default function BillsLayout() {
    return(
        <Box sx={{height: '100vh'}}>
            <Container maxWidth={'xl'}>
                <Box sx={{pt: '40px', display: 'flex', justifyContent: 'space-between'}}>
                    <Typography sx={{fontFamily: public_sans.style.fontFamily, fontSize: '34px', color: "#201F24", display: 'inline-block'}}><b>Pots</b></Typography>
                    <Button sx={{width: '128px', fontSize: '14px', fontFamily: public_sans.style.fontFamily, textTransform: 'capitalize', backgroundColor: '#201F24', color: 'white', padding: '15px 5px', borderRadius: '10px'}}>
                        <b>+ Add New Pots</b>
                    </Button>
                </Box>
            </Container>
        </Box>
    )
}