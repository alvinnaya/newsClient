import { useState,useContext,useEffect } from 'react';
import ReuseModalButton from '../../ReuseModal';
import { AppStateContext } from '@/components/AppStateContext';
import Tabs from '../../Tabs';
import TabsContent from '../../TabsContent';
import Cookies from "js-cookie";
const ImageModal = () => {
  const {setEditor,editor,setCard,card} = useContext(AppStateContext);
    const [showModal, setShowModal] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(1)
    const [currentImage, setCurrentImage] = useState(null)
    const [currentImageIndex, setCurrentImageIndex] = useState(null)
    const [currentUrl, setCurrentUrl] = useState('')
    const [selectedImage, setSelectedImage] = useState(null);
    const [listImage, setListImage] = useState([{url_image:''}]);
    const [prevImage, setPrevImage] = useState('');
    const [error, setError] = useState('');
    const [reupload, setReupload] = useState(true);
    const apiKey = process.env.NEXT_PUBLIC_API_KEY || 'localhost:3000';

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`http://${apiKey}/api/image/get-image`); // Ganti URL dengan URL API Anda
    
          if (!response.ok) {
            throw new Error('Terjadi kesalahan saat mengambil data.');
          }
    
          const data = await response.json();
          console.log(data);
          setListImage(data);
          
        } catch (err) {
          setError(err.message);
        }
      };
    
      fetchData();
    }, [reupload]);


  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleImageChoose = (item, imageIndex) => {
    setCurrentImage(item.url_image); 
    setCurrentImageIndex(imageIndex);
    
    fetch(item.url_image)
      .then((response) => response.blob())
      .then((blob) => {
        const fileSizeInBytes = blob.size;
        // Mengkonversi ukuran file ke kilobyte atau megabyte jika diperlukan
        const fileSizeInKb = fileSizeInBytes / 1024;
        const fileSizeInMb = fileSizeInKb / 1024;
    
        console.log('Ukuran file (bytes):', fileSizeInBytes);
        console.log('Ukuran file (KB):', fileSizeInKb);
        console.log('Ukuran file (MB):', fileSizeInMb);
        console.log('file type:', blob.type);
      
      });
  
  };


  const updateImage = (src)=>{
    const newContent = [...card];
    newContent[editor.index.cardIndex].components[editor.index.componentIndex].contents=src;
    setCard(newContent);
    console.log('image telah di update')
  }

  const handleSetImage = () =>{
    updateImage(currentImage);
    setShowModal(false)
  }


  const handleUpload = async () => {
    setPrevImage(selectedImage);
    
    if (selectedImage && selectedImage !== prevImage) {
      const fileSizeInBytes = selectedImage.size;
    // Mengkonversi ukuran file ke kilobyte atau megabyte jika diperlukan
    const fileSizeInKb = fileSizeInBytes / 1024;
    const fileSizeInMb = fileSizeInKb / 1024;

    console.log('Ukuran file (bytes):', fileSizeInBytes);
    console.log('Ukuran file (KB):', fileSizeInKb);
    console.log('Ukuran file (MB):', fileSizeInMb);

      const formData = new FormData();
  
      const maxWidth = 700; // Lebar maksimum yang diinginkan
      const maxHeight = 700; // Tinggi maksimum yang diinginkan
      const image = new Image();
      image.src = URL.createObjectURL(selectedImage);
  
      image.onload = () => {
        const canvas = document.createElement('canvas');
        let newWidth, newHeight;
        
        if (image.width > image.height) {
          if(image.width > maxWidth){
          newWidth = maxWidth;
          newHeight = (image.height * maxWidth) / image.width;
          }else{
            newWidth = image.width;
            newHeight = image.height;
          }
        } else {

          if(image.height > maxHeight){
          newWidth = (image.width * maxHeight) / image.height;
          newHeight = maxHeight;
          }else{
            newWidth = image.width;
            newHeight = image.height;
          }
        }
  
        canvas.width = newWidth;
        canvas.height = newHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0, newWidth, newHeight);
  
        // Ubah gambar dari canvas ke format Blob
        canvas.toBlob(async (blob) => {
          formData.append('image', blob);
  
          try {
            const fileSizeInBytes = blob.size;
    // Mengkonversi ukuran file ke kilobyte atau megabyte jika diperlukan
    const fileSizeInKb = fileSizeInBytes / 1024;
    const fileSizeInMb = fileSizeInKb / 1024;

    console.log('Ukuran file (bytes):', fileSizeInBytes);
    console.log('Ukuran file (KB):', fileSizeInKb);
    console.log('Ukuran file (MB):', fileSizeInMb);
    console.log('file type:', blob.type);

            const data = Cookies.get("jwt-token");
            const response = await fetch(`http://${apiKey}/api/image/upload`, {
              method: 'POST',
              headers: {
                'jwt-token': data,
              },
              body: formData,
            });
  
            if (response.ok) {
              const data = await response.json();
              console.log('URL Gambar:', data);
              setCurrentImage(data.imageUrl);
              setReupload(!reupload);
            } else {
              console.error('Gagal mengunggah gambar');
            }
          } catch (error) {
            console.error('Terjadi kesalahan:', error);
          }
        }, selectedImage.type); // Gunakan tipe gambar yang dipilih
      };
    }
  };


  

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
                                onClick={()=>setCurrentIndex(1)}>
                                upload
                      </button>
                      <button
                                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={()=>setCurrentIndex(2)}>
                                url
                      </button>
                      <button
                                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={()=>setCurrentIndex(3)}>
                                list image
                      </button>
                </div>
                    <TabsContent index={1} currentIndex={currentIndex}>
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
                                type="file" accept="image/*" onChange={handleImageChange} 
                            />
                      </div>
                      <button
                                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={handleUpload}>
                                upload
                      </button>
                     
                  </div> 
                  <div className='flex flex-col max-w-[80%] max-h-[60%] m-12' style={{}}>
                    {currentImage && currentImage.replace("http://103.127.132.64:3000", "http://api.figustack.com") ? <img className={`w-full h-full object-contain`}  src={`${currentImage.replace("http://103.127.132.64:3000", "http://api.figustack.com")}`}/> : null }
                    
                  </div>
                    </TabsContent>
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
                                onClick={()=>setCurrentImage(currentUrl)}>
                                preview
                      </button>
                     
                  </div> 
                  <div className='flex flex-col max-w-[80%] max-h-[60%] m-12' style={{}}>
                    {currentImage && currentImage.replace("http://103.127.132.64:3000", "http://api.figustack.com") ? <img className={`w-full h-full object-contain`}  src={`${currentImage.replace("http://103.127.132.64:3000", "http://api.figustack.com")}`}/> : null }
                    
                  </div>
                    </TabsContent>

                    <TabsContent index={3} currentIndex={currentIndex} className='m-4'>
                    <div className='flex gap-6 w-full h-[80%] flex-none flex-wrap overflow-y-auto justify-around'> 
                    {listImage.map((item,index) => (
            <div className='flex w-[40%] max-h-[50%] flex-col center' onClick={()=>handleImageChoose(item,index)} >
              <img className={`max-w-full max-h-full rounded ${index == currentImageIndex ? 'border-4 border-indigo-600 object-cover' : 'object-contain'} `} src={`${item.url_image.replace("http://103.127.132.64:3000", "http://api.figustack.com")}`} />
            </div>
        ))}
                     
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
                    onClick={handleSetImage}
                    
                  >
                    confirm
                  </button>
                </div>
                </ReuseModalButton>
        </>
    );
};

export default ImageModal;