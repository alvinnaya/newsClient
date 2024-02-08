import React, { useState,useContext } from 'react';
import { AppStateContext } from '@/components/AppStateContext';


const TextHoc = (OriginalComponent) => {
    
  function NewComponent(props) {
    const {setEditor,editor,setCard,card} = useContext(AppStateContext);
  //render OriginalComponent and pass on its props.
  const handleStyle = (style,value,className) => {
    
    console.log('className',className);
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);

    


      const selectedText = range.textContent || range.toString() ;
      const clonedContents = range.cloneContents();
      const div = document.createElement('div');
      div.appendChild(clonedContents);
      const html = div.innerHTML;
      console.log('content',html);
      console.log('text',selectedText);
      if (!editor.ref.current.contains(range.commonAncestorContainer)) {
        return; // Teks yang dipilih tidak berada di dalam editor
      }

    
    const span = document.createElement('span');
    
    if(className){
      console.log('ada class')
      span.className = `${className}`;
    }
    span.style[style] = value;
    span.style.display = 'inline';
    span.innerHTML = selectedText;
    range.deleteContents();
    range.insertNode(span);
    const newCard = [...card]; // Menyalin array card ke variabel baru agar tidak mengubah state langsung
    newCard[editor.index.cardIndex].components[editor.index.componentIndex].contents = editor.ref.current.innerHTML ; // Mengganti nilai contents pada komponen pertama
    setCard(newCard);
   
    
  }
    return <OriginalComponent 
    {...props} handleStyle={(style,value,className)=>{handleStyle(style,value,className)}} />;
  }
  return NewComponent;
};
export default TextHoc;