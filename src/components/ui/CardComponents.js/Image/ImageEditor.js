import React, { useState } from 'react';
import GridButton from '../Text/GridButton';
import Zindex from '../Text/zIndex';
import DeleteComponent from '../Text/DeleteComponent';
import ImageBorder from './ImageBorder';
import ImageModal from './ImageModal';
import MarginEditor from '../MarginEditor';

function ImageEditor(props) {



    return (
        <div className='bg-secondary flex flex-col m-4 w-full h-full rounded p-4'>
            <div className='flex center gap-4'>
            
                
               <ImageBorder/>
               <ImageModal/>
               

              
                
            </div>

            <div className='flex flex-col center mt-4'>
              <GridButton/>
                
            </div>
            <div className='flex center mt-4 gap-x-4'>
                <DeleteComponent/>
                <Zindex/>
                
            </div>

        </div>
    );
}

export default ImageEditor;