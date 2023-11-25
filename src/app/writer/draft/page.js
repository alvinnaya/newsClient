'use client';
import NavbarWriterLayout from "@/components/ui/Layout/NavbarWriterLayout";
import { useRouter } from 'next/navigation';
import BlogCard from "@/components/ui/Editor_UI/BlogCard";
import Link from "next/link";
import Cookies from 'js-cookie';
import { useEffect, useState } from "react";
import ModalButton from "@/components/ui/ModalButton";
import Alert from "@/components/ui/Alert";
import { data } from "autoprefixer";
import Loading from "@/components/ui/Loading";

const Editor = () => {

const [articleList, setArticleList] = useState([])
const [reload, setReload] = useState(true)
const [showModalDelete, setShowModalDelete] = useState(false);
const [showLoading, setShowLoadig] = useState(true);
const [showModalPublish, setShowModalPublish] = useState(false);
const [gagal, setGagal] = useState(false);
const [pesanGagal, setPesanGagal] = useState('');
const [ModalData , setModalData] = useState('')
const apiKey = process.env.API_KEY || 'localhost:3000';
const deffaultImage = process.env.DEFFAULT_IMG || '1696143107524.webp';

  useEffect( () => {
    
    async function fetchData() {
      setShowLoadig(true)
    try {
      console.log('jalan');
      const data = Cookies.get("jwt-token")
      const res = await fetch(`http://${apiKey}/api/article/getArticlebyWriter`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'jwt-token': data,
        },
        
      });
      const allarticle = await res.json();

      console.log(allarticle)
      console.log(allarticle)
      setArticleList(allarticle)
      setShowLoadig(false)
      
    } catch (error) {
      console.error('Terjadi kesalahan', error);
      // Tambahkan logika apa yang harus dilakukan jika terjadi kesalahan
    }
  }
  fetchData();
  },[reload]);


const handleDelete = (id) =>{
  console.log(id)
  async function deleteArticle(){
    try{ 
      const data = Cookies.get("jwt-token") 
    
      const response = await fetch(`http://${apiKey}/api/article/delete`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                  'jwt-token': data,
                },
                body: JSON.stringify({ id }),
              });
              if (response.status === 201) {
                console.log(response.json)
                setReload(!reload)
                setShowModalDelete(false)
                // Tambahkan logika apa yang harus dilakukan setelah artikel berhasil dibuat
              }else{
                setShowModalDelete(false)
                setPesanGagal('gagal di hapus')
                setGagal(true)
              }
    
    }catch(error){
    console.log(error)
    setShowModalDelete(false)
    setPesanGagal('gagal di hapus')
    setGagal(true)
    }


  }

  deleteArticle()
 
}


const handlePublish = async(id)=>{
  try{
console.log(id)
    const data = Cookies.get("jwt-token")
   
  
 const response = await fetch(`http://${apiKey}/api/article/publish`, {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json',
     'jwt-token': data,
   },
   body: JSON.stringify({id}),

 });

 if (response.status === 201) {
   const article = await response.json();
   console.log(article);
   setShowModalPublish(false)
   setReload(!reload)
   
   // Tambahkan logika apa yang harus dilakukan setelah artikel berhasil dibuat
 } else {
   console.error('Gagal membuat artikel');
   setShowModalPublish(false)
   setPesanGagal('gagal di Publish')
   setGagal(true)
   // Tambahkan logika apa yang harus dilakukan jika gagal membuat artikel
 }

} catch (error) {
 console.error('Terjadi kesalahan', error);
 setShowModalPublish(false)
 setPesanGagal('gagal di Publish')
   setGagal(true)
 // Tambahkan logika apa yang harus dilakukan jika terjadi kesalahan
}
}



    const router = useRouter();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setShowLoadig(true)
        
        try {
          const data = Cookies.get("jwt-token") // Ganti dengan cara Anda mengambil token
          const content = { BlogContent :[{
            page : '1',
            components:[
              {
                name : 'HeadingText',
                contents: 'Judul Headline',
                style : {
                 colStart: '2',
                 colEnd : '10',
                 rowStart: '2',
                 rowEnd : '5',
                },
                zIndex: 1, 
               },
               {
                name : 'ImageContainer',
                contents: `http://${apiKey}/uploads/${deffaultImage}`,
                style : {
                  colStart: '2',
                  colEnd : '10',
                  rowStart: '5',
                  rowEnd : '11',
                  borderRadius: 0,
                },
                zIndex: 2,
               }
             
            ]
           }]}

           const title = content.BlogContent[0].components[0].contents
           const foundImageContainer = content.BlogContent.map((blog) =>
  blog.components.find((component) => component.name === 'ImageContainer')
).filter(Boolean)[0];

console.log('imageContainer',foundImageContainer)
           const url_image = foundImageContainer.contents
           console.log('url_image',url_image)
          const response = await fetch(`http://${apiKey}/api/article/create`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'jwt-token': data,
            },
            body: JSON.stringify({ title, content, url_image }),
          });
    
          if (response.status === 201) {
            const article = await response.json();
            console.log(article.id);
            
            router.push(`/writer/draft/${article.id}/edit`)
            
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




    return (
        <>
        
           <NavbarWriterLayout setShowLoading={setShowLoadig} setReload={setReload} reload={reload} >
           <Loading showLoading={showLoading}/>  
        <div className="m-0 ">
        <div className="m-0 flex gap-4 flex-col items-center p-0">
            <button onClick={handleSubmit} className="w-[50rem] flex center m-8 p-8 text-slate-50 bg-black rounded-xl text-3xl hover:bg-white hover:text-black border-2 border-black">
                Create Blog
            </button>
        {
          articleList.map((item, index) => (
            <BlogCard all={item} id={item.id} title={item.title} writerId={item.writer_id} key={item.id}>
               <div className="bg-neutralPrimary2 hover:shadow-brutalism border border-current  duration-300 mb-4 h-[8rem] w-[10rem] p-6 rounded-xl flex center ">
                              {/* <Link href={`/admin/ads/${item.id}`} className="text-5xl font-bold p-4 text-clip overflow-hidden">edit</Link> */}
                              <button onClick={()=>{setShowLoadig(true)}}>
                              <Link
                                href={`/writer/draft/${item.id}/edit`}
                                className="text-3xl font-bold p-4 text-clip overflow-hidden">
                                
                                Edit
                              </Link>
                              </button>
                              
              </div>

              <div className="bg-neutralPrimary2 hover:shadow-brutalism border border-current duration-300 mb-4 h-[8rem] w-[10rem] p-6 rounded-xl flex center ">
                              {/* <Link href={`/admin/ads/${item.id}`} className="text-5xl font-bold p-4 text-clip overflow-hidden">edit</Link> */}
                              <Link
                                href={`/writer/draft/${item.id}/preview`}
                                className="text-3xl font-bold p-4 text-clip overflow-hidden">
                                view {item.id}
                              </Link>
              </div>

              <div className="bg-neutralPrimary2 hover:shadow-brutalism border border-current duration-300 mb-4 h-[8rem] w-[10rem] p-6 rounded-xl flex center ">
                              {/* <Link href={`/admin/ads/${item.id}`} className="text-5xl font-bold p-4 text-clip overflow-hidden">edit</Link> */}
                              <button onClick={() => {setShowModalPublish(true); setModalData(item)}}
                                className="text-xl font-bold p-4 text-clip overflow-hidden"
                              >
                                {`${item.status? 'published':'unpublished'}`}
                              </button>
              </div>

              <div className="bg-neutralPrimary2 hover:shadow-brutalism border border-current duration-300 mb-4 h-[8rem] w-[10rem] p-6 rounded-xl flex center ">
                              {/* <Link href={`/admin/ads/${item.id}`} className="text-5xl font-bold p-4 text-clip overflow-hidden">edit</Link> */}
                              <button onClick={() => {setShowModalDelete(true); setModalData(item)}}
                                className="text-xl font-bold p-4 text-clip overflow-hidden"
                              >
                                <div className="flex center w-[5rem]">
                                <svg xmlns="http://www.w3.org/2000/svg" width="60%" height="60%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                                </div>
                               
                              </button>
              </div>

      
              
      {/* onClick={()=>handleDelete(item.id) } */}
      
     
      <ModalButton title={`apakah anda ingin mempublish ${ModalData.id}`} showModal={showModalPublish} setShowModal={setShowModalPublish} handlefunc={()=>handlePublish(ModalData.id)}/>
      <ModalButton title={'apakah anda ingin menghapus'} showModal={showModalDelete} setShowModal={setShowModalDelete} handlefunc={()=>handleDelete(ModalData.id)}/>
            </BlogCard>
          ))
        }
        </div>
        </div>
        {gagal? <Alert fungsi={()=>setGagal(false)}>{pesanGagal}</Alert>:''}
        
      </NavbarWriterLayout >
      
      </>
    );
};

export default Editor;