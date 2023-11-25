import Image from "next/image";



function BaseImage(props) {
      
console.log(props.all.urlExternal)
console.log("style",props.zIndex)

    return (

      <div 
      className={`leading-tight h-full w-full p-0  z-[3] font-[50] h-[min-content]  ${props.style}`} style={{zIndex:`${props.zIndex}`,fontSize:`1rem`,gridColumnStart: `${props.style.colStart}`,gridColumnEnd: `${props.style.colEnd}`,gridRowStart: `${props.style.rowStart}`,gridRowEnd: `${props.style.rowEnd}`}} >
           <a href={props.all.urlExternal? `${props.all.urlExternal}`:"https://www.google.com/"}>
          <div className='w-full h-full bg-clip-border' style={{}}>
                    <Image unoptimized width={100} height={100} className={`w-full h-full object-cover`} style={{borderRadius:`${props.style.borderRadius}rem`}} src={props.all.contents} alt={`gambar`}/>
                  </div>
        </a>
          
     </div>
        
           
    );
}

export default BaseImage;