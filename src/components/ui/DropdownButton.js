'use client';
import React, { useState,useContext } from 'react';


const DropdownButton = (props) => {
  
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  
  return (
    <div className="relative flex justify-center m-4 rounded-md border bg-preSecondary" >
      <button
        className={`${props.ButtonStyle} px-4 py-2 text-sm/none text-prePrimary hover:bg-gray-200 hover:text-primary`}
        
      >
        {props.NameButton?`${props.NameButton}`:"DropDown"}
      </button>
      <button
      className="h-full p-2 text-prePrimary hover:bg-preSecondary hover:text-primary"
      onClick={toggleDropdown}
    >
      <span className="sr-only">Menu</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
    </button>
      {isOpen && (
        <div className="absolute w-52 flex flex-col top-10 left-0 rounded-md border border-preSecondary bg-preSecondary rounded-md shadow-md py-2">
          {props.children}
          
        </div>
      )}
    </div>
  );
};

export default DropdownButton;
