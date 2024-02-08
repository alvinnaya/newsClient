'use client';
import NavbarAdminLayout from "@/components/ui/Layout/NavbarAdminLayout";
import BaseImage from "@/components/ui/CardComponentView/BaseImage";
import BaseText from "@/components/ui/CardComponentView/BaseText";
import HeadingText from "@/components/ui/CardComponentView/HeadingText";
import ReuseModalButton from "@/components/ui/ReuseModal";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Card from "@/components/ui/Card";
import { Tags } from "@/components/ui/Editor_UI/Tags";
import Link from "next/link";
import Loading from "@/components/ui/Loading";


const page = () => {
    const [showModal, setShowModal] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [showEditText, setShowEditText] = useState(false);
    const [currentId, setCurrentId] = useState('');
    const [adsName , setAdsName] = useState('untitled');
    const [status, setStatus] = useState(false);
    const [showStatus, setShowStatus] = useState(false)
    const [adsList , setAdsList] = useState([]);
    const [reload, setReload] =useState(false)
    const [showLoading, setShowLoading] = useState(true);
    const apiKey = process.env.API_KEY || 'localhost:3000';

    const handleChangeText = async()=>{
      try{
    setShowLoading(true)
        const data = Cookies.get("admin-token")
       
      
      
     const response = await fetch(`http://${apiKey}/api/ads/update/2`, {
       method: 'PUT',
       headers: {
         'Content-Type': 'application/json',
         'admin-token': data,
       },
       body: JSON.stringify({  'ads_name': adsName, 'id':currentId,  }),
    
     });
    
     if (response.status === 201) {
       
       setShowEditText(false)
       setShowLoading(false)
       setReload(!reload)
       // Tambahkan logika apa yang harus dilakukan setelah artikel berhasil dibuat
     } else {
       console.error('Gagal membuat artikel');
       setShowLoading(false)
       // Tambahkan logika apa yang harus dilakukan jika gagal membuat artikel
     }
    
    } catch (error) {
     console.error('Terjadi kesalahan', error);
     setShowLoading(false)
     // Tambahkan logika apa yang harus dilakukan jika terjadi kesalahan
    }
    }


    const handleChangeStatus = async()=>{
      try{
        
        const data = Cookies.get("admin-token")
       
      console.log(status)
      
     const response = await fetch(`http://${apiKey}/api/ads/update/3`, {
       method: 'PUT',
       headers: {
         'Content-Type': 'application/json',
         'admin-token': data,
       },
       body: JSON.stringify({  'status': status, 'id':currentId,  }),
    
     });
   
     if (response.status === 201) {
       
       setShowStatus(false)
      
       setReload(!reload)
       // Tambahkan logika apa yang harus dilakukan setelah artikel berhasil dibuat
     } else {
       console.error('Gagal membuat artikel');
       setShowLoading(false)
       // Tambahkan logika apa yang harus dilakukan jika gagal membuat artikel
     }
    
    } catch (error) {
     console.error('Terjadi kesalahan', error);
     setShowLoading(false)
     // Tambahkan logika apa yang harus dilakukan jika terjadi kesalahan
    }
    }
    

    useEffect(() => {

      async function fetchData() {
        try {
          setShowLoading(true)
          const data = Cookies.get("admin-token")
          const response = await fetch(`http://${apiKey}/api/ads/getAdsbyAdmin`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'admin-token': data,
            },
            
          });
          const article = await response.json();
          const allads = [];
          await Promise.all( article.map(async(item)=>{
            const response2 = await fetch(`http://${apiKey}/api/ads/adstags/${item.id}`, {
              method: 'GET',
              
            });

            const tags = await response2.json();
            allads.push({...item,tags})
          }))
         console.log(allads)
          setAdsList(allads)
          setShowLoading(false)
          // const response2 = await fetch(`http://localhost:3000/api/recomendation/getArticles?ids=${article}`, {
          //     method: 'GET',
              
          //   });
          // const article2 = await response2.json();
          // console.log('article2',article2)

          // console.log('another Article',Cards)
          // setAnotherArticle(Cards)
        } catch (error) {
          console.error('Terjadi kesalahan', error);
          setShowLoading(false)
          // Tambahkan logika apa yang harus dilakukan jika terjadi kesalahan
        }
        
      }
      fetchData();
      
    },[reload]);

    const CardComponentMap = {
      ImageContainer: BaseImage,
      HeadingText : HeadingText,
      SubHeading : BaseText,
      none: '',
     
      // Tambahkan pemetaan lain di sini
    };

      const router = useRouter();

      const handleSubmit = async (e) => {
        e.preventDefault();
        if(adsName == undefined){
          return;
        }
        try {
          const data = Cookies.get("admin-token") // Ganti dengan cara Anda mengambil token
          const content = {
            components:[
              {
                name : 'HeadingText',
                contents: 'Judul Headline',
                url : '',
                style : {
                 colStart: '2',
                 colEnd : '10',
                 rowStart: '2',
                 rowEnd : '5',
                },
                zIndex: 1, 
               },
             
            ]
           }
           
           
          const response = await fetch(`http://${apiKey}/api/ads/create/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'admin-token': data,
            },
            body: JSON.stringify({ adsName, content}),
          });
    
          if (response.status === 201) {
            const article = await response.json();
            console.log('ads berhasil dibuat',article.id);
            router.push(`/admin/ads/${article.id}`)
            // Tambahkan logika apa yang harus dilakukan setelah artikel berhasil dibuat
          } else {
            console.error('Gagal membuat artikel');
            // Tambahkan logika apa yang harus dilakukan jika gagal membuat artikel
          }
        } catch (error) {
          console.error('Terjadi kesalahan', error);
          // Tambahkan logika apa yang harus dilakukan jika terjadi kesalahan
        }
      };


      const handleDelete = async (e) => {
        setShowLoading(true)
        e.preventDefault
      console.log(currentId)
        if(adsName == undefined){
          return;
        }
        try {
          const data = Cookies.get("admin-token") // Ganti dengan cara Anda mengambil token
          
           const id = currentId
           
          const response = await fetch(`http://${apiKey}/api/ads/remove/`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'admin-token': data,
            },
            body: JSON.stringify({ id}),
          });
    
          if (response.status === 201) {
            const article = await response.json();
            console.log('ads berhasil dibuat',article.id);
            setShowDelete(false)
            setShowLoading(false)
            setReload(!reload)
            // Tambahkan logika apa yang harus dilakukan setelah artikel berhasil dibuat
          } else {
            console.error('Gagal membuat artikel');
            setShowLoading(false)
            // Tambahkan logika apa yang harus dilakukan jika gagal membuat artikel
          }
        } catch (error) {
          console.error('Terjadi kesalahan', error);
          setShowLoading(false)
          // Tambahkan logika apa yang harus dilakukan jika terjadi kesalahan
        }
      };


     

    return (
        <>
         <NavbarAdminLayout setShowLoading={setShowLoading} setReload={setReload} reload={reload} >
         <Loading showLoading={showLoading} setShowLoading={setShowLoading}/>  
            <div className='w-full h-full flex flex-col gap-10 overflow-y-auto'>
                <div className="flex p-12">
                        <h1 className="text-6xl font-bold m-8">Daftar Iklan Kamu</h1>
                </div>
              
                <div className="flex flex-col center ">
                <div className="flex bg-gradient-to-r from-primary1 to-primary2  w-[90%] p-6 gap-6 center my-8 rounded-xl">
                        <div className=" h-[15rem] flex center">
                          <button onClick={()=>{setShowModal(true); setAdsName('untitled');}} className="w-[6rem] bg-neutralSecondary1 text-neutralPrimary1 p-4 rounded-full flex center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                          </button>
                        </div>
                </div>
                    {adsList.map((item,index)=>{
                      return(
                      <div className="flex flex-wrap  relative bg-neutralPrimary1 border shadow-brutalism shadow-current border-current w-[90%] p-6 gap-6 m-4 rounded-xl">
                          
                         <div className={`bg-transparent h-[25rem] w-[20rem]`}>
                          {item.url_image? <img className="w-full h-full bg-neutralPrimary2 border border-current object-cover rounded-xl" src={item.url_image.replace("http://103.127.132.64:3000", "http://api.figustack.com")}/>: "tidak ada"}
                        </div>
                        <div className="bg-neutralPrimary2 border border-current h-[20rem] w-[25rem] p-6 rounded-xl relative ">
                            <div className="absolute bottom-0 right-0 p-2 m-2">
                                <button  onClick={()=>{setShowEditText(true); setCurrentId(item.id); setAdsName(item.ads_name); console.log(item.id)}} className=" h-12 w-12 p-2 rounded-xl hover:bg-black hover:text-white flex center duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" width="80%" height="80%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path><polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon></svg>
                                </button>
                            </div>
                            <h1 className="text-5xl font-bold p-4 text-clip overflow-hidden">{item.ads_name}</h1>
                        </div>
                        <div className="bg-neutralPrimary2 border border-current relative min-h-[20rem] w-[20rem] rounded-xl p-4">
                          <div className=" flex flex-wrap ">
                          {item.tags.map((item2)=>{
  
                            return(
                              <div className="h-[2rem] m-2 ">
                                <Tags key={item2.id} name={item2.name}/>
                              </div>
                          
                            )
                            
                          })}
                          </div>
                            <div className="absolute bottom-0 right-0 p-2 m-2">
                                {/* <button  onClick={()=>{setShowDelete(true); setCurrentId(item.id); console.log(item.id)}} className=" h-12 w-12 p-2 rounded-xl hover:bg-black hover:text-white flex center duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" width="80%" height="80%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path><polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon></svg>
                                </button> */}
                            </div>
                        </div>
                        <div className=" w-[15rem] rounded-xl flex flex-col">
                          <div onClick={()=>setShowLoading(true)} className="bg-neutralPrimary2 border border-current  hover:shadow-brutalism duration-300 mb-4 h-[10rem] w-[15rem] p-6 rounded-xl flex center ">
                              <Link href={`/admin/ads/${item.id}`} className="text-5xl font-bold p-4 text-clip overflow-hidden">edit</Link>
                          </div>
                          <div  className={`${item.status? "bg-green-200":"bg-red-200 "} mb-4 h-[10rem] w-[15rem] p-6 rounded-xl flex center `}>
                            <button onClick={()=>{setShowStatus(true); setStatus(!item.status); setCurrentId(item.id)}} className="w-full h-full text-4xl font-semibold p-4 ">{item.status? "active":"unactive"}</button>
                          </div>
                        </div>
                        <div className="absolute top-0 right-0 p-2 m-2">
                            <button  onClick={()=>{setShowDelete(true); setCurrentId(item.id); console.log(item.id)}} className=" h-12 w-12 p-2 rounded-xl hover:bg-black hover:text-white flex center duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" width="80%" height="80%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                            </button>
                        </div>
                    </div>
                      )
                    })} 

                    
                   
                </div>
            </div>
        </NavbarAdminLayout>
        <ReuseModalButton showModal={showModal}>
                    <div className=" h-[50rem]   rounded-xl flex flex-col gap-10 items-center p-6">
                        <div className="min-w-[45rem] h-[10rem] p-6">
                        <div
                        className="block bg-neutralPrimary2 overflow-hidden rounded-xl border border-current p-4 "
                        >
                        <span className="text-large font-medium text-gray-700"> title </span>

                        <input
                            type="email"
                            placeholder="untitled"
                            onChange={(e)=>setAdsName(e.target.value)}
                            value={adsName}
                            className="mt-1 w-full text-2xl font-semibold border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 bg-transparent"
                        />
                        </div>
                        </div>

                        <div className="w-[45rem] h-[30rem] bg-neutralPrimary1 rounded-xl border border-current p-4">
                            <button className="w-[15rem] h-[15rem] bg-neutralPrimary2 border border-current rounded-xl flex center">
                                <h1 className="text-xl">
                                    Blank
                                </h1>
                            </button>
                        </div>




                        <div className="flex p-6 w-full  justify-around">
                        <button
                        className="text-red-500   uppercase px-6 py-2 text-xl outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                        >
                        cancel
                        </button>
                        <button
                        className=" font-bold text-slate-50 rounded-xl uppercase px-8 py-4 text-xl bg-slate-900  mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={handleSubmit}
                        >
                        Next
                        </button>
                       
                        </div>
                    </div>
        </ReuseModalButton>
        <ReuseModalButton showModal={showDelete}>
                    <div className=" w-[50rem] h-[20rem] rounded-xl flex flex-col gap-10 items-center p-6">
                        <div className="w-full h-[10rem] p-6 flex center">
                        <h1 className="text-4xl flex center">Apakah Anda Yakin ingin Menghapus</h1>
                        </div>


                        <div className="flex p-6 w-full  justify-around">
                        <button
                        className="text-red-500   uppercase px-6 py-2 text-xl outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowDelete(false)}
                        >
                        cancel
                        </button>
                        <button
                        className=" font-bold text-slate-50 rounded-xl uppercase px-8 py-4 text-xl bg-slate-900  mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={(e)=>handleDelete(e)}
                        >
                        Hapus
                        </button>
                       
                        </div>
                    </div>
        </ReuseModalButton>

        <ReuseModalButton showModal={showEditText}>
                    <div className=" w-[50rem]  rounded-xl flex flex-col gap-10 items-center p-6">
                        <div className="w-full h-[10rem] p-6">
                        <div
                        className="block bg-neutralPrimary2 overflow-hidden rounded-xl border border-current p-4  focus-within:border-current focus-within:ring-1 focus-within:ring-current"
                        >
                        <span className="text-large font-medium text-gray-700"> title </span>

                        <input
                          
                            placeholder="untitled"
                            onChange={(e)=>setAdsName(e.target.value)}
                            value={adsName}
                            className="mt-1 w-full text-2xl font-semibold border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 bg-transparent"
                        />
                        </div>
                        </div>

                        
                        <div className="flex p-6 w-full  justify-around">
                        <button
                        className="text-red-500   uppercase px-6 py-2 text-xl outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowEditText(false)}
                        >
                        cancel
                        </button>
                        <button
                        className=" font-bold text-slate-50 rounded-xl uppercase px-8 py-4 text-xl bg-slate-900  mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={handleChangeText}
                        >
                        Next
                        </button>
                       
                        </div>
                    </div>
        </ReuseModalButton>

        <ReuseModalButton showModal={showStatus}>
                    <div className="  w-[50rem] h-[20rem] rounded-xl flex flex-col gap-10 items-center p-6">
                        <div className="w-full h-[10rem] p-6 flex center">
                        <h1 className="text-4xl flex center">Apakah Anda ingin mengaktifkan iklan ini ?</h1>
                        </div>


                        <div className="flex p-6 w-full  justify-around">
                        <button
                        className="text-red-500   uppercase px-6 py-2 text-xl outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowStatus(false)}
                        >
                        cancel
                        </button>
                        <button
                        className=" font-bold text-slate-50 rounded-xl uppercase px-8 py-4 text-xl bg-slate-900  mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={handleChangeStatus}
                        >
                        Yes
                        </button>
                       
                        </div>
                    </div>
        </ReuseModalButton>
        </>
       

    );
};

export default page;