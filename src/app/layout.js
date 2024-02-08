import './globals.css'
import { Montserrat } from 'next/font/google';


const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata = {
  title: "My App",
  description: "This is my app",
  image: "https://example.com/image.jpg",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body className={montserrat.className}>{children}</body>
    </html>
  )
}
