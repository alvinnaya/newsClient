// AppStateContext.js
'use client';
import React, { createContext, useState,useEffect } from 'react';
import { Draft } from '@/Data/Draft';

export const AppStateContext = createContext();

export const AppStateProvider = (props) => {
  const [editor, setEditor] = useState({
    editor : 'none',
    index : {
      cardIndex : '',
      componentIndex : ''
    },
    ref : '',
  });

  const [componentsClipBoard, setComponentsClipBoard] = useState([])
  const [componentsSelect, setComponentsSelect] = useState([])

  const [card, setCard] = useState([
   {
    page : '1',
    color: '',
    gradient:'',
    components:[{
     name : 'Text',
     contents: 'Itali merupakan tempat yang sempurna bagi wisatawan yang ingin merasakan keindahan alam, yang dimana bla bla bla and then',
     style : {
      colStart: '2',
      colEnd : '10',
      rowStart: '2',
      rowEnd : '4',
     },
     zIndex: 1,
     
    },{
      name : 'Text',
      contents: 'Itali merupakan tempat  Italia adalah negara yang menawarkan.',
      style: 'col-start-2 col-span-8 row-start-5 row-span-3',
      style : {
        colStart: '2',
        colEnd : '10',
        rowStart: '5',
        rowEnd : '8',
      },
      zIndex: 1,
      
     },]
   }
   
  ]);


  const [adsCard, setAdsCard] = useState(
    {
     page : '1',
     components:[{
      name : 'Text',
      contents: 'Itali merupakan tempat yang sempurna bagi wisatawan yang ingin merasakan keindahan alam, yang dimana bla bla bla and then',
      style : {
       colStart: '2',
       colEnd : '10',
       rowStart: '2',
       rowEnd : '4',
      },
      zIndex: 1,
      
     },{
       name : 'Text',
       contents: 'Itali merupakan tempat  Italia adalah negara yang menawarkan.',
       style: 'col-start-2 col-span-8 row-start-5 row-span-3',
       style : {
         colStart: '2',
         colEnd : '10',
         rowStart: '5',
         rowEnd : '8',
       },
       zIndex: 1,
       
      },]
    }
    
   );

  // Definisikan fungsi-fungsi lain untuk memperbarui state global

  return (
    <AppStateContext.Provider value={{ editor, setEditor,card,setCard,adsCard,setAdsCard,componentsSelect,setComponentsSelect,componentsClipBoard,setComponentsClipBoard }}>
      {props.children}
    </AppStateContext.Provider>
  );
};
