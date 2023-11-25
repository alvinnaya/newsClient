import { useState,useContext } from "react";
import Modal from "./Modal";

const PublishButton = (props) => {
    const [modal,setModal] = useState(false);

    const handlePublish = ()=>{
      setModal(true)
    }
    return (
        <>
            <button
  className="m-4 inline-flex items-center gap-2 rounded border border-indigo-600 bg-indigo-600 px-8 py-3 text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
  href="/download"
onClick={handlePublish}
>
  <span className="text-sm font-medium"> Save </span>

  <svg
    className="h-5 w-5 rtl:rotate-180"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M17 8l4 4m0 0l-4 4m4-4H3"
    />
  </svg>
</button>
{
modal
? <div className="w-full h-full flex flex-col center" style={{zIndex:100, position: 'fixed',top: '50%', left: '50%',transform: `translate(-50%, -50%)`}}>
    <Modal Id={props.Id} setModal={setModal}/>
</div>
: ''
}
        </>
    );
};

export default PublishButton;