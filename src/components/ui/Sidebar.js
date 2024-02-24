'use client';
import Card from "./Card";
import SliderContainer from "./CardComponents.js/Slider/SliderContainer";
import Text from "./CardComponents.js/Text/Text";
import TextEditor from "./CardComponents.js/Text/TextEditor";
import TextPreview from "./CardComponents.js/Preview/TextPreview";
import { AppStateContext } from '@/components/AppStateContext';
import ImagePreview from "./CardComponents.js/Preview/Imagepreview";
import ImageEditor from "./CardComponents.js/Image/ImageEditor";
import ImageContainer from "./CardComponents.js/Image/ImageContainer";
import HeadlineEdit from "./CardComponents.js/Headline/HeadlineEdit";
import PublishButton from "./PublishButton";
import React, { useContext,useState,useEffect} from 'react';
import SubHeadingPreview from "./CardComponents.js/Preview/SubHeadingPreview";
import HeadingText from "./CardComponents.js/Text/HeadingText";
import SubHeading from "./CardComponents.js/Text/SubHeading";
import ArticleRecomendationContainer from "./CardComponents.js/articleRecomendation/articleRecomendationContainer";
import ArticleRecomendationPreview from "./CardComponents.js/Preview/articleRecomendationPreview";
import ArticleRecomendationEditor from "./CardComponents.js/articleRecomendation/ArticleRecomendationEditor";
import CardEditor from "./CardComponents.js/Card/cardEditor";
import Shape from "./CardComponents.js/Shape/shape";
import ShapePreview from "./CardComponents.js/Preview/ShapePreview";
import shapeEditor from "./CardComponents.js/Shape/shapeEditor";
import Cookies from "js-cookie";

const Sidebar = (props) => {

  const {editor,setEditor,card,setCard,componentsSelect, setComponentsSelect,componentsClipBoard,setComponentsClipBoard,onText} = useContext(AppStateContext);
  const [pageIndex, setPageIndex] = useState(0)
  const [isInside, setIsInside] = useState(false)
  const [reload,setReload] = useState(false)
  const apiKey = process.env.NEXT_PUBLIC_API_KEY || 'localhost:3000';
const deffaultImage = process.env.DEFFAULT_IMG || '1696143107524.webp';
 
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
    
    
   const response = await fetch(`https://${apiKey}/api/article/update`, {
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
     setReload(!reload)
     
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


useEffect(() => {
    const keyDownHandler = event => {
      
      const code = event.which || event.keyCode;

      let charCode = String.fromCharCode(code).toLowerCase();
      if ((event.ctrlKey || event.metaKey) && charCode === 's') {
        console.log('save')
      } else if ((event.ctrlKey || event.metaKey) && charCode === 'c') {
        console.log('copy')
        console.log('select',componentsSelect)
        handleCopy()
        // setComponentsClipBoard(componentsSelect)
      } else if ((event.ctrlKey || event.metaKey) && charCode === 'v') {
        console.log('paste')
        handlePaste()

      }else{
        console.log('User pressed: ', event.key, isInside);
      }

    
    };

    document.addEventListener('keydown', keyDownHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, [componentsSelect]);




  useEffect(() => {

    async function fetchData() {
      try {
     
        const response = await fetch(`http://${apiKey}/api/article/getarticle/${props.Id}`, {
          method: 'GET',
          
        });
  
        if (response.status === 201) {
          const article = await response.json();
          const data = article.content.BlogContent;
          console.log('article', data);
          setCard(data);
          
          // Tambahkan logika apa yang harus dilakukan setelah artikel berhasil dibuat
        } else {
          console.error('Gagal meload artikel');
          // Tambahkan logika apa yang harus dilakukan jika gagal membuat artikel
        }
      } catch (error) {
        console.error('Terjadi kesalahan', error);
        // Tambahkan logika apa yang harus dilakukan jika terjadi kesalahan
      }
      
    }
    fetchData();
    
  },[reload]);





  const EditorComponentMap = {
    TextEditor: TextEditor,
    ImageEditor: ImageEditor,
    ArticleRecomendationEditor: ArticleRecomendationEditor,
    CardEditor : CardEditor,
    Shape: shapeEditor,
    none: '',
   
    // Tambahkan pemetaan lain di sini
  };

  const CardComponentMap = {
    Text: Text,
    ImageContainer: ImageContainer,
    HeadlineEdit: HeadlineEdit,
    HeadingText : HeadingText,
    SubHeading : SubHeading,
    ArticleRecomendationContainer: ArticleRecomendationContainer, 
    Shape: Shape,
    none: '',
   
    // Tambahkan pemetaan lain di sini
  };

  const handleCopy = async () => {
    console.log('onText',onText.current)
if(onText.current){
  return;
}


    const newCard = [...card];
    const newComponentArray = [];
  
    console.log(newCard[pageIndex]);
  
    componentsSelect.forEach((item) => {
      console.log(newCard[pageIndex].components[item]);
      newComponentArray.push(newCard[pageIndex].components[item]);
    });
  
    console.log('newComponent', newComponentArray);
  
    try {
      await navigator.clipboard.writeText(JSON.stringify(newComponentArray));
      console.log('Data copied to clipboard successfully.');
    } catch (err) {
      console.error('Error copying to clipboard:', err);
    }
  };
  

  const handlePaste = async ()=> {
    const clipboardItems = await navigator.clipboard.readText()
    console.log('paste',JSON.parse(clipboardItems))
    const clipboardData = await JSON.parse(clipboardItems)
    const newCard = [...card]
    clipboardData.map((item)=>{
      console.log(item)
      newCard[pageIndex].components.push(item)
      
    })
    setCard(newCard)
    console.log(newCard[pageIndex].components)
  

    saveDraft()

  }
  


  const handleNext = () =>{
      if(pageIndex == card.length){

      }else{

        const newPageIndex = pageIndex + 1;
        setPageIndex(newPageIndex)
        setComponentsSelect([])
      }
  }

  const handlePrev = () =>{
    if(pageIndex == 0){

    }else{
      const newPageIndex = pageIndex - 1;
      setPageIndex(newPageIndex)
      setComponentsSelect([])
    }
}

const handleSwapleft = (index1,index2) =>{
  if(pageIndex == 1){

  }else{
    const newCard = [...card]
    console.log(newCard[index1])
    console.log(newCard[index2])
    const temp = newCard[index2]
    newCard[index2] = newCard[index1]
    newCard[index1] = temp
    setCard(newCard);
    
  }
}

const handleSwapright = (index1,index2) =>{
  if(pageIndex == card.length-1){

  }else{
    const newCard = [...card]
    console.log(newCard[index1])
    console.log(newCard[index2])
    const temp = newCard[index2]
    newCard[index2] = newCard[index1]
    newCard[index1] = temp
    setCard(newCard);
    
  }
}

const handleDelete = (index) =>{
  if(pageIndex <= 1){
   
  }else{
    const newCard = [...card]
    newCard.splice(index,1)
    setCard(newCard)
    
  }
}

const handleAdd = () => {
  // Menggunakan callback dalam setCard untuk memastikan penggunaan nilai terakhir dari state
  setCard((prevCard) => {
    // Membuat objek salinan baru daripada mengubah langsung array state
    const newCard = [...prevCard];

    // Membuat kartu kosong dengan nomor halaman yang sesuai
    const emptyCard = {
      page: `${prevCard.length + 1}`,
      components: [],
    };

    // Menambahkan kartu kosong ke array baru
    newCard.push(emptyCard);

    // Mengembalikan array baru untuk diatur sebagai state
    return newCard;
  }, () => {
    // Callback ini akan dipanggil setelah state berhasil diperbarui
    console.log('berhasil add')
    saveDraft();
  });
};




  const Cards = card.map((item,index) => {
    
   
    const handleFocus = (e) => {
      console.log('focus',index,item.color)
      const newEditor = {...editor}; // Menyalin array card ke variabel baru agar tidak mengubah state langsung
      newEditor.index.cardIndex = index; // Mengganti nilai contents pada komponen pertama
      newEditor.editor = 'CardEditor'
      setEditor(newEditor);
      console.log(props.all.contents)
      
      };
    return(
      <div key={index}  
      
      className="flex flex-col relative  ">
        <div className="absolute bottom-0 right-0 ">
          <button   onClick={handleFocus} className="flex center w-12 h-12 bg-neutralPrimary1 hover:bg-neutralSecondary1 hover:text-neutralPrimary1 rounded-xl duration-700 m-4 p-2 ">
          <svg xmlns="http://www.w3.org/2000/svg" width="90%" height="90%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="16 3 21 8 8 21 3 21 3 16 16 3"></polygon></svg>
          </button>
        </div>
        
       {
       index > 0
       ?  <div style={{zIndex:`999`}}  className="opacity-60 absolute flex justify-between flex-row w-full top-0 px-6 pt-4">
                   <div  className="">
                       <button className="z-50 rotate-180 p-2 " onClick={()=>{handleSwapleft(index,index-1)}}>
                       <svg className="text-secondary w-12 h-12" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 17l5-5-5-5M6 17l5-5-5-5"/></svg>
                       </button>
                       <button className="p-2 fill-slate-200" onClick={()=>{handleSwapright(index,index+1)}}>
                       <svg className="text-secondary w-12 h-12" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 17l5-5-5-5M6 17l5-5-5-5"/></svg>
                       </button>
                   </div>
       
                   <button   onClick={()=>{handleDelete(index)}}>
                   <svg className="h-12 w-12 text-secondary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
                   </button>
       
               </div>
       : null
       }
          <Card  key={index} color={`${item.color}`}  gradient={`${item.gradient}`} >
          {
          item.components.map((item2,index2)=>{
            
            const CardComponent = CardComponentMap[item2.name] || null;
            return (<CardComponent select={componentsSelect.includes(index2)} key={index2} all={item2} Text={item2.contents} style={item2.style} zIndex={item2.zIndex} page={index} componentIndex={index2} />)
          })}
          </Card>
        
      </div>
    )
});
  const EditorComponent = EditorComponentMap[editor.editor] || null;
  
    return (
      
        <div className='flex full-screen '>

          <div className='basis-1/4 w-full h-full bg-neutralPrimary2 flex flex-col justify-center'>
              <div 
              className="h-full w-full flex border basis-3/5 overflow-y-auto ">
                  {EditorComponent && <EditorComponent />}
              </div>
              <div className="h-full w-full   flex  basis-2/5  overflow-y-auto">
                  {
                  pageIndex > 0
                  ? <div className="flex  flex-col m-auto items-center w-full h-full customscroll gap-4">
                                      <TextPreview pageIndex={pageIndex}/>
                                      <ImagePreview pageIndex={pageIndex}/>
                                      <SubHeadingPreview pageIndex={pageIndex}/>
                                      <ArticleRecomendationPreview pageIndex={pageIndex}/>
                                      <ShapePreview pageIndex={pageIndex}/>
                                      
                                      
                                    </div>
                  : null
                  }
              </div>
          </div>

          <div className='basis-3/4  flex flex-col overflow-hidden bg-neutralSecondary2'>
            <div className="w-full h-32  flex items-center p-8 flex-row-reverse">
                <PublishButton Id={props.Id}/>
            </div>
            <div className="flex center overflow-hidden m-8 ">
                <button className="rotate-180 block" onClick={handlePrev}>
                <svg className="hover:opacity-100 opacity-80 text-center w-12 h-12 m-2 text-secondary p-2 bg-primary rounded-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
                </button>
              <div  className="w-[60rem] bg-secondary flex flex-row aspect-[5/6] overflow-hidden scale-[70%] ">
                <SliderContainer index={pageIndex} >
                  {Cards}
                  <div className="flex flex-col">
                    <Card key={card.length}>
                      <div style={{gridColumnStart: `1`,gridColumnEnd: `11`,gridRowStart: `1`,gridRowEnd: `11`}}  className="w-full h-full flex center">
                      <button className="p-4 opacity-60 hover:opacity-100" onClick={handleAdd}>
                      <svg className="w-20 h-20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                      </button>
                      </div>
                    </Card>
                  </div>
                  
                </SliderContainer>
              </div>
                <button className="block text-center" onClick={handleNext}>
                <svg className="hover:opacity-100 opacity-80 text-center w-12 h-12 m-2 text-secondary p-2 bg-primary rounded-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
                </button>
            </div>
           
          </div>
        
        </div>
      
     
    );
  };
  
  export default Sidebar;