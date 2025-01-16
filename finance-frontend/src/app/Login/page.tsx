'use client'

import React, { useEffect, useState } from "react";

import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, Link, OutlinedInput, Stack, TextField, Typography } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import Image from "next/image";
import {Public_Sans} from 'next/font/google';
import { useRouter } from "next/navigation";

import { useUser } from "../components/Context/userContext";

const public_sans = Public_Sans({
    subsets: ['latin'],
    weight: ['400'],
    display: 'swap',

})

export default function Login() {

    //For Both pages
    const [isLogin, setIsLogin] = useState<boolean>(true)

    //For Login page
    const [showPassword, setShowPassword] = React.useState(false);
    const [username, setUserName] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [loginError, setLoginError] = React.useState<string>("")
    const {setUser} = useUser();

    //For Signup page
    const [createName, setCreateName] = useState<string>('')
    const [createUsername, setCreateUsername] = useState<string>('')
    const [createPassword, setCreatePassword] = useState<string>('')
    const [createAccountError, setCreateAccountError] = useState<string>('')
    const [createAccountMessage, setCreateAccountMessage] = useState<string>('')

    const router = useRouter();

    const triggerLoginEvent = () => {
        // Dispatch the custom event to notify listeners
        const loginEvent = new CustomEvent("loginStatusChange", {detail: {isLoggedIn: true}});
        window.dispatchEvent(loginEvent);
    }

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
                setUser(null)
                setLoginError("Username or Password is incorrect!")
                return;
            }
            else {
                const data = await res.json();
                localStorage.setItem("isLoggedIn", "true");
                setUser(data.user);
                setLoginError("");
                triggerLoginEvent();
                router.push("/Overview");
            }
        } catch (error) {
            console.error("Network Error: ", error)
        }
        
    };

    const createAccount = async () => {
        try{
            const res = await fetch('http://localhost:5000/createAccount', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                //In post method, make sure the variable names matches the ones in the backend (ex: username, password)
                body: JSON.stringify({ name: createName, username: createUsername, password: createPassword })
            });

            if(!res.ok) {
                setCreateName("")
                setCreateUsername("")
                setCreatePassword("")
                setCreateAccountError("Username already exist in the system")
                return;
            }
            else {
                setCreateAccountError("");
                setCreateAccountMessage('The account has been succesfully created! Please login!');
                handleSwitchPage();
            }
        } catch (error) {
            console.error("Network Error: ", error)
        }
    }

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => setUserName(e.target.value)
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)

    const handleCreateName = (e: React.ChangeEvent<HTMLInputElement>) => setCreateName(e.target.value)
    const handleCreateUsername = (e: React.ChangeEvent<HTMLInputElement>) => setCreateUsername(e.target.value)
    const handleCreatePassword = (e: React.ChangeEvent<HTMLInputElement>) => setCreatePassword(e.target.value)

    const handleSwitchPage = () => {
        setIsLogin((switchPage) => !switchPage)
        setUserName("")
        setPassword("")
        setCreateName("")
        setCreateUsername("")
        setCreatePassword("")
        setCreateAccountError("")
        setCreateAccountMessage("")
    }

    const formStyle = {
        width: '100%',
        marginBottom: '30px',
        fontFamily: public_sans.style.fontFamily
    };

    useEffect(() => {
        
        //THIS MAKE SURES THAT THE PERSON THAT IS ALREADY LOGGED ON,
        //AND TRIES TO GO TO LOGIN, WILL BE REDIRECTED BACK TO OVERVIEW
        const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

        if(isLoggedIn) {
            router.push("/Overview")
        }
    }, [])

    if(isLogin) {
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
                            backgroundColor: 'white',
                            padding: '30px',
                            borderRadius: '10px',
                            }}
                        >
                            <Typography sx={{fontFamily: public_sans.style.fontFamily, fontSize: '30px', color: "#201F24", display: 'inline-block'}}><b>Login</b></Typography>
                            {/* <Typography sx={{fontFamily: public_sans.style.fontFamily, fontSize: '30px', color: "#201F24", display: 'inline-block'}}><b>{user ? user.username : null}</b></Typography> */}

                            <Box sx={{textAlign: 'center'}}>
                                <Typography sx={{marginRight: '10px',display: 'block',fontFamily: public_sans.style.fontFamily, fontSize: '16px', marginBottom: '0px', color: 'red', mt: '20px'}}>{loginError}</Typography> 
                            </Box>

                            <Box sx={{textAlign: 'center'}}>
                                <Typography sx={{marginRight: '10px',display: 'block',fontFamily: public_sans.style.fontFamily, fontSize: '16px', marginBottom: '0px', color: 'green', mt: '20px'}}>{createAccountMessage}</Typography> 
                            </Box>

                            <Box sx={{marginTop: '30px'}}>
                                <TextField sx={formStyle} required label="Username" value={username} name="Username" onChange={handleUsernameChange} /> <br/>
                                
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
                                    value={password}
                                    
                                />
                                </FormControl>
                                <Button sx={{background: 'black', color: 'white', width: '100%', padding: '10px 0px'}} variant="text" onClick={fetchUser}>Login</Button>
                            </Box>
                            <Box sx={{textAlign: 'center', mt: '30px'}}>
                                <Typography sx={{marginRight: '10px', marginTop:'5px',display: 'inline-block',fontFamily: public_sans.style.fontFamily, fontSize: '16px', marginBottom: '0px', color: '#696868'}}>Need to create an account? <Link sx={{color: 'black', cursor: 'pointer'}} onClick={handleSwitchPage}><b>Sign up</b></Link></Typography> 
                            </Box>
                        </Box>
                    </Box>

                </Stack>

            </Box>
        )
    }
    else {
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
                            // height: '422px',
                            backgroundColor: 'white',
                            //display: 'flex',
                            // alignItems: 'center',
                            // justifyContent: 'center',
                            // textAlign: 'center', // Ensures text is centered within this Box
                            padding: '30px',
                            borderRadius: '10px',
                            }}
                        >
                            <Typography sx={{fontFamily: public_sans.style.fontFamily, fontSize: '30px', color: "#201F24", display: 'inline-block'}}><b>Sign Up</b></Typography>
                            {/* <Typography sx={{fontFamily: public_sans.style.fontFamily, fontSize: '30px', color: "#201F24", display: 'inline-block'}}><b>{user ? user.username : null}</b></Typography> */}
                            <Box sx={{textAlign: 'center'}}>
                                <Typography sx={{marginRight: '10px',display: 'block',fontFamily: public_sans.style.fontFamily, fontSize: '16px', marginBottom: '0px', color: 'red', mt: '20px'}}>{createAccountError}</Typography> 
                            </Box>
                            <Box sx={{marginTop: '30px'}}>
                                <TextField sx={formStyle} required name="CreateName" label="Name" onChange={handleCreateName} value={createName}/> <br/>
                                <TextField sx={formStyle} required name="CreateUsername" label="Username" onChange={handleCreateUsername} value={createUsername}/> <br/>
                                
                                {/* The password section */}
                                <FormControl sx={formStyle} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Create Password</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                        aria-label={
                                            showPassword ? 'hide the password' : 'display the password'
                                        }
                                        edge="end"
                                        onClick={handleClickShowPassword}
                                        >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                    }
                                    label="Password"
                                    onChange={handleCreatePassword}
                                    value={createPassword}
                            
                                />
                                </FormControl>
                                <Button sx={{background: 'black', color: 'white', width: '100%', padding: '10px 0px',fontFamily: public_sans.style.fontFamily, textTransform: 'capitalize'}} variant="text" onClick={createAccount}>Create Account</Button>
                            </Box>
                            <Box sx={{textAlign: 'center', mt: '30px'}}>
                                <Typography sx={{marginRight: '10px', marginTop:'5px',display: 'inline-block',fontFamily: public_sans.style.fontFamily, fontSize: '16px', marginBottom: '0px', color: '#696868'}}>Already have an account? <Link sx={{color: 'black', cursor: 'pointer'}} onClick={handleSwitchPage}><b>Login</b></Link></Typography> 
                            </Box>
                        </Box>
                    </Box>

                </Stack>

            </Box>
        )
    }

}

