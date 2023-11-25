

const BlogCard = ({children,year,date,title,id,all}) => {
    return (
      <>


        <div className="flex flex-wrap relative bg-neutralPrimary1 border shadow-brutalism shadow-current border-current w-[90%] p-6 gap-6 m-4 rounded-xl">
                          
                         <div className={`bg-transparant h-[25rem] w-[20rem]`}>
                          {all.url_image? <img className="w-full h-full object-cover rounded-xl border border-current" src={all.url_image}/>: "tidak ada"}
                        </div>
                        <div className="bg-neutralPrimary2 shadow-brutalism h-[20rem] w-[30rem] p-6 rounded-xl relative  ">
                            <div className="absolute bottom-0 right-0 p-2 m-2">
                                {/* <button  className=" h-12 w-12 p-2 rounded-xl hover:bg-black hover:text-white flex center duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" width="80%" height="80%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path><polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon></svg>
                                </button> */}
                            </div>
                            <h1 className="text-5xl font-bold p-4 text-clip">{title}</h1>
                        </div>
                        <div className="bg-neutralPrimary2 border border-current overflow-hidden relative min-h-[20rem] max-h-[25rem] w-[20rem] rounded-xl p-4">
                          <div className=" flex flex-wrap overflow-hidden m-2 ">
                          {all.descrip}
                          </div>
                            <div className="absolute bottom-0 right-0 p-2 m-2">
                                {/* <button  onClick={()=>{setShowDelete(true); setCurrentId(item.id); console.log(item.id)}} className=" h-12 w-12 p-2 rounded-xl hover:bg-black hover:text-white flex center duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" width="80%" height="80%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path><polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon></svg>
                                </button> */}
                            </div>
                        </div>
                        <div className=" w-[30rem] gap-6 rounded-xl flex flex-wrap">
                       
                          {children}
                        </div>
                        
                    </div>


        </>
    );
};

export default BlogCard;