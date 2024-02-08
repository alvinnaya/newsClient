'use client';
import NavbarWriterLayout from "@/components/ui/Layout/NavbarWriterLayout";
import BlogCard from "@/components/ui/Editor_UI/BlogCard";
import { useEffect,useState } from "react";
import Cookies from 'js-cookie';
import ReuseModalButton from "@/components/ui/ReuseModal";
import Loading from "@/components/ui/Loading";




const Home = () => {

const [pesanGagal, setPesanGagal] = useState('');
const [ModalImage, setModalImage] = useState(false);
const [nama, setNama] = useState('');
const [showModalName, setShowModalName] = useState(false);
const [listImage, setListImage] = useState([])
const [selectedImage, setSelectedImage] = useState(null);
const [prevImage, setPrevImage] = useState('');
const [currentIndex, setCurrentIndex] = useState(1)
const [currentImage, setCurrentImage] = useState(null)
const [currentImageIndex, setCurrentImageIndex] = useState(null)
const [showLoading, setShowLoadig] = useState(true);
const [reupload, setReupload] = useState(true);
const[profile,setProfile] = useState([])
const apiKey = process.env.NEXT_PUBLIC_API_KEY || 'localhost:3000';
  useEffect( () => {
    
    async function fetchData() {
    try {
      console.log('jalan');
      const data = Cookies.get("jwt-token")
      const res = await fetch(`http://${apiKey}/api/image/get-image/writer`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'jwt-token': data,
        },
        
      });
      const allphoto = await res.json();
      console.log(allphoto)
      setListImage(allphoto)

    

      
    } catch (error) {
      console.error('Terjadi kesalahan', error);
      // Tambahkan logika apa yang harus dilakukan jika terjadi kesalahan
    }
  }
  fetchData();
  },[reupload]);

  useEffect(()=>{
    async function fetchData() {
      console.log('get profile')
      try {
        console.log('jalan');
        const data = Cookies.get("jwt-token")
        const res = await fetch(`http://${apiKey}/api/writer/profile/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'jwt-token': data,
          },
          
        });
        const profile = await res.json();
        console.log('get profile 2')
        console.log(profile.profile)
        setProfile(profile.profile)
  
        
      } catch (error) {
        console.log('Terjadi kesalahan', error);
        // Tambahkan logika apa yang harus dilakukan jika terjadi kesalahan
      }
    }
    fetchData();
  },[])

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };
  const handleImageChoose = (item, imageIndex) => {
    setCurrentImage(item.image_url); 
    setCurrentImageIndex(imageIndex);
  };

const handleimageprofile = async() =>{
  try {
    console.log(currentImage)
    if(currentImage == null ){
      return;
    }
    const data = Cookies.get("jwt-token")
    const response = await fetch(`http://${apiKey}/api/writer/profile/changeImage/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'jwt-token': data,
      },
      body: JSON.stringify({currentImage}),
     
    });
console.log(response.status)
    if (response.ok) {
      const data = await response.json();
      console.log('URL Gambar:', data);
      setCurrentImage(data)
      setModalImage(false)
console.log('berhasil di ubah profile')
    } else {
      console.error('Gagal mengunggah gambar');
    }
  } catch (error) {
    console.error('Terjadi kesalahan:', error);
  }
}

  const handleUpload = async () => {
    console.log('upload')
    setPrevImage(selectedImage)
      if (selectedImage && selectedImage != prevImage) {
        console.log('upload 2')
        const formData = new FormData();
        formData.append('image', selectedImage);
        
        try {
          const data = Cookies.get("jwt-token")
          const response = await fetch(`http://${apiKey}/api/image/upload/writer`, {
            method: 'POST',
            headers: {
              'jwt-token': data,
            },
            body: formData,
           
          });
  
          if (response.ok) {
            const data = await response.json();
            console.log('URL Gambar:', data);
            setCurrentImage(data)
            setReupload(!reupload)
            
          } else {
            console.error('Gagal mengunggah gambar');
          }
        } catch (error) {
          console.error('Terjadi kesalahan:', error);
        }
      }
    };

  

 const handleNamaChange = async()=>{
  try {
    console.log(nama)
    const data = Cookies.get("jwt-token")
    const response = await fetch(`http://${apiKey}/api/writer/profile/changeNama/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'jwt-token': data,
      },
      body: JSON.stringify({nama}),
     
    });
console.log(response.status)
    if (response.ok) {
      const data = await response.json();
      console.log('nama:', data);
      setShowModalName(false)
console.log('berhasil di ubah profile')
    } else {
      console.error('Gagal mengunggah gambar');
    }
  } catch (error) {
    console.error('Terjadi kesalahan:', error);
  }
 }
console.log('image',profile.profile_image)
    return (
      <>
      <NavbarWriterLayout >
       <div className="w-full h-full flex flex-col center gap-[5rem]">
            <div className="relative">
            <img className="w-[10rem] h-[10rem] rounded-full object-cover border-2 border-neutralSecondary1" src={`${profile.profile_image == undefined ? '':profile.profile_image.replace("http://103.127.132.64:3000", "http://api.figustack.com")}`||`https://inasianspaces.files.wordpress.com/2020/10/lelouch-ep-25-final.png?w=1200" alt="Rounded avatar`}/>
            <span onClick={()=>setModalImage(true)} className="absolute flex center bottom-0 right-0  w-[3rem] h-[3rem] border border-current bg-gradient-to-r from-primary1 to-primary2 text-neutralSecondary1 rounded-full"><svg xmlns="http://www.w3.org/2000/svg" width="60%" height="60%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><g transform="translate(2 3)"><path d="M20 16a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3l2-3h6l2 3h3a2 2 0 0 1 2 2v11z"/><circle cx="10" cy="10" r="4"/></g></svg></span>
            </div>
            <div className="w-full flex-col center flex gap-6">
                <div className="flex center gap-4">
                    <h1 className="text-5xl flex">{`${profile.nama}`|| 'user'}</h1>
                    <span onClick={()=>setShowModalName(true)} className="flex center  w-[2.5rem] h-[2.5rem] border border-current bg-gradient-to-r from-primary1 to-primary2 text-neutralSecondary1 rounded-full  "><svg xmlns="http://www.w3.org/2000/svg" width="70%" height="70%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="16 3 21 8 8 21 3 21 3 16 16 3"></polygon></svg></span>
                </div>
                <div>
                    <h2 className="text-2xl center"> 08-10-2023</h2>
                </div>
            </div>
       </div>
       
      </NavbarWriterLayout>
      <Loading showLoading={showLoading}/>
      <ReuseModalButton showModal={ModalImage} className='flex flex-col  '>
      <div className='flex items-end justify-around '> 
                    <div className=" w-96 ">
                            <label
                                htmlFor="formFileLg"
                                className="mb-2 inline-block text-neutralSecondary1 dark:text-neutralPrimary1"
                            >
                            Large file input example
                            </label>
                            <input
                                className="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] font-normal leading-[2.15] text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                                type="file" accept="image/*" onChange={handleImageChange} 
                            />
                      </div>
                      <button
                                className="shadow-brutalism hover:shadow-none hover:border border-current bg-gradient-to-r from-primary1 to-primary2 text-neutralSecondary1  font-bold uppercase text-sm px-6 py-3 rounded  ease-linear transition-all duration-150"
                                type="button"
                                onClick={handleUpload}>
                                upload
                      </button>
                     
                  </div> 


                  <div className='flex flex-col w-[8rem] h-[8rem] m-12 rounded-full' style={{}}>
                    {currentImage ? <img className={`w-full h-full object-cover rounded-full`}  src={`${currentImage.replace("http://103.127.132.64:3000", "http://api.figustack.com")}`}/> : null }
                    
                  </div>

              

                  <div className='flex gap-6 w-full h-[25rem] flex-none flex-wrap overflow-y-auto justify-around'> 
                    {listImage.map((item,index) => (
            <div className='flex w-[40%] max-h-[50%] flex-col center' onClick={()=>handleImageChoose(item,index)} >
              <img className={`max-w-full max-h-full rounded ${index == currentImageIndex ? 'border-4 border-primary1 object-cover' : 'object-contain'} `} src={`${item.image_url.replace("http://103.127.132.64:3000", "http://api.figustack.com")}`} />
            </div>
        ))}
                     
                  </div> 

                  <div ClassName="flex items-center justify-end p-4 mt-4 rounded-b h-[5rem]">
                  <button
                    className="text-neutralSecondary1 background-transparent font-bold uppercase px-6 py-2 text-sm  mr-1  ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setModalImage(false)}
                  >
                    cancel
                  </button>
                  <button
                    className="shadow-brutalism hover:shadow-none hover:border border-current bg-gradient-to-r from-primary1 to-primary2 text-neutralSecondary1 font-bold uppercase text-sm px-6 py-3 rounded   mr-1  ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleimageprofile}
                    
                  >
                    confirm
                  </button>
                </div>
      </ReuseModalButton>
      <ReuseModalButton showModal={showModalName}>
<div className="w-[40rem] flex flex-col gap-8 center p-4 ">
<div className=" w-[50%]">
  <label htmlFor="UserEmail" className="block text-2xl font-medium text-gray-700">
    Masukan Nama
  </label>

  <input
    type="email"
    id="UserEmail"
    placeholder="nama"
    className="mt-8 py-6 px-8 w-full h-[3rem] rounded-md  text-3xl outline-none"
    onChange={(e)=>setNama(e.target.value)}
    value={nama}
  />
</div>




      <div ClassName="flex items-center justify-end p-6 rounded-b">




                  <button
                    className="text-neutralSecondary1 background-transparent font-bold uppercase px-6 py-2 text-sm ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModalName(false)}
                  >
                    cancel
                  </button>
                  <button
                    className="shadow-brutalism hover:shadow-none hover:border border-current bg-gradient-to-r from-primary1 to-primary2 text-neutralSecondary1 font-bold uppercase text-sm px-6 py-3 rounded ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleNamaChange}
                    
                  >
                    confirm
                  </button>
                </div>
</div>

      </ReuseModalButton>
      </>
        
    );
};



export default Home;
