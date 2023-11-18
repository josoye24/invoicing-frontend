import type { Metadata } from 'next'
import ThemeRegistry from '@/app/components/ThemeRegistry/ThemeRegistry';
import { ToastContainer } from "react-toastify";
import './globals.css'
import "react-toastify/dist/ReactToastify.css";


export const metadata: Metadata = {
  title: 'Acme Startup',
  description: 'Invoicing Platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <main>
          <ThemeRegistry>
            {children}
            <ToastContainer />
          </ThemeRegistry>
        </main>
      </body>
    </html>
  )
}
