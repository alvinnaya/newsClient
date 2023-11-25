import React from 'react';

const Tabs = (setIndex) => {
    return (
        <>
        <ul
  class="mb-5 flex list-none flex-col flex-wrap pl-0 md:flex-row"
  role="tablist"
  data-te-nav-ref>
  <li role="presentation" class="flex-auto text-center">
    <button onClick={()=>setIndex}
      class="my-2 block rounded bg-neutral-100 px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 data-[te-nav-active]:!bg-primary-100 data-[te-nav-active]:text-primary-700 dark:bg-neutral-700 dark:text-white dark:data-[te-nav-active]:text-primary-700 md:mr-4"
      >Home</button
    >
  </li>
  
</ul>   
        
        </>
    );
};

export default Tabs;