import React from "react";
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { cn, constructMetadata } from "@/lib/utils";
import NavBar from "@/components/NavBar";
import Providers from "@/components/Providers";

import "react-loading-skeleton/dist/skeleton.css"
import "simplebar-react/dist/simplebar.min.css"

import { Toaster } from "@/components/ui/toaster";
import { NextFont } from "next/dist/compiled/@next/font";

const inter: NextFont = Inter({ subsets: ['latin'] })

export const metadata: Metadata = constructMetadata()

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <Providers>
                <body className={cn('min-h-screen font-sans antialiased grainy', inter.className)}>
                    <Toaster />
                    <NavBar />
                    {children}
                </body>
            </Providers>
        </html>
    )
}
