'use client';

import { Box, Container, FormControl, InputAdornment, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField, Typography } from "@mui/material";
import {Public_Sans} from 'next/font/google';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from "react";

import { useBills } from "../../components/Context/billsContext";
import Image from 'next/image'
import React from "react";

const public_sans = Public_Sans({
    subsets: ['latin'],
    weight: ['400'],
    display: 'swap',

})

interface Bills {
    bill_id: number,
    bill_name: string,
    due_date: number,
    due_amount: number,
    bill_status: string,
}

export default function BillsLayout() {


    const {billsOverview} = useBills();
    const [sortValue, setSortValue] = useState<string>('Latest')
    const [searchBill, setSearchBill] = useState<string>('')
    const [filteredBills, setFilteredBills] = useState<Bills[]>([])

    const handleDropdownChange = (event: SelectChangeEvent) => {
        setSortValue(event.target.value);
    };

    const handleSearch = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setSearchBill(e.target.value);
    };


    //This sorts by the value of the dropdown
    useEffect(() => {
    
        if(sortValue === 'Latest') {
            setFilteredBills(billsOverview.filter((bills: Bills) => String(bills.bill_name).toLowerCase().includes(String(searchBill).toLowerCase())).sort((a, b) => b.bill_id - a.bill_id))
        }
        else if(sortValue === 'Oldest') {
            setFilteredBills(billsOverview.filter((bills: Bills) => String(bills.bill_name).toLowerCase().includes(String(searchBill).toLowerCase())).sort((a, b) => a.bill_id - b.bill_id))
        }
        else if(sortValue === 'A to Z') {
            setFilteredBills(billsOverview.filter((bills: Bills) => String(bills.bill_name).toLowerCase().includes(String(searchBill).toLowerCase())).sort((a, b) => a.bill_name.localeCompare(b.bill_name)))
        }
        else if(sortValue === 'Z to A') {
            setFilteredBills(billsOverview.filter((bills: Bills) => String(bills.bill_name).toLowerCase().includes(String(searchBill).toLowerCase())).sort((a, b) => b.bill_name.localeCompare(a.bill_name)))
        }
        else if(sortValue === 'Highest') {
            setFilteredBills(billsOverview.filter((bills: Bills) => String(bills.bill_name).toLowerCase().includes(String(searchBill).toLowerCase())).sort((a, b) => b.due_amount - a.due_amount))
        }
        else if(sortValue === 'Lowest') {
            setFilteredBills(billsOverview.filter((bills: Bills) => String(bills.bill_name).toLowerCase().includes(String(searchBill).toLowerCase())).sort((a, b) => a.due_amount - b.due_amount))
        }

    }, [sortValue, searchBill, billsOverview])

    //Changes to checkmark or exclamation point depending on bill status
    const checkStatus = (billStatus: string) => {
        
        let status: string | null = null
        
        if(billStatus === 'Due') {
            status = '/images/icon-bill-due.svg';
        }
        else if(billStatus === 'Payed') {
            status = '/images/icon-bill-paid.svg';
        }
        
        return status;

    }

    
    //Changes the color to green or red depending on bill status
    const checkColorStatus = (billStatus: string) => {
        let colors: string | null = '#201F24'
        
        if(billStatus === 'Due') {
            colors = '#C94736';
        }
        else if(billStatus === 'Payed') {
            colors = '#277C78';
        }
        
        return colors;
    }


    return(
        <Box sx={{width: '1000px', background: 'white', padding: '30px', borderRadius: '15px'}}>
                <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <TextField sx={{width: {xs: '100%', md: '280px', xl: '320px'}, height: '45px', backgroundColor: 'background.secondary', fontFamily: 'Nunito', mt: '0px'}} label="Search Bills" id="searchCountries"
                        InputProps={{endAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>)}} 
                        margin="normal"
                        onChange={handleSearch}
                    />
                    
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 200, marginTop: {xs: '40px', md: '10px', xl: '0px'}, marginBottom: '5px !important', backgroundColor: "background.secondary", color: "text.primary"}}>
                        <InputLabel sx={{color: "text.primary"}} id="demo-simple-select-standard-label">Sort by</InputLabel>  
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={sortValue}
                            onChange={handleDropdownChange}
                            label="Region"
                            sx={{backgroundColor: "background.secondary", padding: '4px 0px'}} 
                        >
                            <MenuItem sx={{backgroundColor: "background.secondary"}} value={'Latest'}>Latest</MenuItem>
                            <MenuItem sx={{backgroundColor: "background.secondary"}} value={'Oldest'}>Oldest</MenuItem>
                            <MenuItem sx={{backgroundColor: "background.secondary"}} value={'A to Z'}>A to Z</MenuItem>
                            <MenuItem sx={{backgroundColor: "background.secondary"}} value={'Z to A'}>Z to A</MenuItem>
                            <MenuItem sx={{backgroundColor: "background.secondary"}} value={'Highest'}>Highest</MenuItem>
                            <MenuItem sx={{backgroundColor: "background.secondary"}} value={'Lowest'}>Lowest</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <Box sx={{mt: '25px', padding: '20px'}}>
                    <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                        <Typography sx={{fontFamily: public_sans.style.fontFamily, fontSize: '12px', color: "#696868", display: 'inline-block'}}>Bill Title</Typography>
                        <Typography sx={{fontFamily: public_sans.style.fontFamily, fontSize: '12px', color: "#696868", display: 'inline-block', ml: '148px'}}>Due Date</Typography>
                        <Typography sx={{fontFamily: public_sans.style.fontFamily, fontSize: '12px', color: "#696868", display: 'inline-block'}}>Amount</Typography>
                    </Box>

                    {filteredBills ? 
                        filteredBills.map((bills, index) => {
                            const statusIcon = checkStatus(bills.bill_status)
                            const statusColor = checkColorStatus(bills.bill_status)
                            return(
                                <Box key={index}>
                                    <hr style={{marginTop: '20px', marginBottom: '20px', opacity: '0.2'}} className="solid" />
                                    <Box  sx={{display: 'flex', justifyContent: 'space-between'}}>
                                        <Box sx={{width: '319px'}}>
                                            <Typography sx={{fontFamily: public_sans.style.fontFamily, fontSize: '16px', color: "black", display: 'inline-block'}}><b>{bills.bill_name}</b></Typography>
                                        </Box>
                                        <Box sx={{width: '120px'}}>
                                            <Typography sx={{fontFamily: public_sans.style.fontFamily, fontSize: '12px', color: statusColor, display: 'inline-block'}}>
                                                Monthly-{bills.due_date} {statusIcon ? <Image style={{marginLeft: '5px'}} alt='checkmark' src={statusIcon} width={12} height={12}/> : null}
                                            </Typography>
                                        </Box>
                                        <Box sx={{width: '100px', textAlign: 'right'}}>
                                            <Typography sx={{fontFamily: public_sans.style.fontFamily, fontSize: '16px', color: "black", display: 'inline-block'}}><b>${parseFloat((bills.due_amount).toFixed(2))}</b></Typography>
                                        </Box>
                                    </Box>
                                </Box>  
                            )
                        }) : null
                    }
                </Box>
        </Box>
    )
}