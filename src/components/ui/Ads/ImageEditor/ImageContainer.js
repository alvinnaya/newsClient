'use client';
import React, { useRef,useContext, useState, useEffect } from 'react';
import { AppStateContext } from '@/components/AppStateContext';
import Image from 'next/image'

function ImageContainer(props) {
    const {setEditor,editor,setCard,card} = useContext(AppStateContext);
    const editorRef = useRef();
    

    const handleFocus = (e) => {
      
      const newEditor = {...editor}; // Menyalin array card ke variabel baru agar tidak mengubah state langsung
      newEditor.index.cardIndex = props.page; // Mengganti nilai contents pada komponen pertama
      newEditor.index.componentIndex = props.componentIndex;
      newEditor.editor = 'ImageEditor'
      newEditor.ref = editorRef
      setEditor(newEditor);
      console.log(props.all.contents)
      
      };
    
      const HandleContentChange = (e)=>{
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      // console.log(range.startOffset, range.endOffset);
      if(range.endOffset - range.startOffset == 0){
        const newContent = [...card]; // Menyalin array card ke variabel baru agar tidak mengubah state langsung
        newContent[editor.index.cardIndex].components[editor.index.componentIndex].contents = e.target.innerHTML ; // Mengganti nilai contents pada komponen pertama
        setCard(newContent);
      }
      }


    return (
        
            <div onClick={handleFocus}
             className={`leading-tight h-full w-full z-[3] font-[50] h-[min-content]  ${props.style}`} style={{zIndex:`${props.zIndex}`,fontSize:`1rem`,gridColumnStart: `${props.style.colStart}`,gridColumnEnd: `${props.style.colEnd}`,gridRowStart: `${props.style.rowStart}`,gridRowEnd: `${props.style.rowEnd}`}} >
                  <div className='w-full h-full ' style={{}}>
                    <img className={`w-full h-full object-cover`} style={{borderRadius:`${props.style.borderRadius}rem`}} src={`${props.all.contents||'https://images.unsplash.com/photo-1550686041-366ad85a1355?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80'}`}/>
                  </div>
                 
            </div>
    );
}

export default ImageContainer;