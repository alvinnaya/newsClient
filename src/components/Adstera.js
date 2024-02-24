'use client'
import { useEffect,useRef } from "react";

function Banner({w,h}) {
    const banner = useRef(null);
  
    // Handle missing values in atOptions (provide necessary replacements)
    const atOptions = {
      key: '6fb4d16b985d13f7f4f320a7a284c58a', // Replace with the actual key
      format: 'iframe',
      height: h,
      width: w,
      params: { /* Handle params replacement or removal if needed */ },
    };
  
    useEffect(() => {
      if (banner.current && !banner.current.firstChild) {
        const conf = document.createElement('script');
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = `//www.topcreativeformat.com/6fb4d16b985d13f7f4f320a7a284c58a/invoke.js`;
        conf.innerHTML = `atOptions = ${JSON.stringify(atOptions)}`;
  
        banner.current.append(conf);
        banner.current.append(script);
        console.log('banner load 1', banner.current)
      }
    }, [banner]);
  
    return (
        <>
         <div
        className="m-auto scale-[1.2] md:scale-[1.7] lg:scale-[2] flex border border-gray-200 justify-center items-center text-white text-center"
        ref={banner}
      ></div>
        </>
     
    );
  }
  
  export default Banner;