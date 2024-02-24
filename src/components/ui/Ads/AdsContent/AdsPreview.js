import React, { useRef,useContext, useState, useEffect } from 'react';
import { AppStateContext } from '@/components/AppStateContext';

const AdsPreview = (props) => {
const {setEditor,editor,setCard,card} = useContext(AppStateContext);
const apiKey = process.env.API_KEY || 'localhost:3000';
const handleAdd = ()=>{
    if(props.pageIndex == card.length){
        return;
    }else{

        const newCard = [...card]
        const emptyTextComponents = {
            name : 'Ads',
            style : {
              colStart: '2',
              colEnd : '10',
              rowStart: '5',
              rowEnd : '8',
            },
            zIndex: 2,
           }
        newCard[props.pageIndex].components.push(emptyTextComponents)
        setCard(newCard)

    }
}

    return (
        <>
            <div className='w-10/12 bg-secondary p-4 flex center rounded py-8' onClick={handleAdd}>
                <h1 className='text-2xl text-primary'>Add Ads</h1>
            </div>
            
        </>
    );
};

export default AdsPreview;