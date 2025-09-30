import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { Suspense } from "react"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500", "600", "700"],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
})

export const metadata: Metadata = {
  title: "AI-Powered LCA for Sustainable Metals",
  description: "Accelerating Circularity in the Metallurgy Sector - Life Cycle Assessment Tool for Metals",
  generator: "abdullah shaikh",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased">
        <Suspense fallback={<div>Loading...</div>}>
          <Navigation />
        </Suspense>
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  )
}
