import React,{useState}from 'react';
import DropdownButton from '../../DropdownButton';
import ButtonText from './ButtonText';
import NewButtonText from './newButtonText';
import GridButton from './GridButton';
import Zindex from './zIndex';
import DeleteComponent from './DeleteComponent';
import TextColor from './TextColor';

function TextEditor(props) {

const [currentIndex,setCurrentIndex] = useState(0)

    return (
        <div 
        className='bg-neutralPrimary1 flex flex-col m-4 w-full h-full rounded p-4'>
            <div className='flex px-6 gap-2' onMouseDown={(e) => e.preventDefault()}>
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
 <div onMouseDown={(e) => e.preventDefault()} className='flex center'>
     <DropdownButton ButtonStyle={''} NameButton={'Font size'} >
         <NewButtonText style={'fontSize'} name={'3 x ExtraLarge'} value={'6.5rem'}/>
         <NewButtonText style={'fontSize'} name={'2 x ExtraLarge'} value={'5.5rem'}/>
         <NewButtonText style={'fontSize'} name={'ExtraLarge'} value={'4.5rem'}/>
         <NewButtonText style={'fontSize'} name={'Large'} value={'3rem'}/>
         <NewButtonText style={'fontSize'} name={'medium'} value={'2.5rem'}/>
         <NewButtonText style={'fontSize'} name={'small'} value={'2.15rem'}/>
     </DropdownButton>
     <DropdownButton ButtonStyle={''} NameButton={'Bold'} >
     
         <NewButtonText style={'fontWeight'} name={'ExtraBold'} value={'800'}/>
         <NewButtonText style={'fontWeight'} name={'Bold'} value={'700'}/>
         <NewButtonText style={'fontWeight'} name={'SemiBold'} value={'600'}/>
         <NewButtonText style={'fontWeight'} name={'medium'} value={'500'}/>
         <NewButtonText style={'fontWeight'} name={'Regular'} class={'400'} value={'400'}/>
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
 </>: '' }
 {
currentIndex == 1 ?
<>
<TextColor></TextColor>
</>:''
 }
</div> 
               
           

        </div>
    );
}

export default TextEditor;