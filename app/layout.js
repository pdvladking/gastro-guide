import "./globals.css"
import Navbar from "./components/Navbar"

export const metadata = {
  title: "Gastro Guide",
  description: "Restaurant SaaS",
};

export default function RootLayout ({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  )
}