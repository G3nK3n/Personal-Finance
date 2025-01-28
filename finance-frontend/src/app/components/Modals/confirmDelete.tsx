import { Box, Button, Container, FormControl, Grid2, Typography } from "@mui/material";
import {Public_Sans} from 'next/font/google';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from "react";

import Image from 'next/image'
import React from "react";

//import { usePots } from "../components/Context/potsContext";
import { usePots } from "../Context/potsContext";

const public_sans = Public_Sans({
    subsets: ['latin'],
    weight: ['400'],
    display: 'swap',

})

interface Pots {
    pots_id: number;
    category_id: number;
    target: number;
    total_amount: number;
    color: string;
    category_name: string;
    color_name: string;
}

interface confirmDeleteProps {
    setConfirm: Function ;
    thePot: Pots | null;
}

const ConfirmDelete: React.FC<confirmDeleteProps> = ({setConfirm, thePot}) =>  {

    const {fetchPotsUpdate} = usePots();

    const deletePots = async () => {
        try{

            const res = await fetch('http://localhost:5000/deletePots', {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ pots_id: thePot?.pots_id, category_id: thePot?.category_id })
            });

            if(res.ok) {
                await fetchPotsUpdate();
                setConfirm(false)
            }
        } catch (error) {
            console.error("Network Error: ", error)  
        }
        console.log("The pots is: ", thePot)
    }


    return(
        <Box sx={{display: 'block', position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', background: '#0000001c', zIndex: '1'}}>
            <Box sx={{padding: '35px', position: 'fixed', background: 'white', width: '560px', height: '247px', top: '49%', left: '55%', transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', borderRadius: '20px', zIndex: '1' }}>
                <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <Typography sx={{fontFamily: public_sans.style.fontFamily, fontSize: '34px', color: "#201F24", display: 'inline-block'}}><b>Delete '{thePot?.category_name}?'</b></Typography>
                    <Image onClick={() => setConfirm(false)} style={{marginTop: '12px', cursor: 'pointer'}} alt='logo' src={'/images/icon-close-modal.svg'} width={30} height={30}/> 
                </Box>

                <Box>
                    <Typography sx={{fontFamily: public_sans.style.fontFamily, fontSize: '12px', color: "#696868", display: 'inline-block', pt: '15px'}}>Are you sure you want to delete this pot? This action cannot be reversed, and all the data inside it will be removed forever.</Typography>
                </Box>

                <Button onClick={deletePots} sx={{background: '#C94736', color: 'white', height: '53px', mt: '20px', fontFamily: public_sans.style.fontFamily, textTransform: 'capitalize'}}>
                    <b>Confirm Delete</b>
                </Button>
            </Box>
        </Box>
    )

}

export default ConfirmDelete;