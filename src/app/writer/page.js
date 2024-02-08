'use client';
import NavbarWriterLayout from "@/components/ui/Layout/NavbarWriterLayout";
import BlogCard from "@/components/ui/Editor_UI/BlogCard";
import { useEffect,useState } from "react";
import Cookies from 'js-cookie';
import ModalButton from "@/components/ui/ModalButton";
import Alert from "@/components/ui/Alert";
import Loading from "@/components/ui/Loading";





const Home = () => {

  const [articleList, setArticleList] = useState([])
  const [showModalUnpublish, setShowModalUnpublish] = useState(false);
  const [reload, setReload] = useState(true)
  const [gagal, setGagal] = useState(false);
const [pesanGagal, setPesanGagal] = useState('');
const [ModalData , setModalData] = useState('')
const [profile , setProfile] = useState([])
const [showLoading, setShowLoadig] = useState(true);

  useEffect( () => {
    
    async function fetchData() {
    try {
      setShowLoadig(true)
      console.log('jalan');
      const data = Cookies.get("jwt-token")
      const res = await fetch(`http://${process.env.API_KEY}/api/article/getPublishedArticlebyWriter`, {
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
  setReload(false)
  },[reload]);
  
  

  const handleUnpublish = (id) =>{
    console.log(id)
    async function unpublish(){
      try{ 
        const data = Cookies.get("jwt-token") 
      
        const response = await fetch(`http://${process.env.API_KEY}/api/article/unpublish`, {
                  method: 'DELETE',
                  headers: {
                    'Content-Type': 'application/json',
                    'jwt-token': data,
                  },
                  body: JSON.stringify({ id }),
                });
                if (response.status === 201) {
                  console.log(response.json)
                  setReload(true)
                  setShowModalUnpublish(false)
                  // Tambahkan logika apa yang harus dilakukan setelah artikel berhasil dibuat
                }else{
                  setShowModalUnpublish(false)
                  setPesanGagal('gagal di hapus')
                  setGagal(true)
                }
      
      }catch(error){
      console.log(error)
      setShowModalUnpublish(false)
      setPesanGagal('gagal di hapus')
      setGagal(true)
      }
  
  
    }
  
    unpublish()
   
  }


    return (
      <>
      <NavbarWriterLayout setShowLoading={setShowLoadig} setReload={setReload} reload={reload}>
        <Loading showLoading={showLoading}/>
        <div className="overflow-y-scroll overflow-x-hidden">
       
        <div className="m-4 flex gap-4 flex-col items-center p-8">
        {
          articleList.map((item, index) => (
            <BlogCard all={item} id={item.article_id} title={item.title} url_image={item.url_image} writerId={item.writer_id} key={item.id}>
              
              <div className="bg-neutralPrimary2 text-center transition hover:shadow-brutalism border border-current duration-300 mb-4 h-[10rem] w-[15rem] p-6 rounded-xl flex center ">
                              {/* <Link href={`/admin/ads/${item.id}`} className="text-5xl font-bold p-4 text-clip overflow-hidden">edit</Link> */}
                              <a
                                href={`/articles/${item.article_id}/`}
                                className="text-4xl font-bold p-4 text-clip overflow-hidden  text-center transition "
                              >
                                preview
                              </a>
              </div>

              <div className="bg-neutralPrimary2 text-center border border-current transition hover:shadow-brutalism duration-300 mb-4 h-[10rem] w-[15rem] p-6 rounded-xl flex center ">
                              {/* <Link href={`/admin/ads/${item.id}`} className="text-5xl font-bold p-4 text-clip overflow-hidden">edit</Link> */}
                              <button onClick={() => {setShowModalUnpublish(true); setModalData(item)}}
                                className="text-4xl font-bold p-4 text-clip overflow-hidden "
                              >
                                unpublish
                              </button>
              </div>

              
     
      {/* onClick={()=>handleDelete(item.id) } */}
     
      <ModalButton title={'apakah anda ingin mempublish'} showModal={showModalUnpublish} setShowModal={setShowModalUnpublish} handlefunc={()=>handleUnpublish(ModalData.article_id)}/>
      
            </BlogCard>
          ))
        }
        </div>
        </div>
        {gagal? <Alert fungsi={()=>setGagal(false)}>{pesanGagal}</Alert>:''}
      </NavbarWriterLayout>
      </>
        
    );
};



export default Home;
