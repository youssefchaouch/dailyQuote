import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Maram's Secret Garden - Daily Tulip Quotes",
  description: "Discover a new tulip-inspired quote every day in Maram's Secret Garden.",
  icons: {
    icon: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-X6t9ZQcLosREcBcZEIFBxxsAltyYnP.png",
        href: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-X6t9ZQcLosREcBcZEIFBxxsAltyYnP.png",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

