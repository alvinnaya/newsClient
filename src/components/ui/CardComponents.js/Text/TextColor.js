import React,{useState}from 'react';
import TextHoc from './TextHoc';

function TextColor(props) {

    const handleStyle = props.handleStyle

const [color, setColor] = useState(['','#00c6fb','#0093E9']);
const [newcolor, setNewColor] = useState('');
const [currentIndex, setCurrentIndex] = useState(0);



const HandleColor = ()=>{
    const Colors = [...color]
    Colors[currentIndex] = newcolor;
    setColor(Colors)
    handleStyle('color',`${newcolor}`)

}



const HandleNewColor = ()=>{
    const Colors = [...color]
    Colors.push(newcolor);
    console.log(Colors)
    if(Colors.length >= 6){
       
        return;
    }
    setColor(Colors);
  }



    return (
       
            

 <>
  <div className=' flex flex-col w-full p-4 '>
            
            <h1 className='text-3xl font-extrabold text-neutralPrimary1'>Colors:</h1>
            
            <div className='flex flex-wrap p-4'>
                <div className='w-[3.5rem] h-[3.5rem] rounded-full m-2 flex center bg-neutralPrimary1 border border-neutralPrimary1 relative '
                
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
                    <button onClick={()=>{setCurrentIndex(index); handleStyle('color',`${item}`)}} style={{backgroundColor: `${item}`}} 
                    className={`bg-neutralPrimary1 ${currentIndex == index && 'border-neutralPrimary2 border-2' } 
                    w-[3.5rem] h-[3.5rem] rounded-full m-2 `}>
                        <div className='m-auto opacity-0 hover:opacity-[100%]  bg-neutralPrimary1 rounded-full w-[1.8rem] h-[1.8rem] relative
                        flex center m-auto'>
                         <svg xmlns="http://www.w3.org/2000/svg" 
                        className=''
                        width="60%" height="60%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>
                        <input type="color" id="head" name="head" value={item}
                        onChange={(e)=>{setNewColor(e.target.value)}}
                
                            onBlur={HandleColor}
                            className={`opacity-0  center absolute w-full h-full `}
                        /> 
                        </div>
                        
                    </button>
                    )
                })}

            </div>
        </div>
    
 </>
               
           

    );
}

export default  TextHoc(TextColor);