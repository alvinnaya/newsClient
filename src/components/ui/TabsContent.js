import React from 'react';

const TabsContent = ({index,currentIndex,children}) => {
    return (
        <>
            {index == currentIndex ? (
        <>
         {children}
        </>
      ) : null}
        </>
    );
};

export default TabsContent;