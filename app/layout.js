import './globals.css'
import React from 'react';
import ClientSideLayout from './clientSideLayout';

export const metadata = {
  title: 'OSPIFAK'
}

export default function RootLayout({ children }) {
  return (
    <ClientSideLayout>
      {children}
    </ClientSideLayout>
  )
}