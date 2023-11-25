import { useState } from "react";


export default function Loading({showLoading,setShowLoading,handlefunc,title,text}) {
  return (
    <>
     
      {showLoading ? (
        <>
          <div className="fixed z-40 bg-neutralPrimary2 w-full h-full">
            <div className="flex center h-full">
              <div className="w-[4rem] h-[4rem] ">
              <svg className="animate-spin duration-1000" xmlns="http://www.w3.org/2000/svg" width="80%" height="80%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}