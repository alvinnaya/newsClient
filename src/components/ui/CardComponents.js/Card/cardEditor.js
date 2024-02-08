import React, { useState,useEffect,useContext } from 'react';
import { AppStateContext } from '@/components/AppStateContext';


function CardEditor(props) {

    const {setEditor,editor,setCard,card} = useContext(AppStateContext);
    const [currentIndex, setCurrentIndex] = useState(0);

    const [color, setColor] = useState(['#fafafa','#0a0a0a','#fb923c']);
    const [newcolor, setNewColor] = useState('');
    const [gradient, setGradient] = useState('');
    const [viewGradient, setViewGradient] = useState('');
    const [reload,setReload]= useState(true)
    const [gradientSettings, setGradientSettings] = useState([{
        'typeGradient': {
            'type': 'linear-gradient',
            'value': 150,
        },
        'colors':[{
            'color': '#f6d365',
            'percentage':'100'
        },
        {
            'color': '#fda085',
            'percentage':'0'
        }],

    }]);
   
    
    useEffect(() => {
        const newContent = [...card];
        const newGradientSettings = [...gradientSettings]
        console.log(newGradientSettings[0].typeGradient.type)
        console.log('newGradient')
        // console.log('gradient',newContent[editor.index.cardIndex].gradient)
        // // String gradien Anda

        if(!newContent[editor.index.cardIndex].gradient){
            console.log('newGradient')
return;
        }
        var gradientString = `${newContent[editor.index.cardIndex].gradient}`;
        // var gradientString = "radial-gradient(circle, rgba(255,229,240,1) 18%, rgba(160,255,235,1) 45%, rgba(255,43,133,1) 81%)";

// Gunakan regex untuk mencocokkan tipe gradien, nilai warna, dan nilai gradien
var match = gradientString.match(/(linear-gradient|radial-gradient)\(([^)]+)\)/);

if (match) {
    var gradientType = match[1]; // Tipe gradien (linear-gradient atau radial-gradient)
    var gradientValues = match[2].split(','); // Memisahkan nilai warna dan nilai gradien

    var colorStops = gradientValues.slice(1).map(function(colorStop) {
        var parts = colorStop.trim().split(' '); // Memisahkan nilai warna dan persentase
        return {
            'color': parts[0],
            'percentage': parts[1]
        };
    });

    console.log("Tipe gradien: " + gradientType);
    newGradientSettings[0].typeGradient.type = gradientType;
    newGradientSettings[0].typeGradient.value = parseInt(gradientValues[0].trim())
    newGradientSettings[0].colors = colorStops
    console.log(newGradientSettings)
    setGradientSettings(newGradientSettings)
} else {
    console.log("String gradien tidak valid.");
}


    },[editor])


    useEffect(() => {
        console.log('gradientSett')
            const color =  `${gradientSettings[0].colors.map((item)=> `${item.color} ${parseInt(item.percentage)}%`)}`;
            const value =gradientSettings[0].typeGradient.type == 'linear-gradient'? `${parseInt(gradientSettings[0].typeGradient.value)}deg`:`${gradientSettings[0].typeGradient.value}`
           
            const newGradient = `linear-gradient(${value}, ${color})`
            const newViewGradient = `linear-gradient(90deg, ${color})`
           
            setGradient(newGradient);
            setViewGradient(newViewGradient)
    },[gradientSettings,reload])
   

    const ChangeCardColor = (index)=>{
        setCurrentIndex(index);
        const newContent = [...card];
        console.log(card);
        console.log(color[index],editor.index.cardIndex)
        newContent[editor.index.cardIndex].gradient = '';
        newContent[editor.index.cardIndex].color = color[index];
        console.log(newContent);
        setCard(newContent);
       
      }
      const HandleNewColor = ()=>{
        const Colors = [...color]
        Colors.push(newcolor);
        console.log(Colors)
        const newContent = [...card];
        console.log(card);
        newContent[editor.index.cardIndex].gradient = '';
        newContent[editor.index.cardIndex].color = newcolor;
        console.log('newContetn',newContent);
        setCard(newContent);
        if(Colors.length == 6){
           
            return;
        }
        setColor(Colors);
      }

       const HandleColor = (value)=>{
            const Colors = [...color]
            Colors[currentIndex] = value||newcolor;
            setColor(Colors)

       }


    //    gradient

    const HandleNewColorGradient = (index)=>{
        const Colors = [...gradientSettings]
        const newColorSetting = {
            'color': `${newcolor}`,
            'percentage':'0%',
        }
        
        
        if(Colors[0].colors.length >= 3){
            return;
        }else{
            Colors[0].colors.push(newColorSetting)
             console.log(Colors)
            setGradientSettings(Colors)
        }
       
        // setColor(Colors);
      }
      

      const HandleColorGradient = ()=>{
        
        const Colors = [...gradientSettings]
      
        
        Colors[0].colors[currentIndex].color = newcolor
      
        setGradientSettings(Colors);
      }

      const HandleRangeGradient = (value)=>{
        
        const Colors = [...gradientSettings]
        const rColors = [...gradientSettings]
      
        
      
        console.log('before',Colors[0].colors[currentIndex])
        console.log('index',currentIndex ,Colors[0].colors[currentIndex].percentage)
        rColors[0].colors[currentIndex].percentage = value
        console.log('after',rColors)
        setGradientSettings(rColors);

        if(Colors[0].colors[currentIndex+1] && parseInt(Colors[0].colors[currentIndex+1].percentage) < parseInt(Colors[0].colors[currentIndex].percentage)){


            console.log('index + 1', currentIndex + 1,Colors[0].colors[currentIndex + 1].percentage)
            const temp = Colors[0].colors[currentIndex];
            Colors[0].colors[currentIndex] = Colors[0].colors[currentIndex+1];
            Colors[0].colors[currentIndex+1] = temp;
            setCurrentIndex(currentIndex+1)
            console.log('array swap', Colors[0].colors)
            return;
        } else if (Colors[0].colors[currentIndex-1] && parseInt(Colors[0].colors[currentIndex-1].percentage) > parseInt(Colors[0].colors[currentIndex].percentage)){
            console.log('index - 1', currentIndex - 1,Colors[0].colors[currentIndex - 1].percentage)
            const temp = Colors[0].colors[currentIndex];
            Colors[0].colors[currentIndex] = Colors[0].colors[currentIndex-1];
            Colors[0].colors[currentIndex-1] = temp;
            setCurrentIndex(currentIndex-1)
            console.log('array swap', Colors[0].colors)
            return;
        }


        
      }

      const HandleGradientAngle = ()=>{
        
        const Colors = [...gradientSettings];
      
        console.log('before',currentIndex,Colors[0].typeGradient.value)
        if(Colors[0].typeGradient.value >= 360){
            Colors[0].typeGradient.value =  30;
            setGradientSettings(Colors);
        }else{
            Colors[0].typeGradient.value = Colors[0].typeGradient.value + 30;
            console.log('after',Colors)
            setGradientSettings(Colors);
        }
       
      }


      const HandleNewGradient = ()=>{
        
        const newContent = [...card];
        console.log(card);

        newContent[editor.index.cardIndex].color = '';
        newContent[editor.index.cardIndex].gradient = gradient;
        console.log(newContent);
        setCard(newContent);
        if(Colors.length == 6){
           
            return;
        }
        setColor(Colors);
        gradientSettings[0].colors
      }

const HandleDeleteGradientColor = (index)=>{
    setCurrentIndex(null)
    console.log(currentIndex)
    
    if(gradientSettings[0].colors.length <= 2){
        return;
    }
    
    console.log(gradientSettings[0].colors)
    const newGradientSettings = gradientSettings;
    newGradientSettings[0].colors.splice(index, 1);
    setGradientSettings(newGradientSettings);
    setReload(!reload);
}


    return (
        <div className='bg-neutralSecondary2 border border-current flex flex-col m-4 w-full h-full gap-4 rounded p-4'>
           <div className=' flex flex-col w-full p-4 '>
            
                <h1 className='text-3xl font-extrabold text-neutralPrimary1'>Colors:</h1>
                
                <div className='flex flex-wrap p-4'>
                    {/* <div className='w-[2rem] h-[2rem] rounded-full m-2 flex center bg-neutralPrimary1 border border-neutralPrimary1 relative '
                    
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
                    })} */}

<div className='w-[3.5rem] h-[3.5rem] rounded-full m-2 flex center bg-neutralPrimary1 border border-neutralPrimary1 relative '
                
                >
                <svg className='absolute' xmlns="http://www.w3.org/2000/svg" width="80%" height="80%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                <input type="color" id="head" name="head" value={newcolor}
                onChange={(e)=>{setNewColor(e.target.value)}}
                
                onBlur={()=>{HandleNewColor(); console.log('blur1')}}
                
                className={`opacity-0  center`}
                />
                </div>
                
                    {color.map((item,index)=>{
                    return(
                    <button onMouseDown={(e) => e.preventDefault()} 
                    onClick={()=>ChangeCardColor(index)} style={{backgroundColor: `${item}`}} 
                    className={`bg-neutralPrimary1 ${currentIndex == index && 'border-neutralPrimary2 border-2' } 
                    w-[3.5rem] h-[3.5rem] rounded-full m-2 `}>
                        <div className='m-auto opacity-0 hover:opacity-[100%]  bg-neutralPrimary1 rounded-full w-[1.8rem] h-[1.8rem] relative
                        flex center m-auto'>
                         <svg xmlns="http://www.w3.org/2000/svg" 
                        className=''
                        width="60%" height="60%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>
                        <input type="color"  name="head" value={item}
                        
                        onChange={(e)=>{setNewColor(e.target.value); console.log('onChange',index,newcolor); HandleColor(e.target.value)}}
                        
                
                            
                            className={`opacity-0  center absolute w-full h-full `}
                        /> 
                        </div>
                        
                    </button>
                    )
                })}

                </div>
            </div>




            <div className=' flex flex-col w-full  gap-4 '>
            
                <h1 className='text-3xl font-extrabold text-neutralPrimary1'>Gradient:</h1>
                <div className='w-full flex '>
                    <div className='w-full flex center justify-evenly mb-6'>
                        <div 
                        onClick={HandleNewGradient}
                        style={{background: `${gradient}`}} className='w-[10rem] h-[12rem]'>
                        </div>


                        <div className='flex flex-col px-4 justify-items-center items-center'>
                            <div className='w-[2rem] h-[2rem] rounded-full m-2 flex center border 
                            border-neutralPrimary1 relative bg-neutralPrimary2'>
                                <svg className='absolute' xmlns="http://www.w3.org/2000/svg" width="80%" height="80%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                <input type="color" id="head" name="head" value={newcolor}
                                onChange={(e)=>{setNewColor(e.target.value)}}
                                onBlur={HandleNewColorGradient}
                                className={`opacity-0  center`}
                                />
                            </div>
                
                            {gradientSettings[0].colors.map((item,index)=>{
                                return(
                            <div  onClick={()=>{setCurrentIndex(index); setNewColor(item.color)}}
                             className='flex p-1 bg-neutralPrimary1 m-2 rounded-lg gap-1 
                             justify-items-center items-center'> 
                                <button  style={{backgroundColor: `${item.color}`}} className={`bg-neutralPrimary1 border-2 ${currentIndex == index && 'border-neutralSecondary2 border-2' } w-[1.6rem] h-[1.6rem] rounded-full m-0 `}>
                                    <input type="color" id="head" name="head" value={item.color}
                                    onChange={(e)=>{setNewColor(e.target.value)}}
                            
                                    onBlur={HandleColorGradient}
                                    className={`opacity-0 w-full h-full  center`}
                                        />
                                </button>

                                <button 
                                onClick={()=>{ HandleDeleteGradientColor(index);}}
                                className='text-neutralSecondary1 hover:bg-neutralPrimary2 text-2xl py-2 px-1 bg-neutralPrimary3 rounded-lg '>
                                    x
                                </button>
                            </div>      
                               
                                )
                            })}
                        </div> 


                    </div>
                </div>
                
                <div className='w-full flex justify-around items-center'>

                    <div  className='w-[70%] h-[2rem] relative  ' >
                        <div style={{background: `${viewGradient}`}} className='w-[110%] h-[2rem] 
                        pointer-events-none  ' >
                        </div>

                        {gradientSettings[0].colors.map((item,index)=>{
                            return(
                                <>
                                <div style={{left:`${ item.percentage}%`}}
                                    onClick={()=>{setCurrentIndex(index); console.log(index);}}
                                    
                                    className={`h-full w-[1.2rem] ${index == currentIndex && " pointer-events-none border-2 border-neutralSecondary2 "} z-20 bg-neutralPrimary2 absolute inset-y-0 rounded-md border border-neutralSecondary1`}>
                                </div>
                                </>                              
                            )
                        })}
                        
                        
                        <input onChange={(e)=>{HandleRangeGradient(e.target.value); }}  
                        className='w-[110%] h-full range absolute inset-y-0 opacity-0' type="range"  min="0" max="100" value={gradientSettings[0].colors[currentIndex] ? gradientSettings[0].colors[currentIndex].percentage:'50%'} /> 
                       
                    </div>

                    
                    <div className='text-sm ml-10 text-neutralPrimary1 w-[30%] flex center'>
                        <button 
                        onClick={HandleGradientAngle}
                        className='bg-neutralSecondary2 hover:bg-neutralPrimary2 
                        hover:text-neutralSecondary1 p-2 border-current border rounded-full w-[3rem] h-[3rem] font-semibold'>
                        {`${gradientSettings[0].typeGradient.value}`}
                        </button>
                    </div>


                </div>





          

         
                
            </div>

         

        </div>
    );
}

export default CardEditor;