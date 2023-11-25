

const HeadingText = (props) => {
    return (
        <>
        <h1 style={{zIndex:`${props.zIndex}`,fontSize:`4rem`,gridColumnStart: `${props.style.colStart}`,gridColumnEnd: `${props.style.colEnd}`,gridRowStart: `${props.style.rowStart}`,gridRowEnd: `${props.style.rowEnd}`}} 
         dangerouslySetInnerHTML={{ __html: props.Text }} className="block box-border w-full leading-[1.1] text-[2.15rem] focus:outline-none focus:border-zinc-300 border-transparent rounded-lg p-2 border-2 ">
        
        </h1>
    </>
    );
};

export default HeadingText;