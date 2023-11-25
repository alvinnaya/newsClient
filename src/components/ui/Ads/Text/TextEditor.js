import React, { useState, useContext } from 'react';useState
import DropdownButton from '../../DropdownButton';
import ButtonText from '../../CardComponents.js/Text/ButtonText';
import NewButtonText from '../../CardComponents.js/Text/newButtonText';
import GridButton from '../../CardComponents.js/Text/GridButton';
import Zindex from '../../CardComponents.js/Text/zIndex';
import DeleteComponent from '../../CardComponents.js/Text/DeleteComponent';
import { AppStateContext } from '@/components/AppStateContext';
function TextEditor(props) {
    const {setEditor,editor,setCard,card} = useContext(AppStateContext);
    const [currentUrl, setCurrentUrl] = useState('')

    const handleSetUrl = ()=>{

        const newContent = [...card];
        newContent[editor.index.cardIndex].components[editor.index.componentIndex].urlExternal=currentUrl;
        setCard(newContent);
        console.log('image telah di update')
        console.log(newContent)
      }

    return (
        <div className='bg-secondary flex flex-col m-4 w-full h-full rounded p-4'>
            <div className='flex center'>
                <DropdownButton ButtonStyle={''} NameButton={'Font size'} >
                    
                    <NewButtonText style={'fontSize'} name={'ExtraLarge'} value={'4rem'}/>
                    <NewButtonText style={'fontSize'} name={'Large'} value={'3rem'}/>
                    <NewButtonText style={'fontSize'} name={'medium'} value={'2.5rem'}/>
                    <NewButtonText style={'fontSize'} name={'small'} value={'2.15rem'}/>
                </DropdownButton>
                <DropdownButton ButtonStyle={''} NameButton={'Bold'} >
                   
                    <NewButtonText style={'fontWeight'} name={'ExtraBold'} value={'800'}/>
                    <NewButtonText style={'fontWeight'} name={'Bold'} value={'700'}/>
                    <NewButtonText style={'fontWeight'} name={'SemiBold'} value={'600'}/>
                    <NewButtonText style={'fontWeight'} name={'medium'} value={'500'}/>
                    <NewButtonText style={'fontWeight'} name={'Regular'} value={'400'}/>
                    <NewButtonText style={'fontWeight'} name={'light'} value={'300'}/>
                    <NewButtonText style={'fontWeight'} name={'Extralight'} value={'200'}/>
                    <NewButtonText style={'fontWeight'} name={'Thin'} value={'100'}/>
                </DropdownButton>
                <DropdownButton ButtonStyle={''} NameButton={'Line Height'} >
                   
                   <NewButtonText style={'lineHeight'} name={'1.75'} value={'1.75'}/>
                   <NewButtonText style={'lineHeight'} name={'1.5'} value={'1.5'}/>
                   <NewButtonText style={'lineHeight'} name={'1.25'} value={'1.25'}/>
                   <NewButtonText style={'lineHeight'} name={'1'} value={'1'}/>
               </DropdownButton>
               
               
            </div>

            <div className='flex center mt-4'>
              <GridButton/>
                
            </div>
            <div className='flex center mt-4 gap-x-4'>
                <DeleteComponent/>
                <Zindex/>
                
            </div>
            <div className='flex items-end justify-around w-[90%] text-sm'> 
                    <div className="">
                            <label
                                htmlFor="formFileLg"
                                className="mb-2 inline-block text-neutral-200 dark:text-neutral-200"
                            >
                            input Url
                            </label>
                            <input
                                className="relative m-0 text-md block w-full p-2 min-w-0 flex-auto cursor-pointer rounded border border-solid border-neutral-300 bg-clip-padding font-normal text-neutral-700 transition duration-300 ease-in-out "
                                type="text" onChange={(e)=>setCurrentUrl(e.target.value)} 
                            />
                      </div>
                      <button
                                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none  ease-linear transition-all duration-150"
                                type="button"
                                onClick={()=>handleSetUrl(currentUrl)}>
                                set url
                      </button>
                     
            </div> 

        </div>
    );
}

export default TextEditor;