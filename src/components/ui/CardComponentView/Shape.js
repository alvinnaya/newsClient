
function Shape(props) {

    

   
    


    return (
        
            <div 
             className={`h-full w-full z-[3] font-[50] h-[min-content]  bg-neutralSecondary1 
             ${props.style}`} style={{borderRadius:`${props.style.borderRadius}rem`,backgroundImage:props.all.gradient ,backgroundColor: props.all.color,zIndex:`${props.zIndex}`,fontSize:`1rem`,gridColumnStart: `${props.style.colStart}`,gridColumnEnd: `${props.style.colEnd}`,gridRowStart: `${props.style.rowStart}`,gridRowEnd: `${props.style.rowEnd}`}} >
                 
                 
            </div>
    );
}

export default Shape;