'use client'

import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, Link, OutlinedInput, Stack, TextField, Typography } from "@mui/material";

import Image from "next/image";

import {Public_Sans} from 'next/font/google';
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import React from "react";

const public_sans = Public_Sans({
    subsets: ['latin'],
    weight: ['400'],
    display: 'swap',

})

interface User {
    user_id: number,
    name: string,
    username: string,
    password: string
}

export default function Login() {

    const [user, setUser] = useState<User>()
    const [showPassword, setShowPassword] = React.useState(false);
    const [username, setUserName] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");

    
    const fetchUser = async () => {
        try{
            const res = await fetch('http://localhost:5000/checkUserPassword', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                //In post method, make sure the variable names matches the ones in the backend (ex: username, password)
                body: JSON.stringify({ username, password })
            });

            if(!res.ok) {
                console.log("Login Failed");
                setUser(undefined)
                return;
            }
            else {
                const data = await res.json();
                setUser(data.user);
            }
        } catch (error) {
            console.error("Network Error: ", error)
        }
        
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => setUserName(e.target.value)
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)

    const formStyle = {
        width: '100%',
        marginBottom: '30px'
    };


    return (
        <Box sx={{position: 'relative', width: 'fit-content', display: 'inline-block'}}>
            <Stack direction={'row'}>
                <Box>
                    <Image style={{marginLeft: '10px', borderRadius: '15px'}} alt='right_arrow' src={'/images/illustration-authentication.svg'} width={560} height={940}/>
                    <Box sx={{position: 'absolute', top: '90%', left: '50%', transform: 'translate(-190%, -80%)', width: '480px' }}>
                        <Typography sx={{fontFamily: public_sans.style.fontFamily, color: 'white', fontSize: '25px', lineHeight: '30px'}}><b>Keep track of your money
                        and save for your future</b></Typography>
                        <Typography sx={{fontFamily: public_sans.style.fontFamily, color: 'white', fontSize: '14px', mt: '25px'}}>Personal finance app puts you in control of your spending. Track transactions, set budgets, and add to savings pots easily.</Typography>
                    </Box>
                </Box>

                <Box
                    sx={{
                        width: '1350px',
                        height: '100vh', // Adjust the height if needed
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    >
                    <Box
                        sx={{
                        width: '560px',
                        height: '422px',
                        backgroundColor: 'white',
                        //display: 'flex',
                        // alignItems: 'center',
                        // justifyContent: 'center',
                        // textAlign: 'center', // Ensures text is centered within this Box
                        padding: '30px',
                        borderRadius: '10px',
                        }}
                    >
                        <Typography sx={{fontFamily: public_sans.style.fontFamily, fontSize: '30px', color: "#201F24", display: 'inline-block'}}><b>Login</b></Typography>
                        <Typography sx={{fontFamily: public_sans.style.fontFamily, fontSize: '30px', color: "#201F24", display: 'inline-block'}}><b>{user ? user.username : null}</b></Typography>
                        <Box sx={{marginTop: '30px'}}>
                            <TextField sx={formStyle} required label="Username" onChange={handleUsernameChange} /> <br/>
                            
                            {/* The password section */}
                            <FormControl sx={formStyle} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label={
                                        showPassword ? 'hide the password' : 'display the password'
                                    }
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                    >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                                }
                                label="Password"
                                onChange={handlePasswordChange}
                                
                            />
                            </FormControl>

                            <Button sx={{background: 'black', color: 'white', width: '100%', padding: '10px 0px'}} variant="text" onClick={fetchUser}>Login</Button>
                        </Box>
                        <Box sx={{textAlign: 'center', mt: '30px'}}>
                            <Typography sx={{marginRight: '10px', marginTop:'5px',display: 'inline-block',fontFamily: public_sans.style.fontFamily, fontSize: '16px', marginBottom: '0px', color: '#696868'}}>Need to create an account? <Link sx={{color: 'black'}} href="#"><b>Sign up</b></Link></Typography> 
                        </Box>
                    </Box>
                </Box>

            </Stack>

        </Box>
    )
}

