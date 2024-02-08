
import { useRouter } from 'next/navigation';
import { useState,useEffect, useContext } from "react";
import { Tags } from "./Editor_UI/Tags";
import Cookies from "js-cookie";
import { AppStateContext } from "../AppStateContext";


const Modal = (props) => {
  const {editor,card} = useContext(AppStateContext);
  const [inputValue, setInputValue] = useState('');
  const [articleTag,setArticleTag] = useState([  { id: 1, name: 'Mobil' },
  { id: 2, name: 'Motor' }]);
  const [allTag,setAllTag] = useState([]);
  const router = useRouter();
  const apiKey = process.env.NEXT_PUBLIC_API_KEY || 'localhost:3000';
  
  useEffect(() => {

     async function fetchData(){
      console.log('get tags')
    try{
      console.log('get tags')
      const data1 = await fetch(`http://${apiKey}/api/article/alltags`, {
            method: 'GET',
          })
      const data2 = await fetch(`http://${apiKey}/api/article/articletags/${props.Id}`, {
            method: 'GET',
          })
      const articleTags = await data2.json()
      const allTag = await data1.json()
      setAllTag(allTag)
      setArticleTag(articleTags)
    
    }catch(err){
console.log(err)
    }
    }

    fetchData()
    
   
  },[]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const addTag =async(item,index)=>{
   
      console.log(item)
      const Tag = [...articleTag]
      const listTag = [...allTag]

      try{
        console.log(inputValue)
        const data = Cookies.get("jwt-token")
        const response = await fetch(`http://${apiKey}/api/article/initializeTag`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'jwt-token': data,
              },
              body: JSON.stringify({ 'article_id':props.Id, 'tag_id': item.id }),
            });
        const Tags = await response.json();
        console.log(Tags)
        Tag.push(item)
      listTag.splice(index,1);
      setAllTag(listTag)
      setArticleTag(Tag)
      }catch(err){
        console.log(err)
      }

  }

  const deleteTag = async(item,index)=>{
    console.log(item.id)
    const Tag = [...articleTag]
    const listTag = [...allTag]

    try{
      console.log(item.id)
      const data = Cookies.get("jwt-token")
      const response = await fetch(`http://${apiKey}/api/article/removeTag`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'jwt-token': data,
            },
            body: JSON.stringify({ 'article_id':props.Id, 'tags_id': item.id }),
          });
      const Tags = await response.json();
      console.log(Tags)
      listTag.push(item)
      Tag.splice(index,1);
      setAllTag(listTag)
      setArticleTag(Tag)
          
    }catch(err){
      console.log(err)
    }

   
}

const saveDraft = async()=>{
  try{

    const data = Cookies.get("jwt-token")
    const content = { BlogContent :card}
    const title = content.BlogContent[0].components[0].contents
    const foundImageContainer = content.BlogContent.map((blog) =>
    blog.components.find((component) => component.name === 'ImageContainer')
  ).filter(Boolean)[0];
 
  const textContents = [];
  card.forEach((page) => {
    page.components.forEach((component) => {
      if (component.name === 'Text') {
        textContents.push(component.contents);
      }
    });
  });

  const descp = textContents.join(' ');
    const url_image = foundImageContainer.contents;
    console.log('image',url_image)
    console.log('title', title)
    console.log('full text',descp)
    console.log(textContents)
    console.log(props.Id)
  
  
 const response = await fetch(`http://${apiKey}/api/article/update`, {
   method: 'PUT',
   headers: {
     'Content-Type': 'application/json',
     'jwt-token': data,
   },
   body: JSON.stringify({ 'title':title, 'content': content, 'id':props.Id, 'url_image':url_image, 'descrip':descp }),

 });

 if (response.status === 201) {
   const article = await response.json();
   console.log('idarticle', props.Id)
   console.log(article);
   router.push(`/writer/draft`)
   // Tambahkan logika apa yang harus dilakukan setelah artikel berhasil dibuat
 } else {
   console.error('Gagal membuat artikel');
   // Tambahkan logika apa yang harus dilakukan jika gagal membuat artikel
 }

} catch (error) {
 console.error('Terjadi kesalahan', error);
 // Tambahkan logika apa yang harus dilakukan jika terjadi kesalahan
}
}

const CreateTag = async()=>{

  try{
    console.log(inputValue)
    const data = Cookies.get("jwt-token")
    const response = await fetch(`http://${apiKey}/api/article/createTag`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'jwt-token': data,
          },
          body: JSON.stringify({ inputValue }),
        });
        console.log(response.status)
        if(response.status == 201){
          const Tags = await response.json();
          console.log(Tags.tag)
          console.log(inputValue)
          const listTag = [...allTag]
          const newList =Tags.tag
          listTag.push(newList)
          setAllTag(listTag)
        }
        
  }catch(err){
    console.log(err)
  }

}


    return (
      <div className="mt-12 w-full flex flex-col space-y-4 items-center mx-4 sm:mx-0">
      <div
        className="py-8 px-8 items-center rounded shadow-lg overflow-hidden w-full sm:w-11/12 md:max-w-xl hover:shadow-xl bg-white dark:bg-gray-800">
        <div className="flex flex-row justify-start items-center">
          <h1 className="text-lg sm:text-2xl font-bold text-gray-800 mr-2 dark:text-gray-100">Article Tags</h1>
          
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600 dark:text-gray-300" fill="none"
            viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <div className='my-3 flex flex-wrap -m-1'>
          {articleTag.map((item,index) => (
            <button key={item.id} onClick={()=>{deleteTag(item,index)}}>
              <Tags name={item.name} key={item.id}/>
            </button>
        ))}
            
          </div>
        </div>

        <div>
          <div className="mt-8 flex flex-row items-center">
            <div
              className="flex bg-gray-100 p-1 items-center w-full space-x-2 sm:space-x- rounded border border-gray-500 dark:bg-gray-700 dark:border-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 opacity-50 dark:text-gray-100 ml-2" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              <input value={inputValue} onChange={handleInputChange} className="bg-gray-100 outline-none text-sm sm:text-base w-full dark:bg-gray-700 dark:text-gray-200 border-transparent focus:border-transparent focus:ring-0" type="text"
                placeholder="Add a tag..." />
            </div>
            <div>
              <button onClick={CreateTag} className=" m-2 inline-flex items-center rounded border border-black bg-black px-6 py-2 text-white hover:text-black hover:bg-white">
                <span className="text-sm font-medium"> Add</span>
              </button>
            </div>
          </div>  
        </div>

        <div>
          <div className='my-3 flex flex-wrap -m-1'>
          {allTag.map((item, index) => (
          <button key={item.id} onClick={()=>addTag(item,index)}>
            <Tags key={item.id} name={item.name}/>
          </button>
        ))}
          </div>
        </div>

        <div className="flex flex-row center">
            <button onClick={()=> props.setModal(false)} className=" m-2 inline-flex items-center gap-2 rounded-md bg-slate-100 px-4 py-2 text-black hover:bg-slate-300">
              <span className="text-sm font-medium"> Cancel</span>
            </button>
            <button onClick={saveDraft} className=" m-2 inline-flex items-center gap-2 rounded-md border border-black bg-black px-4 py-2 text-white hover:text-black hover:bg-white">
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
        </div>
       
      </div>
    </div>
    );
};

export default Modal;