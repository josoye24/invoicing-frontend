"use client";

import SideBar from "@/app/components/SideBar"
import { Box } from "@mui/material"
import { useEffect } from "react"
import { useRouter } from "next/navigation";

export default function InvoiceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter();

  useEffect(() => {
    if(!localStorage.getItem('user')){
      router.push('/');
    }
   }, []);
  
  return (
    <Box
        sx={{ display: "flex" }}
      >
        <SideBar />
          <Box component='div' sx={{p:5, pb:6, pt: 10, width: '100%', minHeight: "100vh",  backgroundColor: "#213F7D0F", color: "text.primary"}}>
          {children}
          </Box>
      </Box>
  )
}
