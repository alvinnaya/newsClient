import React from "react";
export function NextButton({
  handleincrease
}) {
  return <button className="bg-preSecondary p-2" onClick={handleincrease}>
    <span className="sr-only p-2">Next Page</span>
    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-primary" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
    </svg>
  </button>;
}
  