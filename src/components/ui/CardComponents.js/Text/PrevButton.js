import React from "react";
export function PrevButton({
  handledecrease
}) {
  return <button className="bg-preSecondary p-2" onClick={handledecrease}>
    <span className="sr-only">Prev Page</span>
    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-primary" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  </button>;
}
  