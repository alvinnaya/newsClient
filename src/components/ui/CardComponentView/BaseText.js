

function BaseText(props) {
   

    return (
        
            <div 
             className={`leading-tight h-full w-full p-0 rounded-lg m-0 z-[3] font-[200] h-[min-content]  ${props.style}`} style={{zIndex:`${props.zIndex}`,gridColumnStart: `${props.style.colStart}`,gridColumnEnd: `${props.style.colEnd}`,gridRowStart: `${props.style.rowStart}`,gridRowEnd: `${props.style.rowEnd}`}} >
                <p dangerouslySetInnerHTML={{ __html: props.Text }} className="block box-border w-full leading-[1.1] text-[2.15rem] focus:outline-none focus:border-zinc-300 border-transparent rounded-lg p-2 border-2 ">
                
                </p>
            </div>
    );
}

export default BaseText;