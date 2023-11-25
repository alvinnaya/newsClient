'use client';
import React, { useRef,useContext, useState, useEffect } from 'react';
import { AppStateContext } from '@/components/AppStateContext';

function HeadingText(props) {
    const {setEditor,editor,setCard,card} = useContext(AppStateContext);
    const editorRef = useRef();
    

    const handleFocus = (e) => {
      
      const newEditor = {...editor}; // Menyalin array card ke variabel baru agar tidak mengubah state langsung
      newEditor.index.cardIndex = props.page; // Mengganti nilai contents pada komponen pertama
      newEditor.index.componentIndex = props.componentIndex;
      newEditor.editor = 'TextEditor'
      newEditor.ref = editorRef
      setEditor(newEditor);
      
      
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
        
            <>
                <h1 style={{zIndex:`${props.zIndex}`,fontSize:`4rem`,gridColumnStart: `${props.style.colStart}`,gridColumnEnd: `${props.style.colEnd}`,gridRowStart: `${props.style.rowStart}`,gridRowEnd: `${props.style.rowEnd}`}} 
                ref={editorRef} onFocus={handleFocus} onBlur={HandleContentChange} dangerouslySetInnerHTML={{ __html: props.Text }} contentEditable={true} className="block box-border w-full leading-[1.1] text-[2.15rem] focus:outline-none focus:border-zinc-300 border-transparent rounded-lg p-2 border-2 ">
                
                </h1>
            </>
    );
}

export default HeadingText;