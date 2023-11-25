import React, { useRef,useContext, useState, useEffect } from 'react';
import { AppStateContext } from '@/components/AppStateContext';

const ImagePreview = (props) => {
const {setEditor,editor,setCard,card} = useContext(AppStateContext);
const handleAdd = ()=>{
    if(props.pageIndex == card.length){
        return;
    }else{

        const newCard = [...card]
        const emptyTextComponents = {
            name : 'ImageContainer',
            contents: 'http://localhost:3000/uploads/1696055207493.jpg',
            style : {
              colStart: '2',
              colEnd : '10',
              rowStart: '5',
              rowEnd : '8',
              borderRadius: 1,
              margin:1,
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
                <h1 className='text-2xl text-primary'>Add Image</h1>
            </div>
            
        </>
    );
};

export default ImagePreview;