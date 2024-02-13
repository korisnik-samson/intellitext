import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Metadata } from "next";
import { IConstructMetadataTypes } from "@/types";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

// potential issues with routing
export function absoluteUrl(path: string) {
    if (typeof window !== 'undefined') return path
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}${path}`

    return `http://localhost:${process.env.PORT ?? 3000}${path}`
}

export function constructMetadata({
    title = 'IntelliText',
    description = 'An AI Chat Web Application',
    image =  'thumbnail.png',
    icons = '/favicon.ico',
    noIndex = false
} : IConstructMetadataTypes = {}): Metadata {
    return {
        title,
        description,
        openGraph: {
            title,
            description,
            images: [{ url: image }]
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [image],
            creator: '@Samson14653708'
        },
        icons,
        metadataBase: new URL('https://intellitext.vercel.app/'),
        themeColor: '#FFF',
        ...(noIndex && {
            robots: {
                index: false,
                follow: false
            }
        })
    }
}
