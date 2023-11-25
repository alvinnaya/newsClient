

const HeadingText = (props) => {
    return (
        <>
        <a href={props.all.urlExternal? `${props.all.urlExternal}`:"https://www.google.com/"}
         style={{zIndex:`${props.zIndex}`,gridColumnStart: `${props.style.colStart}`,gridColumnEnd: `${props.style.colEnd}`,gridRowStart: `${props.style.rowStart}`,gridRowEnd: `${props.style.rowEnd}`}}
        > 
        <h1 style={{fontSize:`4rem`,}} 
         dangerouslySetInnerHTML={{ __html: props.Text }} className="block box-border w-full leading-[1.1] text-[2.15rem] focus:outline-none focus:border-zinc-300 border-transparent rounded-lg p-2 border-2 ">
        
        </h1>
        </a>
        
    </>
    );
};

export default HeadingText;