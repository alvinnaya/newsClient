import React, { useState,useContext } from 'react';
import { AppStateContext } from '@/components/AppStateContext';
import TextHoc from './TextHoc';


const NewButtonText = (props) => {

    const handleStyle = props.handleStyle
    
  return (
    <>
 
            <button onClick={()=>{handleStyle(props.style,props.value, props.class)}} className="text-primary px-2 py-1 bg-preSecondary">{props.name}
            
            </button>
    
    </>
  );
};

export default TextHoc(NewButtonText);
