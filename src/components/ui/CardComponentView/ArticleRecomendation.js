'use client';
import React, { useRef,useContext, useState, useEffect } from 'react';
import { AppStateContext } from '@/components/AppStateContext';
import Link from 'next/link';
import Image from 'next/image';

const ArticleRecomendation = (props) => {

    

    return (
        <>
         <Link href={`${props.all.link}`}
             className={`leading-tight  z-[3] w-full h-full font-[50] h-[min-content]  ${props.style}`} style={{zIndex:`${props.zIndex}`,fontSize:`1rem`,gridColumnStart: `${props.style.colStart}`,gridColumnEnd: `${props.style.colEnd}`,gridRowStart: `${props.style.rowStart}`,gridRowEnd: `${props.style.rowEnd}`,margin:`${props.style.margin}rem`}} >
                  <div className='w-full h-full m-4 bg-slate-200 flex flex flex-wrap flex-auto ' style={{borderRadius:`${props.style.borderRadius}rem`,flexDirection: `${props.style.flexDirection}`}}>
                    <div className='w-[12rem] flex-auto rounded-xl'>
                    <Image unoptimized width={200} height={200} className={`w-full h-full object-cover rounded-xl`}  src={`${props.all.image}`}/>
                    </div>
                    <div className={`w-[10rem] flex flex-auto flex-col rounded-xl bg-slate-200  text-2xl font-semibold`}>
                        <h1 className='w-[90%] m-8 h-full' style={{fontSize:`${props.style.fontSize}rem`}}>{`${props.all.contents}`}</h1>
                        <button className='bg-black text-white rounded-xl self-end m-4 text-xl px-4 py-2'>read</button>
                        
                    </div>
                  </div>
                 
            </Link>
        
        </>
       
    );
};

export default ArticleRecomendation;