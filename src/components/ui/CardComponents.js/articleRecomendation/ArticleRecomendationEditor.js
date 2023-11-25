import React, { useState } from 'react';
import GridButton from '../Text/GridButton';
import Zindex from '../Text/zIndex';
import ImageBorder from '../Image/ImageBorder';
import DeleteComponent from '../Text/DeleteComponent';
import MarginEditor from '../MarginEditor';
import SwapButton from './SwapButton';
import TextSize from '../TextSize';
import MetaModal from './MetaModal';

const ArticleRecomendationEditor = (props) => {
    return (
        <div className='bg-secondary flex flex-col m-4 w-full h-full rounded p-4'>
        <div className='flex center gap-4'>
        
            
           <ImageBorder/>
           <MetaModal/>
           

          
            
        </div>
        <div className='flex my-4 center gap-4'>
         
           <MarginEditor/>
           <SwapButton/>
            <TextSize/>
        </div>

        <div className='flex center mt-4'>
          <GridButton/>
            
        </div>
        <div className='flex center mt-4 gap-x-4'>
            <DeleteComponent/>
            <Zindex/>
            
        </div>

    </div>
    );
};

export default ArticleRecomendationEditor;