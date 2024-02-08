

import Card from "../Card";
import { lazy } from "react";

const BaseText = lazy(()=> import("../CardComponentView/BaseText"))
const HeadingText = lazy(()=> import("../CardComponentView/HeadingText"))
const ArticleRecomendation = lazy(()=> import("../CardComponentView/ArticleRecomendation"))
const BaseImage = lazy(()=> import("../CardComponentView/BaseImage"))
const Shape  = lazy(()=> import("../CardComponentView/Shape"))
const EditorCardPreview =  ({card,currentIndex}) => {



  
  
 
  
    const CardComponentMap = {
        Text: BaseText,
        ImageContainer: BaseImage,
        HeadingText : HeadingText,
        SubHeading : BaseText,
        ArticleRecomendationContainer: ArticleRecomendation,
        Shape: Shape,
        none: '',
       
        // Tambahkan pemetaan lain di sini
      };

     
      
      

    return (
        <>
       
            {card.map((item,index) => {
        
        return(
          
            <div key={index} id={`${index+1}`} className={` duration-[2000ms] w-[60rem] aspect-[5/6] flex-none border-slate-700 border-2 scale-90 rounded-xl overflow-hidden `}>
              
              <Card key={index} color={`${item.color}`}  gradient={`${item.gradient}`}>
              {item.components.map((item2,index2)=>{
                const CardComponent = CardComponentMap[item2.name];
                console.log(item2)
                return (<CardComponent key={index2} all={item2} Text={item2.contents} style={item2.style} zIndex={item2.zIndex} page={index} componentIndex={index2} />)
              })}
              </Card>
            
            </div>
            
          
          
        )
        
    })}
        
        
        </>
    );
};




export default EditorCardPreview;