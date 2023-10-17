'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import { Inter } from 'next/font/google'
import './globals.css'
const UserProvider = dynamic(() => import('./contexto/userContext').then(mod => mod.UserProvider), {
  ssr: false
});

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'OSPIFAK'
}

export default function ClientSideLayout({ children }) {
 
  return (
    <html lang="en">
        <body className={inter.className}>
        <UserProvider>
          {children}
        </UserProvider>
        </body>
      </html>
  )
}