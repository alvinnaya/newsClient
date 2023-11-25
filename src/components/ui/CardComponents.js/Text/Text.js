'use client';
import React, { useRef,useContext, useState, useEffect,useMemo } from 'react';
import { AppStateContext } from '@/components/AppStateContext';

function sanitizeHTML(html) {
  if (typeof window !== 'undefined' && window.DOMParser) {
    const doc = new window.DOMParser().parseFromString(html, 'text/html');
    const elements = Array.from(doc.body.children);

    elements.forEach((element) => {
      if (element.tagName.toLowerCase() !== 'span') {
        const textNode = doc.createTextNode(element.textContent);
        element.parentNode.replaceChild(textNode, element);
      }
    });

    return doc.body.innerHTML;
  }

  return '';
}



function Text(props) {
    const {setEditor,editor,setCard,card,componentsSelect, setComponentsSelect} = useContext(AppStateContext);
    const editorRef = useRef();
    const [isSelected, setIsSelected] = useState(false)
    const [isEdit,setIsEdit] = useState(false)
    const [hasSelect,setHasSelect] = useState(false)
   

   
    const sanitizedHTML = useMemo(() => sanitizeHTML(props.Text), [props.Text]);
    
    
    


    const handleFocus = (e) => {
      
      const newEditor = {...editor}; // Menyalin array card ke variabel baru agar tidak mengubah state langsung
      newEditor.index.cardIndex = props.page; // Mengganti nilai contents pada komponen pertama
      newEditor.index.componentIndex = props.componentIndex;
      newEditor.editor = 'TextEditor'
      newEditor.ref = editorRef
      setEditor(newEditor);
      console.log(props.page, props.componentIndex)
      
      
      };



      const handleItemClick = (e) => {
       console.log(props.componentIndex)
        // Jika tombol shift ditekan dan ada item yang dipilih
        if (e.shiftKey && componentsSelect.length > 0) {
          const newSelectedComponent = [...componentsSelect, props.componentIndex]
          console.log('new',newSelectedComponent)
          setComponentsSelect([...componentsSelect, props.componentIndex])
          console.log(componentsSelect)
          
        } else {
          // Jika shift tidak ditekan, atau tidak ada item yang dipilih
          setComponentsSelect([props.componentIndex]);
          console.log('componentsSelect',componentsSelect)
        }

        handleFocus(e)
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
            const newSelectedComponent = [...componentsSelect,props.componentIndex]
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
        setComponentsSelect([props.componentIndex])
        setIsSelected(false) 
        }
      }

      const handleDoubleClick = (e) => {
        handleItemClick(e)
        if (e.detail == 1) {
          console.log('double')
          setIsEdit(true)
        }
      };
    
    
      const HandleContentChange = (e)=>{
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      // console.log(range.startOffset, range.endOffset);
       
      if(range.endOffset - range.startOffset == 0){
        const newContent = [...card]; // Menyalin array card ke variabel baru agar tidak mengubah state langsung
        newContent[editor.index.cardIndex].components[editor.index.componentIndex].contents = e.target.innerHTML ; // Mengganti nilai contents pada komponen pertama
        setCard(newContent);
        setIsEdit(false)
        
      }
      }

      const handlePaste = (event) => {
        event.preventDefault();
        const pastedText = (event.clipboardData || window.clipboardData).getData('text/plain');
        
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);
        range.deleteContents();
        range.insertNode(document.createTextNode(pastedText));
      };

    return (
        <div  className={`relative border-2  ${props.select ? 'border-black':'border-transparent'}`}
        style={{zIndex:`${props.zIndex}`,fontSize:`2rem`,gridColumnStart: `${props.style.colStart}`,gridColumnEnd: `${props.style.colEnd}`,gridRowStart: `${props.style.rowStart}`,gridRowEnd: `${props.style.rowEnd}`}}>
         <div onClick={(e)=>{handleDoubleClick(e)}} className={`w-full h-full absolute ${isEdit ? 'pointer-events-none':'pointer-events-auto' } `}>

         </div>
          <p  onPaste={handlePaste}
          ref={editorRef} onFocus={(e)=>{ handleItemClick(e)}}  onBlur={(e)=>{HandleContentChange(e);}} dangerouslySetInnerHTML={{ __html: props.Text }} contentEditable={true} 
          className="block box-border w-full leading-[1.1] text-[2.15rem] focus:outline-none  border-transparent ">
          
          </p>
        </div>
    
    );
}

export default Text;