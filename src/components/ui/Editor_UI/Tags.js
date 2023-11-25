
export function Tags(props) {
  return (
  
        <span
            className="m-1 flex flex-wrap justify-between items-center text-xs sm:text-sm bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded px-4 py-2 font-bold leading-loose cursor-pointer dark:text-gray-300">
           
           <svg xmlns="http://www.w3.org/2000/svg"  
             className="w-3 h-3 sm:h-4 sm:w-4 mr-2 text-gray-700 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
            viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="9" x2="20" y2="9"></line><line x1="4" y1="15" x2="20" y2="15"></line><line x1="10" y1="3" x2="8" y2="21"></line><line x1="16" y1="3" x2="14" y2="21"></line></svg>
            {props.name}
          
           
          </span>
  
  );
}
  