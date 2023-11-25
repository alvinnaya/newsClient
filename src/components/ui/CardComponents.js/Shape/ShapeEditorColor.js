import React, { useState,useEffect,useContext } from 'react';
import { AppStateContext } from '@/components/AppStateContext';
import ShapeGradientEditor from './ShapeGradientEditor';


function ShapeEditorColor(props) {

    const {setEditor,editor,setCard,card} = useContext(AppStateContext);
    const [currentIndex, setCurrentIndex] = useState(0);

    const [color, setColor] = useState(['','#00c6fb','#0093E9']);
    const [newcolor, setNewColor] = useState('');
    

   
    
  


    
   

    const ChangeCardColor = (index)=>{
        setCurrentIndex(index);
        const newContent = [...card];
        console.log(card);
        console.log(color[index],editor.index.cardIndex)
        newContent[editor.index.cardIndex].components[editor.index.componentIndex].color = color[index];
        newContent[editor.index.cardIndex].components[editor.index.componentIndex].gradient = '';
     
        console.log(newContent);
        setCard(newContent);
       
      }
      const HandleNewColor = ()=>{
        const Colors = [...color]
        Colors.push(newcolor);
        console.log(Colors)
        const newContent = [...card];
        console.log(card);
        newContent[editor.index.cardIndex].components[editor.index.componentIndex].color = newcolor;
        newContent[editor.index.cardIndex].components[editor.index.componentIndex].gradient = '';

        console.log('newContetn',newContent);
        setCard(newContent);
        if(Colors.length == 6){
           
            return;
        }
        setColor(Colors);
      }

       const HandleColor = ()=>{
            const Colors = [...color]
            Colors[currentIndex] = newcolor;
            setColor(Colors)

       }


   

    return (
        <div className='border border-current flex flex-col w-full h-full  rounded p-2'>
            <div className='flex px-6 gap-2'>
                <button onClick={()=>{setCurrentIndex(0); console.log(currentIndex)}} className={`flex center w-[6rem] text-neutralPrimary1 p-2 
                rounded-t-xl ${currentIndex == 0 ? ' border-b-0 scale-[120%] bg-neutralSecondary2':'bg-neutralSecondary3 '}  `}>
                    Colors
                </button>

                <button onClick={()=>{setCurrentIndex(1); console.log(currentIndex)}} className={`flex w-[6rem] center text-neutralPrimary1 p-2 
                rounded-t-xl  ${currentIndex == 1 ? ' border-b-0 scale-[120%] bg-neutralSecondary2':'bg-neutralSecondary3 '} `}>
                    Gradient
                </button>
                
            </div>

            {currentIndex == 0 ?
            <>

                <div className=' flex flex-col w-full m-0 p-4 bg-neutralSecondary2'>
                
                    <h1 className='text-3xl font-extrabold text-neutralPrimary1'>Colors:</h1>
                    
                    <div className='flex flex-wrap p-4'>
                        <div className='w-[2rem] h-[2rem] rounded-full m-2 flex center bg-neutralPrimary1 border border-neutralPrimary1 relative '
                        
                        >
                        <svg className='absolute' xmlns="http://www.w3.org/2000/svg" width="80%" height="80%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        <input type="color" id="head" name="head" value={newcolor}
                        onChange={(e)=>{setNewColor(e.target.value)}}
                        
                        onBlur={HandleNewColor}
                        className={`opacity-0  center`}
                        />
                        </div>
                    
                        {color.map((item,index)=>{
                            return(
                            <button onClick={()=>ChangeCardColor(index)} style={{backgroundColor: `${item}`}} className={`bg-neutralPrimary1 ${currentIndex == index && 'border-neutralPrimary2 border-2' } w-[2rem] h-[2rem] rounded-full m-2 `}>
                                <input type="color" id="head" name="head" value={item}
                                onChange={(e)=>{setNewColor(e.target.value)}}
                        
                                onBlur={HandleColor}
                        className={`opacity-0  center`}
                        />
                            </button>
                            )
                        })}

                    </div>
                </div>

            </> :
            <>



          <ShapeGradientEditor/>

            
            </>
            }





         

        </div>
    );
}

export default ShapeEditorColor;