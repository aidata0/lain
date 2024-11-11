import './globals.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>WIRED_PROTOCOL</title>
      </head>
      <body>{children}</body>
    </html>
  )
}
