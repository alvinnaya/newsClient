import React, { useRef,useContext, useState, useEffect } from 'react';
import { AppStateContext } from '@/components/AppStateContext';
import { PrevButton } from './PrevButton';
import { NextButton } from './NextButton';

function GridButton(props) {
  const {setEditor,editor,setCard,card} = useContext(AppStateContext);
  const [gridPosition, setGridPosition] = useState({ rowStart: 2, rowEnd:3, colStart:2,colEnd:8})

// useEffect(()=>{
//   console.log('1')
//   if(card[editor.index.cardIndex]&&card[editor.index.cardIndex].components[editor.index.componentIndex]){
//     setGridPosition( card[editor.index.cardIndex].components[editor.index.componentIndex].grid);
//     console.log(gridPosition)
//   } 
// },[card[editor.index.cardIndex].components[editor.index.componentIndex]])




const handledecrease = (position) => {
  console.log('prev')
  if(card[editor.index.cardIndex].components[editor.index.componentIndex].style[position] <= 1){
    return;
  }
  console.log(card[editor.index.cardIndex].components[editor.index.componentIndex].style[position] )
  const newContent = [...card];
  const num = parseInt(newContent[editor.index.cardIndex].components[editor.index.componentIndex].style[position]) // Menyalin array card ke variabel baru agar tidak mengubah state langsung
  newContent[editor.index.cardIndex].components[editor.index.componentIndex].style[position] = num - 1;
  setCard(newContent);
  };

  const handleincrease = (position) => {
    console.log('next')
    if(card[editor.index.cardIndex].components[editor.index.componentIndex].style[position] >= 13){
      return;
    }
    console.log(card[editor.index.cardIndex].components[editor.index.componentIndex].style[position] )
    const newContent = [...card]; // Menyalin array card ke variabel baru agar tidak mengubah state langsung
    const num = parseInt(newContent[editor.index.cardIndex].components[editor.index.componentIndex].style[position]) // Menyalin array card ke variabel baru agar tidak mengubah state langsung
    newContent[editor.index.cardIndex].components[editor.index.componentIndex].style[position] = num + 1;
    setCard(newContent);
    };


    return (
        <div className='w-full flex flex-col center my-4'>
            <div className='flex flex-row center w-full my-2 gap-8'>
        <div className='flex flex-col gap-4'>
            
            <h1>column</h1>
  
           <div className="flex items-center gap-2">
           
            <span className="text-sm text-primary">start</span>
            <PrevButton   handledecrease={()=>{handledecrease('colStart')}}  />
            <input 
            readOnly
              
              className="h-8 w-12 rounded border bg-preSecondary p-0 text-center text-xs font-medium text-primary [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
              value={card[editor.index.cardIndex]&&card[editor.index.cardIndex].components[editor.index.componentIndex]?
                card[editor.index.cardIndex].components[editor.index.componentIndex].style.colStart : '0'
              }
              
            />
            <NextButton   handleincrease={()=>{handleincrease('colStart')}}  />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-primary">end</span>
            <PrevButton   handledecrease={()=>{handledecrease('colEnd')}}  />
            <input
              readOnly
              className="h-8 w-12 rounded border  bg-preSecondary p-0 text-center text-xs font-medium text-primary [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
              value={card[editor.index.cardIndex]&&card[editor.index.cardIndex].components[editor.index.componentIndex]?
                card[editor.index.cardIndex].components[editor.index.componentIndex].style.colEnd : '0'
              }
              
            />
            <NextButton   handleincrease={()=>{handleincrease('colEnd')}} />
          </div>
        
        </div>
        <div className='flex flex-col gap-4'>
            
            <h1>row</h1>
  
           <div className="flex items-center gap-2">
           
            <span className="text-sm text-preSecondary">start</span>
            <PrevButton   handledecrease={()=>{handledecrease('rowStart')}}  />
            <input
              readOnly
              className="h-8 w-12 rounded border  bg-preSecondary p-0 text-center text-xs font-medium text-prePrimary [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
              value={card[editor.index.cardIndex]&&card[editor.index.cardIndex].components[editor.index.componentIndex]?
                card[editor.index.cardIndex].components[editor.index.componentIndex].style.rowStart : '0'
              }
              
            />
            <NextButton   handleincrease={()=>{handleincrease('rowStart')}}  />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-preSecondary">end</span>
            <PrevButton   handledecrease={()=>{handledecrease('rowEnd')}}  />
            <input
              readOnly
              className="outline-0 h-8 w-12 rounded border  bg-preSecondary p-0 text-center text-xs font-medium text-primary [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
              value={card[editor.index.cardIndex]&&card[editor.index.cardIndex].components[editor.index.componentIndex]?
                card[editor.index.cardIndex].components[editor.index.componentIndex].style.rowEnd : '0'
              }
              
            />
            <NextButton   handleincrease={()=>{handleincrease('rowEnd')}} />
          </div>
        
        </div>
        </div>
        </div>
        
    );
}

export default GridButton;