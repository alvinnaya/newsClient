'use client';
import React, { useRef,useContext, useState, useEffect } from 'react';
import { AppStateContext } from '@/components/AppStateContext';
import Image from 'next/image'

function Shape(props) {
    const {setEditor,editor,setCard,card,componentsSelect,setComponentsSelect} = useContext(AppStateContext);
    const editorRef = useRef();
    const [isSelected, setIsSelected] = useState(false)

    const handleFocus = (e) => {
      
      const newEditor = {...editor}; // Menyalin array card ke variabel baru agar tidak mengubah state langsung
      newEditor.index.cardIndex = props.page; // Mengganti nilai contents pada komponen pertama
      newEditor.index.componentIndex = props.componentIndex;
      newEditor.editor = 'Shape'
      newEditor.ref = editorRef
      setEditor(newEditor);
      console.log(props.all.contents)
      
      };

      const handleselect = (e)=>{
      
        if(e.shiftKey){
          let condition = true;
          componentsSelect.map((item)=>{
            console.log(item)
            if(item == card[props.page].components[props.componentIndex] ){
              condition = false
              console.log("the same")
              return;
            }
          })
          console.log(condition)
          if(!isSelected && condition ){
          
            console.log('shift')
            const newSelectedComponent = [...componentsSelect,card[props.page].components[props.componentIndex]]
            console.log('new',newSelectedComponent)
            setComponentsSelect(newSelectedComponent)
            console.log(componentsSelect)
            setIsSelected(true)
          }else{
            return;
          }
          
        }else{
        console.log(componentsSelect.length)
        console.log( [card[props.page].components[props.componentIndex]])
        setComponentsSelect([card[props.page].components[props.componentIndex]])
        setIsSelected(false) 
        }
      }

      const handleItemClick = (e) => {
        if(e.shiftKey){
          console.log('shift')
        }
        // Jika tombol shift ditekan dan ada item yang dipilih
        if (e.shiftKey && componentsSelect.length > 0) {
          const newSelectedComponent = [...componentsSelect, props.componentIndex]
          console.log('new',newSelectedComponent)
          setComponentsSelect(newSelectedComponent)
          console.log(componentsSelect)
          
        } else {
          // Jika shift tidak ditekan, atau tidak ada item yang dipilih
          setComponentsSelect([props.componentIndex]);
          console.log(componentsSelect)
        }
      };
    
      // const HandleContentChange = (e)=>{
      // const selection = window.getSelection();
      // const range = selection.getRangeAt(0);
      // // console.log(range.startOffset, range.endOffset);
      // if(range.endOffset - range.startOffset == 0){
      //   const newContent = [...card]; // Menyalin array card ke variabel baru agar tidak mengubah state langsung
      //   newContent[editor.index.cardIndex].components[editor.index.componentIndex].contents = e.target.innerHTML ; // Mengganti nilai contents pada komponen pertama
      //   setCard(newContent);
      // }
      // }


    return (
        
            <div onClick={(e)=>{handleFocus(); handleItemClick(e);}}
             className={`h-full w-full z-[3] font-[50] h-[min-content] border-2 bg-neutralSecondary1 ${props.select ? 'border-black':'border-transparent'}
             ${props.style}`} style={{backgroundImage:props.all.gradient ,backgroundColor: props.all.color,zIndex:`${props.zIndex}`,fontSize:`1rem`,gridColumnStart: `${props.style.colStart}`,gridColumnEnd: `${props.style.colEnd}`,gridRowStart: `${props.style.rowStart}`,gridRowEnd: `${props.style.rowEnd}`,borderRadius:`${props.style.borderRadius}rem`}} >
                 
                 
            </div>
    );
}

export default Shape;