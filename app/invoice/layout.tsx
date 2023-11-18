import SideBar from "@/app/components/SideBar"
import { Box } from "@mui/material"


export default function InvoiceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Box
        sx={{ display: "flex" }}
      >
        <SideBar />
          <Box component='div' sx={{p:5, pb:6, pt: 12, width: '100%', minHeight: "100vh",  backgroundColor: "#213F7D0F", color: "text.primary"}}>
          {children}
          </Box>
      </Box>
  )
}
