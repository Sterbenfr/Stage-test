'use client'
import './globals.css'
import { Inter } from 'next/font/google'
import NavBar from '../components/NavBar'
import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'
import { Session } from 'next-auth'
interface RootLayoutProps {
    children: ReactNode
    session: Session
}

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children, session }: RootLayoutProps) {
    return (
        <html lang='en'>
            <body className={inter.className}>
                <SessionProvider session={session}>
                    <NavBar>{children}</NavBar>
                </SessionProvider>
            </body>
        </html>
    )
}
