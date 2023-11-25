import { Children, useState } from "react";


export default function ReuseModalButton({showModal,children,bg}) {
  return (
    <>
     
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className={`relative ${bg? bg:'bg-neutralPrimary1 border border-current'} rounded-xl p-4 w-auto my-6 mx-auto max-w-3xl`}>
              {/*content*/}
              <div className="border-0  p-6 center  relative flex flex-col outline-none focus:outline-none">
                {/*body*/}
              {children}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}