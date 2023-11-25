import React, { useRef,useContext, useState, useEffect } from 'react';
import { NextButton } from '../../CardComponents.js/Text/NextButton';
import { AppStateContext } from '@/components/AppStateContext';
import { PrevButton } from '../../CardComponents.js/Text/PrevButton';

const ImageBorder = () => {
    const {setEditor,editor,setCard,card} = useContext(AppStateContext);


    const handledecrease = () => {
        console.log('prev')
        if(card[editor.index.cardIndex].components[editor.index.componentIndex].style.borderRadius <= 0){
          return;
        }
        console.log(card[editor.index.cardIndex].components[editor.index.componentIndex].style.borderRadius )
        const newContent = [...card];
        const num = newContent[editor.index.cardIndex].components[editor.index.componentIndex].style.borderRadius // Menyalin array card ke variabel baru agar tidak mengubah state langsung
        newContent[editor.index.cardIndex].components[editor.index.componentIndex].style.borderRadius = num - 0.125;
        setCard(newContent);
        };
      
        const handleincrease = () => {
          console.log('next')
          if(card[editor.index.cardIndex].components[editor.index.componentIndex].style.borderRadius >= 1.5){
            return;
          }
          console.log(card[editor.index.cardIndex].components[editor.index.componentIndex].style.borderRadius )
          const newContent = [...card]; // Menyalin array card ke variabel baru agar tidak mengubah state langsung
          const num = newContent[editor.index.cardIndex].components[editor.index.componentIndex].style.borderRadius // Menyalin array card ke variabel baru agar tidak mengubah state langsung
          newContent[editor.index.cardIndex].components[editor.index.componentIndex].style.borderRadius = num + 0.125;
          setCard(newContent);
          };



    return (
        <div class="flex items-center gap-2">
           
        <span class="text-sm text-primary">Border Radius</span>
        <PrevButton   handledecrease={handledecrease}  />
        <input
          
          className="h-8 w-12 rounded border border-primary bg-secondary p-0 text-center text-xs font-medium text-prePrimary [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
          Value={card[editor.index.cardIndex]&&card[editor.index.cardIndex].components[editor.index.componentIndex]?
            card[editor.index.cardIndex].components[editor.index.componentIndex].style.borderRadius : '0'
          }
          
        />
        <NextButton   handleincrease={handleincrease}  />
      </div>
    );
};

export default ImageBorder;