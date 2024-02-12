import GoogleAnalytics from '@/components/GoogleAnalytics';
import './globals.css'
import { Montserrat } from 'next/font/google';
import GoogleAds from '@/components/GoogleAds';


const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata = {

  image: "https://example.com/image.jpg",
  monetag: "bb42474b5d86370c5d7e6d6b4a540ee2"

};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <GoogleAnalytics GA_MEASUREMENT_ID='G-0X39YR8CHD'/>
      
      <body className={montserrat.className}>{children}</body>
    </html>
  )
}
