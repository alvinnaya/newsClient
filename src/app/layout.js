import GoogleAnalytics from '@/components/GoogleAnalytics';
import './globals.css'
import { Montserrat } from 'next/font/google';
import GoogleAds from '@/components/GoogleAds';


const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata = {

  image:{
    default : 'https://example.com/image.jpg',
    template: '%s'
  } ,
  
  title:{
    default : 'figustack',
    template:'%s | figustack'
  },
  other: { monetag: "bb42474b5d86370c5d7e6d6b4a540ee2",
  'google-adsense-account':"ca-pub-2421830929324855", },
  

};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <GoogleAnalytics GA_MEASUREMENT_ID='G-0X39YR8CHD'/>
      <GoogleAds />
      
      <body className={montserrat.className}>{children}</body>
    </html>
  )
}
