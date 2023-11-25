import React, { useState,useContext } from 'react';
import { AppStateContext } from '@/components/AppStateContext';


const ButtonText = (props) => {

    const {setEditor,editor,setCard,card} = useContext(AppStateContext);
  
  const handleBold = () => {
    const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      const selectedText = range.toString();
      console.log(selectedText)
      if (!editor.ref.current.contains(range.commonAncestorContainer)) {
        return; // Teks yang dipilih tidak berada di dalam editor
      }
    const span = document.createElement('span');
    span.style[props.style] = props.value;
    span.textContent = selectedText;
    range.appendChild(span)
    const newCard = [...card]; // Menyalin array card ke variabel baru agar tidak mengubah state langsung
    newCard[editor.index.cardIndex].components[editor.index.componentIndex].contents = editor.ref.current.innerHTML ; // Mengganti nilai contents pada komponen pertama
    setCard(newCard);
    //console.log(newCard)
    
   
 

  // Mengekspansi rentang seleksi untuk mengelilingi span baru


 
  };


  return (
    <>
 
            <button onClick={handleBold} className="px-2 py-1 bg-white">bold</button>
    
    </>
  );
};

export default ButtonText;
