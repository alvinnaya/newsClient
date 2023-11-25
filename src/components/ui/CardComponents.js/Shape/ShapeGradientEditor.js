import React, { useState,useEffect,useContext } from 'react';
import { AppStateContext } from '@/components/AppStateContext';


function ShapeGradientEditor(props) {

    const {setEditor,editor,setCard,card} = useContext(AppStateContext);
    const [currentIndex, setCurrentIndex] = useState(0);

    const [color, setColor] = useState(['','#00c6fb','#0093E9']);
    const [newcolor, setNewColor] = useState('');
    const [gradient, setGradient] = useState('');
    const [viewGradient, setViewGradient] = useState('');
    const [reload,setReload]= useState(true)
    const [currentIndexTab,setCurrentIndexTab] = useState(0)

    const [gradientSettings, setGradientSettings] = useState([{
        'typeGradient': {
            'type': 'linear-gradient',
            'value': 90,
        },
        'colors':[{
            'color': '#00c6fb',
            'percentage':'100'
        },
        {
            'color': '#00c6fb',
            'percentage':'0'
        }],

    }]);
    const [colorGradient, setColorGradient] = useState(['','#00c6fb']);
    
    useEffect(() => {
        const newContent = [...card];
        const newGradientSettings = [...gradientSettings]
        console.log(newGradientSettings[0].typeGradient.type)
        console.log('newGradient')
        // console.log('gradient',newContent[editor.index.cardIndex].gradient)
        // // String gradien Anda

        if(!newContent[editor.index.cardIndex].components[editor.index.componentIndex].gradient){
            console.log('newGradient')
return;
        }
     
        var gradientString = `${ newContent[editor.index.cardIndex].components[editor.index.componentIndex].gradient}`;
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
    console.log('a')
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

        newContent[editor.index.cardIndex].components[editor.index.componentIndex].color = '';
        newContent[editor.index.cardIndex].components[editor.index.componentIndex].gradient = gradient;
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
            <>



            <div className=' flex flex-col w-full m-0 p-4 bg-neutralSecondary2 '>
                
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

            
            </>
           
    );
}

export default ShapeGradientEditor;