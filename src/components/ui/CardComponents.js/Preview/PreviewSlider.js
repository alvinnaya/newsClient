"use client"
import React, { useState } from 'react';
import CardView from '../../CardComponentView/CardView';
import EditorCardPreview from '../EditorCardPreview';
const PreviewSlider = ({TotalIndex,Id,TotalIndexArticle,card}) => {
    const [index,setIndex] = useState(0)
    return (
        <>
         <div className="w-[60rem]  flex overflow-hidden 0 ">
          <div className="flex w-[60rem] duration-300" style={{	transform: `translateX(${-100*index}%)`,}}>
            
          
          <EditorCardPreview Id={Id} card={card} currentIndex={index+1} />
       
          

          
          </div>
          
          
        </div>
        <div className="w-[60rem] lg:absolute lg:w-[80rem] lg:-z-50 center flex-col flex mt-8" >
            <div className='flex justify-between w-[40rem] lg:w-[70rem]  rounded-full p-2'>
                        <button onClick={()=>{index <= 0 ? '' : setIndex(index-1)}} className={`m-4 p-6 bg-neutral-200 text-neutral-600 rounded-full`}>
                         <svg className="rotate-180" xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
                         </button>
                        
                         <button className={`lg:hidden m-4 p-6 px-12 bg-neutral-200 text-neutral-600 rounded-lg text-4xl duration-300 ${index+1 == TotalIndex? "opacity-0":""}`}>
                         {index+1}
                         </button>

                         <button onClick={()=>{index+1 >= TotalIndex ? '' : setIndex(index+1); console.log(TotalIndexArticle,TotalIndex)}}  className={`m-4 p-6 duration-300 bg-neutral-200 text-neutral-600 rounded-full ${index+1 == TotalIndex ? "opacity-0":""}`}>
                         <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
                         </button>
            </div>
                       
        </div>
        </>
    );
};

export default PreviewSlider;