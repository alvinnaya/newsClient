"use client"
import React, { useState } from 'react';
import Card from '../Card';
import NextArticle from '../Recomendation/NextArticle';
import CardView from './CardView';

const Slider = ({TotalIndex,Id,TotalIndexArticle,card,ads, response2}) => {
    const [index,setIndex] = useState(0)
    const [touchStart, setTouchStart] = useState(null)
    const [touchEnd, setTouchEnd] = useState(null)

    const minSwipeDistance = 20

    const onTouchStart = (e) => {
        setTouchEnd(null) // otherwise the swipe is fired even with usual touch events
        setTouchStart(e.targetTouches[0].clientX)
      }
      
      const onTouchMove = (e) => { setTouchEnd(e.targetTouches[0].clientX)
    }
      
      const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return
        const distance = touchStart - touchEnd
        const isLeftSwipe = distance > minSwipeDistance
        const isRightSwipe = distance < -minSwipeDistance
        
        console.log('swipe', isLeftSwipe ? 'left' : 'right')
        if(isLeftSwipe){
            index+1 >= TotalIndex ? '' : setIndex(index+1); 
        }else if(isRightSwipe){
            index <= 0 ? '' : setIndex(index-1)
        }
        // add your conditional logic here
    
      }

    return (
        <>
         <div  
          className=" flex overflow-hidden ">
          <div className="flex w-[60rem] scale-[1] md:scale-90 duration-300" style={{	transform: `translateX(${-100*index}%)`,}}>
            
          
          <CardView Id={Id} card={card} currentIndex={index+1} ads={ads} response2={response2}/>
          <NextArticle id={Id} TotalIndex={TotalIndex} currentIndex={index+1} ads={ads}/>
           

          
          </div>
          
          
        </div>
        <div className="w-[60rem] lg:absolute lg:w-[80rem] lg:-z-50 center flex-col flex mt-8" >
            <div className='flex justify-between w-[40rem] lg:w-[70rem]  rounded-full p-2'>
                        <button onClick={()=>{index <= 0 ? '' : setIndex(index-1)}} className={`m-4 p-6 bg-neutralPrimary1 border border-current text-neutralSecondary1 hover:bg-neutralSecondary1 hover:text-neutralPrimary1 rounded-full`}>
                         <svg className="rotate-180" xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
                         </button>
                        
                         <button className={`lg:hidden font-bold shadow-brutalism-b m-4 p-6 px-12 bg-neutralPrimary1 border border-current text-neutralSecondary1 rounded-lg text-4xl duration-300 ${index+1 == TotalIndex? "opacity-0":""}`}>
                         {index+1}
                         </button>

                         <button onClick={()=>{index+1 >= TotalIndex ? '' : 
                         setIndex(index+1); 
                         //console.log("current index", index+1)
                         }}  className={`m-4 p-6 duration-300 bg-neutralPrimary1 border border-current text-neutralSecondary1 hover:bg-neutralSecondary1 hover:text-neutralPrimary1 rounded-full ${index+1 == TotalIndex ? "opacity-0":""}`}>
                         <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
                         </button>
            </div>
                       
        </div>
        </>
    );
};

export default Slider;