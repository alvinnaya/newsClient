'use client'

import React, { useRef,useContext, useState, useEffect } from 'react';
import { AppStateContext } from '@/components/AppStateContext';

function AdsContainer(props) {
    const banner = useRef(null);
    const {setEditor,editor,setCard,card,setComponentsSelect,componentsSelect} = useContext(AppStateContext);
    const editorRef = useRef();
    

    const handleFocus = (e) => {
      
      const newEditor = {...editor}; // Menyalin array card ke variabel baru agar tidak mengubah state langsung
      newEditor.index.cardIndex = props.page; // Mengganti nilai contents pada komponen pertama
      newEditor.index.componentIndex = props.componentIndex;
      newEditor.editor = 'AdsEdit'
      newEditor.ref = editorRef
      setEditor(newEditor);
      console.log(props.all.contents)
      
      };
  
    // Handle missing values in atOptions (provide necessary replacements)
    const atOptions = {
      key: '6fb4d16b985d13f7f4f320a7a284c58a', // Replace with the actual key
      format: 'iframe',
      height: 250,
      width: 300,
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
         <div onClick={(e)=>{handleFocus(); }}
             className={`leading-tight h-full w-full z-[3] font-[50] h-[min-content]  ${props.style}`} style={{zIndex:`${props.zIndex}`,fontSize:`1rem`,gridColumnStart: `${props.style.colStart}`,gridColumnEnd: `${props.style.colEnd}`,gridRowStart: `${props.style.rowStart}`,gridRowEnd: `${props.style.rowEnd}`}} >
            <div
        className="m-auto md:scale-[1.7] lg:scale-[2] flex border border-gray-200 justify-center items-center text-white text-center"
        ref={banner}
      ></div>
             </div>
       
        </>
     
    );
  }
  
  export default AdsContainer;
