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
        
        <Box sx={{display: props.open ? 'block' : 'none'}}>
            <Box>
                <p>This is the modal</p>
            </Box>
            <Button onClick={props.onClose}>
                Close
            </Button>
        </Box>
    )
}