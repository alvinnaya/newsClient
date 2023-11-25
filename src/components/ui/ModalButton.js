import { useState } from "react";


export default function ModalButton({showModal,setShowModal,handlefunc,title,text}) {
  return (
    <>
     
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="bg-neutralPrimary2 shadow-brutalism shadow-neutralPrimary1 border border-current rounded-lg p-6 center relative flex flex-col w-full  ">
                {/*header*/}
                <div className="flex items-start justify-between p-5  rounded-t">
                  <h3 className="text-3xl font-semibold">
                    {title}
                  </h3>

                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-neutralSecondary1 text-lg leading-relaxed">
                   {text}
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 rounded-b">
                  <button
                    className="text-neutralSecondary1 background-transparent font-bold uppercase px-6 py-2 
                    hover:border border-current rounded
                    text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    cancel
                  </button>
                  <button
                    className="bg-neutralSecondary1 text-neutralPrimary1 shadow-brutalism shadow-neutralSecondary1 border border-neutralPrimary1
                    hover:bg-neutralPrimary2  hover:text-neutralSecondary1 hover:border-neutralPrimary1
                    font-bold uppercase text-sm px-6 py-3 rounded mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handlefunc}
                  >
                    confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}