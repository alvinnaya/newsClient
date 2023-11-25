import React, { useState } from 'react';
import GridButton from '../Text/GridButton';
import Zindex from '../Text/zIndex';
import DeleteComponent from '../Text/DeleteComponent';
import ImageBorder from '../Image/ImageBorder';
import ShapeEditorColor from './ShapeEditorColor';
import MarginEditor from '../MarginEditor';

function ShapeEditor(props) {
    const [currentIndex,setCurrentIndex] = useState(0)


    return (
        <div className='bg-neutralPrimary1 flex flex-col m-4 w-full h-full rounded p-4'>
             <div className='flex px-6 gap-2'>
                <button onClick={()=>{setCurrentIndex(0); console.log(currentIndex)}} className={`flex center w-[6rem] text-neutralPrimary1 p-2 
                rounded-t-xl ${currentIndex == 0 ? ' border-b-0 scale-[120%] bg-neutralSecondary1':'bg-neutralSecondary3 '}  `}>
                    general
                </button>

                <button onClick={()=>{setCurrentIndex(1); console.log(currentIndex)}} className={`flex w-[6rem] center text-neutralPrimary1 p-2 
                rounded-t-xl  ${currentIndex == 1 ? ' border-b-0 scale-[120%] bg-neutralSecondary1':'bg-neutralSecondary3 '} `}>
                    style
                </button>
                
            </div>
            <div className='bg-neutralSecondary1 rounded-xl py-8 p-4'>
            {currentIndex == 0 ?
            <>
                <div className='flex flex-col'>
                    <div className='flex center gap-4'>
                        <ImageBorder/>
                    </div>

                    <div className='flex flex-col center mt-4'>
                    <GridButton/>
                    </div>
                    <div className='flex center mt-4 gap-x-4'>
                        <DeleteComponent/>
                        <Zindex/>
                    </div>
                </div>
               
            </> : 
            <>
                <ShapeEditorColor/>
            </>
            }

              
            </div>

           

        </div>
    );
}

export default ShapeEditor;