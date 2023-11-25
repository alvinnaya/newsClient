import React, { useRef,useContext, useState, useEffect } from 'react';
import { NextButton } from '../Text/NextButton';
import { AppStateContext } from '@/components/AppStateContext';
import { PrevButton } from '../Text/PrevButton';

const SwapButton = () => {
    const {setEditor,editor,setCard,card} = useContext(AppStateContext);


    const handledecrease = () => {
        console.log('prev')
        console.log(card[editor.index.cardIndex].components[editor.index.componentIndex].style.flexDirection )
        const newContent = [...card];
        const num = newContent[editor.index.cardIndex].components[editor.index.componentIndex].style.flexDirection // Menyalin array card ke variabel baru agar tidak mengubah state langsung
        newContent[editor.index.cardIndex].components[editor.index.componentIndex].style.flexDirection = 'row';
        setCard(newContent);
        };
      
        const handleincrease = () => {
          console.log('next')
          console.log(card[editor.index.cardIndex].components[editor.index.componentIndex].style.flexDirection )
          const newContent = [...card]; // Menyalin array card ke variabel baru agar tidak mengubah state langsung
          const num = newContent[editor.index.cardIndex].components[editor.index.componentIndex].style.flexDirection // Menyalin array card ke variabel baru agar tidak mengubah state langsung
          newContent[editor.index.cardIndex].components[editor.index.componentIndex].style.flexDirection = 'row-reverse';
          setCard(newContent);
          };



    return (
        <div class="flex items-center gap-2">
           
        <span class="text-sm text-primary">Swap</span>
        <PrevButton   handledecrease={handledecrease}  />
        <input
          
          className="h-8 w-12 rounded border border-primary bg-secondary p-0 text-center text-xs font-medium text-prePrimary [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
          Value={card[editor.index.cardIndex]&&card[editor.index.cardIndex].components[editor.index.componentIndex]?
            card[editor.index.cardIndex].components[editor.index.componentIndex].style.flexDirection : 'row'
          }
          
        />
        <NextButton   handleincrease={handleincrease}  />
      </div>
    );
};

export default SwapButton;