'use client';

import { Box, Button, Container, FormControl, Grid2, Typography } from "@mui/material";
import {Public_Sans} from 'next/font/google';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from "react";

import Image from 'next/image'
import React from "react";

import { usePots } from "../components/Context/potsContext";
import AddPotsModal from '../components/Modals/addPotsModal'

const public_sans = Public_Sans({
    subsets: ['latin'],
    weight: ['400'],
    display: 'swap',

})

export default function BillsLayout() {

    const {getPots} = usePots()
    const [showAddPotsModal, setShowAddPotsModal] = React.useState<boolean>(false);

    const toggleAddPotsModal = () => {
        setShowAddPotsModal(!showAddPotsModal)
    }

    console.log("Modal value: ", showAddPotsModal)

    return(
        <Box sx={{height: '100vh'}}>
            <AddPotsModal open={showAddPotsModal} onClose={toggleAddPotsModal}/>
            <Container maxWidth={'xl'}>
                <Box sx={{pt: '40px', display: 'flex', justifyContent: 'space-between'}}>
                    <Typography sx={{fontFamily: public_sans.style.fontFamily, fontSize: '34px', color: "#201F24", display: 'inline-block'}}><b>Pots</b></Typography>
                    <Button onClick={toggleAddPotsModal} sx={{width: '128px', fontSize: '14px', fontFamily: public_sans.style.fontFamily, textTransform: 'capitalize', backgroundColor: '#201F24', color: 'white', padding: '15px 5px', borderRadius: '10px'}}>
                        <b>+ Add New Pots</b>
                    </Button>
                </Box>
                <Grid2 sx={{mt: '40px'}} container spacing={2}>
                    
                    {getPots.map((pots, index) => {
                        return(
                            <Grid2 key={index} size={6}>
                                <Box sx={{height: '303px', background: 'white', padding: '25px'}}>
                                    <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                                        <Box>
                                            {/* The colored circle */}
                                            <Box sx={{display: 'inline-block', backgroundColor: pots.color, borderRadius: '50%', width: '15px', height: '15px', marginRight: '20px'}} />
                                            <Typography sx={{fontFamily: public_sans.style.fontFamily, fontSize: '20px', color: '#201F24', display: 'inline-block'}}><b>{pots.category_name}</b></Typography>
                                        </Box>
                                        <Box sx={{mt:'7px'}}>
                                            <Image alt='logo' src={'/images/icon-ellipsis.svg'} width={16} height={16}/>
                                        </Box>
                                    </Box>
                                    <Box sx={{display: 'flex', justifyContent: 'space-between', padding: '0px 100px', mt: '30px'}}>
                                        <Typography sx={{fontFamily: public_sans.style.fontFamily, fontSize: '12px', color: "#696868", display: 'inline-block', pt: '15px'}}>Total Saved</Typography>
                                        <Typography sx={{fontFamily: public_sans.style.fontFamily, fontSize: '32px', color: '#201F24', display: 'inline-block'}}><b>${parseFloat((pots.total_amount).toFixed(2))}</b></Typography>
                                    </Box>
                                    <Box sx={{textAlign: 'center'}}>
                                        <p><i>The bar graph will be here...</i></p>
                                    </Box>
                                    <Box sx={{display: 'flex', justifyContent: 'space-between', padding: '0px 100px', mt: '0px'}}>
                                        <Typography sx={{fontFamily: public_sans.style.fontFamily, fontSize: '12px', color: "#696868", display: 'inline-block', pt: '15px'}}><b>{parseFloat(((pots.total_amount/pots.target) * 100).toFixed(2))}%</b></Typography>
                                        <Typography sx={{fontFamily: public_sans.style.fontFamily, fontSize: '12px', color: "#696868", display: 'inline-block', pt: '15px'}}>Target of ${pots.target}</Typography>
                                    </Box>
                                    <Grid2 sx={{mt: '25px'}} container spacing={2}>
                                        <Grid2 size={6}>
                                            <Button sx={{height: '53px', width: '100%', backgroundColor: '#F8F4F0'}}>
                                                <Typography sx={{fontFamily: public_sans.style.fontFamily, fontSize: '12px', color: '#201F24', display: 'inline-block', textTransform: 'capitalize'}}><b>+ Add Money</b></Typography>
                                            </Button>
                                        </Grid2>
                                        <Grid2 size={6}>
                                            <Button sx={{height: '53px', width: '100%', backgroundColor: '#F8F4F0'}}>
                                                <Typography sx={{fontFamily: public_sans.style.fontFamily, fontSize: '12px', color: '#201F24', display: 'inline-block', textTransform: 'capitalize'}}><b>Withdraw</b></Typography>
                                            </Button>
                                        </Grid2>
                                    </Grid2>
                                </Box>
                            </Grid2>
                        )
                    })}
                    
                </Grid2>
            </Container>
        </Box>
    )
}