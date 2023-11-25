import React from 'react';

function SliderContainer(props) {
    return (
        <>
        
            <div style={{transform:`translateX(-${100*props.index}%)`}} className="bg-red flex w-full h-full duration-300 ">
                {props.children}
                
            </div>

            
        </>
    );
}

export default SliderContainer;