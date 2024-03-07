import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Hrbáček Michal',
  description: 'Fullstack developer',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className=''>{children}</body>
    </html>
  )
}
