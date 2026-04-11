import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Hanin Care Canada | PSW Training",
  description: "Professional Support Worker Training Platform — Canada",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

