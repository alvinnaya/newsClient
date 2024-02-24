"use client"
import { useRef,useEffect,useState } from "react";
import Banner from "../Adstera";

function AdsonContent(props) {

    const observerTarget = useRef(null);

    const [ads,setAds] = useState(false)

    useEffect(() => {
    
      
       
        const observer = new IntersectionObserver(
          (entries) => {
            console.log('terliat',entries[0])
            
            if (entries[0].isIntersecting) {
              console.log('iklan');
              setAds(true)
              
            }
          }
        );
      
        if (observerTarget.current) {
          observer.observe(observerTarget.current);
        }
      
        return () => {
          if (observerTarget.current) {
            observer.unobserve(observerTarget.current);
          }
        };
      }, []);

    return (
        <div ref={observerTarget}>
            {ads &&  <Banner w={300} h={250}/>}
            
        </div>
    );
}

export default AdsonContent;