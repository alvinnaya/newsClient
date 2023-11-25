import { useState,useContext,useEffect } from 'react';
import ReuseModalButton from '../../ReuseModal';
import { AppStateContext } from '@/components/AppStateContext';
import Tabs from '../../Tabs';
import TabsContent from '../../TabsContent';
import Cookies from "js-cookie";
const MetaModal = () => {
  const {setEditor,editor,setCard,card} = useContext(AppStateContext);
    const [showModal, setShowModal] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(2)
    const [currentImage, setCurrentImage] = useState(null)
    const [currentUrl, setCurrentUrl] = useState('')
    const [selectedImage, setSelectedImage] = useState(null);
    const [prevImage, setPrevImage] = useState('');
    const [reupload, setReupload] = useState(true);
    const [metadata,setMetadata] = useState(null)

    const apiKey = process.env.API_KEY || 'localhost:3000';
    const deffaultImage = process.env.DEFFAULT_IMG || '1696143107524.webp';
    









  const handleSetMeta = () =>{
    const newContent = [...card];
    newContent[editor.index.cardIndex].components[editor.index.componentIndex].image=`${metadata['og:image']}`;
    newContent[editor.index.cardIndex].components[editor.index.componentIndex].contents=`${metadata['og:title']}`;
    newContent[editor.index.cardIndex].components[editor.index.componentIndex].link=`${currentUrl}`;
    setCard(newContent);
    setShowModal(false)
  }

  const handleMeta = async (url) =>{
    const response = await fetch(`http://${apiKey}/api/metadata/getMetadata?url=${url}`, {
        method: 'GET',
        
      });
      const MetaData = await response.json();
      setMetadata(MetaData)
      
   
  }

    

    return (
        <>
         <button onClick={()=>setShowModal(true)} className='text-sm inline-flex items-center gap-2 rounded border border-indigo-600 bg-indigo-600 px-4 py-2 text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500' >

               
<span class="font-medium"> upload </span>


</button>
            <ReuseModalButton showModal={showModal} >
               <div className="relative p-6 flex flex-col w-[50rem] h-[40rem]">

                <div className='flex center my-6'>
                  
                      <button
                                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={()=>setCurrentIndex(2)}>
                                url
                      </button>
                     
                </div>
                    
                    <TabsContent index={2} currentIndex={currentIndex}>
                    <div className='flex items-end justify-around'> 
                    <div className=" w-96 ">
                            <label
                                htmlFor="formFileLg"
                                className="mb-2 inline-block text-neutral-700 dark:text-neutral-200"
                            >
                            Large file input example
                            </label>
                            <input
                                className="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] font-normal leading-[2.15] text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                                type="text" onChange={(e)=>setCurrentUrl(e.target.value)} 
                            />
                      </div>
                      <button
                                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={()=>handleMeta(currentUrl)}>
                                preview
                      </button>
                     
                  </div> 
                  
                  <div className='flex flex-col max-w-[90%] max-h-[60%] m-12' style={{}}>
                   {metadata ?  <div  className={`leading-tight  z-[3] w-full h-full font-[50] h-[min-content] `}  >
                        <div className='w-full h-full m-4 bg-slate-200 flex flex flex-wrap flex-auto ' >
                            <div className='w-[12rem] flex-auto rounded-xl'>
                            <img className={`w-full h-full object-cover rounded-xl`}  src={`${metadata[`og:image`]}`}/>
                            </div>
                            <div className={`w-[10rem] flex flex-auto flex-col rounded-xl bg-slate-200  text-2xl font-semibold`}>
                                <h1 className='w-[90%] m-8 h-full text-[1.3rem]' >{`${metadata[`og:title`]}`} </h1>
                                <button className='bg-black text-white rounded-xl self-end m-4 text-xl px-4 py-2'>read</button>
                                
                            </div>
                        </div>
                        
                    </div>: null}
                  </div>
                    </TabsContent>

                   

                 
                 

                    <div className='flex flex-col overflow overflow-y-auto'> 
                        
                    </div>




                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    cancel
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleSetMeta}
                    
                  >
                    confirm
                  </button>
                </div>
                </ReuseModalButton>
        </>
    );
};

export default MetaModal;