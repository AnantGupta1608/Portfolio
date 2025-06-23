import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Anant Gupta:Portfolio",
  description:
    "Building intelligent systems at the intersection of AI, web development, and innovation. Explore projects, ideas, and engineering that shape the future",
  keywords: "Anant Gupta, AI, Artificial Intelligence, Machine Learning, Full-Stack Developer, Portfolio, React, Next.js, Python, TensorFlow,",
  authors: [{ name: "Anant Gupta" }],
  openGraph: {
    title: "Anant Gupta:Portfolio",
    description: "Explore the portfolio of Anant Gupta featuring AI-powered tools, full-stack apps, and innovative projects.",
    type: "website",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
