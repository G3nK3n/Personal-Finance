"use client"

import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Sidebar from "./components/Sidebar/Sidebar";

import {AppRouterCacheProvider} from '@mui/material-nextjs/v14-appRouter'
import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false)
  const router = useRouter();

  //THIS CHECKS IF THE USER IS LOGGED IN OR NOT
  useEffect(() => {
    
    if(typeof window === 'undefined') {
      return;
    }

    const handleLoginStatusChange = (event: Event) => {
      const customeEvent = event as CustomEvent;
      setIsLoggedIn(customeEvent.detail.isLoggedIn);
    };  

    const checkInitialLoginStatus = () => {
      const loggedIn = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(loggedIn);
      if (!loggedIn) {
          router.push("/Login");
      }
    };

    window.addEventListener("loginStatusChange", handleLoginStatusChange);

    // Check login status on mount
    checkInitialLoginStatus();

    return () => {
        window.removeEventListener("loginStatusChange", handleLoginStatusChange);
    };

  }, [])
  return (
    
    <html lang="en">
      <head>
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
          <Box sx={{display: 'flex',backgroundColor: '#F8F4F0', height: '100%'}}>
            <AppRouterCacheProvider>
              {isLoggedIn && <Sidebar />}
              <main style={{flexGrow: 1}}>
                {children}
              </main>
            </AppRouterCacheProvider>
          </Box>
        </body>
      </head>
    </html>
  );
}
