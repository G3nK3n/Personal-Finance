'use client';

import { Box, Container, FormControl, InputAdornment, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import {Public_Sans} from 'next/font/google';
import SearchIcon from '@mui/icons-material/Search';

const public_sans = Public_Sans({
    subsets: ['latin'],
    weight: ['400'],
    display: 'swap',

})

export default function BillsLayout() {
    return(
        <Box sx={{width: '699px', background: 'white', padding: '30px', borderRadius: '15px'}}>
                <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <TextField sx={{width: {xs: '100%', md: '280px', xl: '320px'}, height: '45px', backgroundColor: 'background.secondary', fontFamily: 'Nunito', mt: '0px'}} label="Search for country..." id="searchCountries"
                        InputProps={{endAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>)}} 
                        margin="normal" 
                    />
                    
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 200, marginTop: {xs: '40px', md: '10px', xl: '0px'}, marginBottom: '5px !important', backgroundColor: "background.secondary", color: "text.primary"}}>
                        <InputLabel sx={{color: "text.primary"}} id="demo-simple-select-standard-label">Sort by</InputLabel>  
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            // value={region}
                            // onChange={handleDropdownChange}
                            label="Region"
                            sx={{backgroundColor: "background.secondary", padding: '4px 0px'}} 
                        >
                            <MenuItem sx={{backgroundColor: "background.secondary"}} value={'Africa'}>Latest</MenuItem>
                            <MenuItem sx={{backgroundColor: "background.secondary"}} value={'Americas'}>Oldest</MenuItem>
                            <MenuItem sx={{backgroundColor: "background.secondary"}} value={'Asia'}>A to Z</MenuItem>
                            <MenuItem sx={{backgroundColor: "background.secondary"}} value={'Europe'}>Z to A</MenuItem>
                            <MenuItem sx={{backgroundColor: "background.secondary"}} value={'Oceania'}>Highest</MenuItem>
                            <MenuItem sx={{backgroundColor: "background.secondary"}} value={'Oceania'}>Lowest</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
        </Box>
    )
}