

function BaseText(props) {
   

    return (
       
             <div 
             className={`leading-tight h-full w-full p-4 rounded-lg p-2 z-[3] font-[50] h-[min-content]  ${props.style}`} style={{zIndex:`${props.zIndex}`,gridColumnStart: `${props.style.colStart}`,gridColumnEnd: `${props.style.colEnd}`,gridRowStart: `${props.style.rowStart}`,gridRowEnd: `${props.style.rowEnd}`}} >
                 <a href={props.all.urlExternal? `${props.all.urlExternal}`:"https://www.google.com/"} >
                 <p dangerouslySetInnerHTML={{ __html: props.Text }} className="block box-border w-full leading-[1.1] text-[2.15rem] focus:outline-none focus:border-zinc-300 border-transparent rounded-lg p-2 border-2 ">
                
                </p>
                 </a>
                
                
            </div>
        
           
    );
}

export default BaseText;