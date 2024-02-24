'use client';
import SliderContainer from "../CardComponents.js/Slider/SliderContainer";
import Text from "./Text/Text";
import TextEditor from "./Text/TextEditor";
import TextPreview from "./Text/TextPreview";
import { AppStateContext } from '@/components/AppStateContext';
import ImagePreview from "./ImageEditor/Imagepreview";
import HeadlineEdit from "../CardComponents.js/Headline/HeadlineEdit";
import React, { useContext,useState,useEffect} from 'react';
import SubHeadingPreview from "../CardComponents.js/Preview/SubHeadingPreview";
import HeadingText from "./Text/HeadingText";
import SubHeading from "./Text/SubHeading";
import ArticleRecomendationContainer from "../CardComponents.js/articleRecomendation/articleRecomendationContainer";
import ArticleRecomendationPreview from "../CardComponents.js/Preview/articleRecomendationPreview";
import ArticleRecomendationEditor from "../CardComponents.js/articleRecomendation/ArticleRecomendationEditor";
import Card from "../Card";
import SaveAds from "./SaveAds";
import ImageEditor from "./ImageEditor/ImageEditor";
import ImageContainer from "./ImageEditor/ImageContainer";
import AdsEdit from "./AdsContent/AdsEdit";
import AdsPreview from "./AdsContent/AdsPreview";
import AdsContainer from "./AdsContent/AdsContainer";


const AdsEditorPage = (props) => {

  const {editor,card,setCard,adsCard,setAdsCard,componentsSelect, setComponentsSelect,onText} = useContext(AppStateContext);
  const [pageIndex, setPageIndex] = useState(0)
  const apiKey = process.env.API_KEY || 'localhost:3000';



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
        console.log('User pressed: ', event.key);
      }

    
    };

    document.addEventListener('keydown', keyDownHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, [componentsSelect]);





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
    console.log('handlepaste',clipboardItems)
    const clipboardData = await JSON.parse(clipboardItems)
    const newCard = [...card]
    clipboardData.map((item)=>{
      console.log(item)
      newCard[pageIndex].components.push(item)
      
    })
    setCard(newCard)
    console.log(newCard[pageIndex].components)
  

    

  }



  
  useEffect(() => {

    async function fetchData() {
      try {
     
        const response = await fetch(`https://${apiKey}/api/ads/getads/${props.Id}`, {
          method: 'GET',
          
        });
  
        if (response.status === 201) {
          const article = await response.json();
          const data = article;
          console.log('article', data.content);
          setCard([data.content])
          
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
    
  },[]);


  const EditorComponentMap = {
    TextEditor: TextEditor,
    ImageEditor: ImageEditor,
    ArticleRecomendationEditor: ArticleRecomendationEditor,
    AdsEdit : AdsEdit,
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
    Ads : AdsContainer,
    none: '',
   
    // Tambahkan pemetaan lain di sini
  };







  const EditorComponent = EditorComponentMap[editor.editor] || null;
  
    return (
      
        <div className='flex full-screen '>

          <div className='basis-1/4 w-full h-full bg-primary flex flex-col justify-center'>
              <div className="h-full w-full flex  basis-2/5 ">
                  {EditorComponent && <EditorComponent />}
              </div>
              <div className="h-full w-full flex center basis-3/5 ">
                  {
                   <div className="flex center flex-col overflow-y-auto w-full h-full customscroll gap-4">
                                      <TextPreview pageIndex={pageIndex}/>
                                      <ImagePreview pageIndex={pageIndex}/>
                                      <SubHeadingPreview pageIndex={pageIndex}/>
                                      <ArticleRecomendationPreview pageIndex={pageIndex}/>
                                      <AdsPreview pageIndex={pageIndex}/>
                                    </div>
                  
                  }
              </div>
          </div>

          <div className='basis-3/4  flex flex-col overflow-hidden bg-secondary'>
            <div className="w-full h-32  flex items-center p-8 flex-row-reverse">
                <SaveAds Id={props.Id}/>
            </div>
            <div className="flex center overflow-hidden m-8 ">
             
              <div className="w-[60rem] bg-secondary flex flex-row aspect-[5/6] overflow-hidden scale-75">
                <SliderContainer  >
                  {

                    <div className="flex flex-col">
                          
                    <Card >
                    {card[0].components.map((item2,index2)=>{
                      const CardComponent = CardComponentMap[item2.name] || null;
                      return (<CardComponent key={index2} all={item2} Text={item2.contents} style={item2.style} zIndex={item2.zIndex} page={0} componentIndex={index2} />)
                    })}
                    </Card>

                    </div>
                  }
                </SliderContainer>
              </div>
               
            </div>
           
          </div>
        
        </div>
      
     
    );
  };
  
  export default AdsEditorPage;