"use client"

import React, { useCallback } from 'react';
import { Box, CssBaseline } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Image from 'next/image'
import Divider from '@mui/material/Divider';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import { useRouter, usePathname} from 'next/navigation';

import {Public_Sans} from 'next/font/google';

const drawerWidth = 300

const public_sans = Public_Sans({
  subsets: ['latin'],
  weight: ['100', '200'],
  display: 'swap',

})


export default function Sidebar() {

  const router = useRouter();
  const getPath = usePathname();

  const navigate = (path: string) => {
    router.push(path)
  }

  const showButtonsIcon = (index: number, text: string) => {
    if(index === 0) {
      return <Image style={{filter: (getPath === '/' + text) ? 'invert(40%) sepia(11%) saturate(2106%) hue-rotate(128deg) brightness(100%) contrast(94%)' : 'none'}} alt='logo' src={'/images/icon-nav-overview.svg'} width={24} height={24}/>
      // return <OverviewIcon style={{color: 'blue'}} width={24} height={24}/>
    }
    else if(index===1) {
      return <Image style={{filter: (getPath === '/' + text) ? 'invert(40%) sepia(11%) saturate(2106%) hue-rotate(128deg) brightness(100%) contrast(94%)' : 'none'}} alt='logo' src={'/images/icon-nav-transactions.svg'} width={24} height={24}/>
    }
    else if(index===2) {
      return <Image style={{filter: (getPath === '/' + text) ? 'invert(40%) sepia(11%) saturate(2106%) hue-rotate(128deg) brightness(100%) contrast(94%)' : 'none'}} alt='logo' src={'/images/icon-nav-budgets.svg'} width={24} height={24}/>
    }
    else if(index===3) {
      return <Image style={{filter: (getPath === '/' + text) ? 'invert(40%) sepia(11%) saturate(2106%) hue-rotate(128deg) brightness(100%) contrast(94%)' : 'none'}} alt='logo' src={'/images/icon-nav-pots.svg'} width={24} height={24}/>
    }
    else if(index===4) {
      return <Image style={{filter: (getPath === '/' + text) ? 'invert(40%) sepia(11%) saturate(2106%) hue-rotate(128deg) brightness(100%) contrast(94%)' : 'none'}} alt='logo' src={'/images/icon-recurring-bills.svg'} width={24} height={24}/>
    }
  }

  return (
    <Box sx={{display: 'flex'}}>
      <CssBaseline />
      <Drawer
        sx={{
              width: drawerWidth,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
                background: '#201F24',
                borderRadius: '0px 12px 12px 0px'
              },
            }}
        variant={'permanent'}
        anchor={'left'}
        classes={{paper: '240px'}}
      >
        <Box>
          <Box sx={{marginLeft: '25px', padding: '30px 0px'}}>
            <Image alt='logo' src={'/images/logo-large.svg'} width={121} height={22}/>
          </Box>
        </Box>
        <Divider />
        <List sx={{marginTop:'20px'}}>
          {['Overview', 'Transaction', 'Budgets','Pots','Recurring Bills'].map((text, index) => (
            <ListItem key={text} sx={{ display: 'block', paddingLeft: '0px', marginBottom: '-10px'}}>
              <ListItemButton onClick={() => navigate(text)} 
                sx={{paddingLeft: '30px',
                    paddingTop: '18px',
                    paddingBottom: '18px',
                    borderRadius: '0px 10px 10px 0px',
                    backgroundColor: (getPath === '/' + text) ? 'white': '',
                    borderLeft: (getPath === '/' + text) ? '3px solid #277C78' : 'none'
                  }}
              >
                <ListItemIcon>
                  {showButtonsIcon(index, text)}
                </ListItemIcon>
                <Typography sx={{fontFamily: public_sans.style.fontFamily, fontSize: '16px', color: (getPath === '/' + text) ? '#201F24' : "#B3B3B3"}}><b>{text}</b></Typography>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
        {/* <Typography variant='h5'>HELLO</Typography> */}
      
    </Box>
    
  );
}
