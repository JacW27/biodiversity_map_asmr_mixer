import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
// <CHANGE> Import site header and footer
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  // <CHANGE> Update metadata for Wildlife Echoes
  title: "Wildlife Echoes - Biodiversity Tracking & Bird Detection",
  description:
    "Interactive platform for tracking bird species, exploring detection maps, and experiencing nature through ASMR soundscapes",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased min-h-screen flex flex-col`}>
        {/* <CHANGE> Add site header */}
        <SiteHeader />
        {/* <CHANGE> Main content with flex-grow */}
        <main className="flex-grow">{children}</main>
        {/* <CHANGE> Add site footer */}
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  )
}
