import { PrevButton } from './PrevButton';
import { NextButton } from './NextButton';
import React, { useState,useContext} from 'react';
import { AppStateContext } from '@/components/AppStateContext';

function Zindex(props) {
    const {setEditor,editor,setCard,card} = useContext(AppStateContext);
    const handledecrease = () => {
      if(card[editor.index.cardIndex].components[editor.index.componentIndex].zIndex < 1){
        return;
      }
      console.log(card[editor.index.cardIndex].components[editor.index.componentIndex].zIndex)
      const newContent = [...card]; // Menyalin array card ke variabel baru agar tidak mengubah state langsung
      newContent[editor.index.cardIndex].components[editor.index.componentIndex].zIndex -= 1;
      setCard(newContent);
      };

      const handleincrease = () => {
        
        console.log(card[editor.index.cardIndex].components[editor.index.componentIndex].zIndex)
        const newContent = [...card]; // Menyalin array card ke variabel baru agar tidak mengubah state langsung
        newContent[editor.index.cardIndex].components[editor.index.componentIndex].zIndex += 1;
        setCard(newContent);
        };
  
  
    return (
        <>
    

<div className="inline-flex justify-center gap-1">
 <PrevButton   handledecrease={handledecrease}  />

  <div>
    <label htmlFor="PaginationPage" className="sr-only">Page</label>

    <input
    readOnly
      type="number"
      className="h-8 w-12 rounded border border-gray-100 bg-preSecondary p-0 text-center text-xs font-medium text-primary [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
      min="1"
      value={card[editor.index.cardIndex]&&card[editor.index.cardIndex].components[editor.index.componentIndex]? 
        
        card[editor.index.cardIndex].components[editor.index.componentIndex].zIndex :'0'}
      id="PaginationPage"
    />
  </div>

  <NextButton   handleincrease={handleincrease}  />
</div>
        </>
    );
}

export default Zindex;