import BaseImage from "./BaseImage";
import BaseText from "./BaseText";
import Card from "../Card";
import HeadingText from "./HeadingText";
import Link from "next/link";
import ArticleRecomendation from "./ArticleRecomendation";
import AdsCard from "./AdsCard";
import Shape from "./Shape";




const CardView =  ({card,currentIndex,ads,response2}) => {



  
  
 
  
    const CardComponentMap = {
        Text: BaseText,
        ImageContainer: BaseImage,
        HeadingText : HeadingText,
        SubHeading : BaseText,
        ArticleRecomendationContainer: ArticleRecomendation,
        Shape : Shape,
        none: '',
       
        // Tambahkan pemetaan lain di sini
      };

     
      
      

    return (
        <>
       
            {
             ads == 0 ?
             card.map((item,index) => {
              return(
          
                <div key={index} id={`${index+1}`} className={`${currentIndex == (index+1)? "opacity-[100%]":"opacity-[0%]"} duration-[2000ms] overflow-hidden w-[60rem] scale-[1] md:scale-100  h-[72rem] flex-none border-neutralSecondary1 border-2 scale-90 rounded-xl  `}>
                  
                  <Card key={index} color={`${item.color}`}  gradient={`${item.gradient}`}>
                  {item.components.map((item2,index2)=>{
                    const CardComponent = CardComponentMap[item2.name];
                    console.log(item2)
                    return (<CardComponent key={index2} all={item2} Text={item2.contents} style={item2.style} zIndex={item2.zIndex} page={index} componentIndex={index2} />)
                  })}
                  </Card>
                
                </div> 
            )
             })
            :
            card.map((item,index) => {
        
        if ((index + 1) % 2 === 0) { // Jika indeks + 1 adalah kelipatan tiga
          return(
            <>
            <div key={index} id={`${index+1}`} className={`${currentIndex == ((index+1)+((index+1)/2)-1)? "opacity-[100%]":"opacity-[0%]"} p-0 m-0 duration-[2000ms] w-[60rem] h-[72rem] scale-[1] md:scale-90 flex-none border-neutralSecondary1 border-2  rounded-xl overflow-hidden  `}>
              
              <Card key={index} color={`${item.color}`}  gradient={`${item.gradient}`}>
              {item.components.map((item2,index2)=>{
                const CardComponent = CardComponentMap[item2.name];
                console.log(item2)
                return (<CardComponent key={index2} all={item2} Text={item2.contents} style={item2.style} zIndex={item2.zIndex} page={index} componentIndex={index2} />)
              })}
              </Card>
            
            </div>

            <div key={index} id={`${index+1}`} className={`duration-1000 ${currentIndex ==  ((index+1)+(index+1)/2)? "opacity-[100%]":"opacity-[10%]"} overflow-hidden w-[60rem] h-[72rem] flex-none border-neutralSecondary1 border-2 scale-[1] md:scale-90  rounded-xl  `}>
               <AdsCard ads={ads} ></AdsCard> 
              {/* <Card key={index}>
              {item.components.map((item2,index2)=>{
                const CardComponent = CardComponentMap[item2.name];
                console.log(item2)
                return (<CardComponent key={index2} all={item2} Text={item2.contents} style={item2.style} zIndex={item2.zIndex} page={index} componentIndex={index2} />)
              })}
              </Card> */}
            
            </div>
            </>
          
            

            
            
          
          
        )
        } else {
          return(
          
            <div key={index} id={`${index+1}`} className={`${currentIndex == (index+1)+(index/2)? "opacity-[100%]":"opacity-[0%]"} duration-[2000ms] overflow-hidden w-[60rem] h-[72rem] flex-none border-neutralSecondary1 border-2 scale-[1] md:scale-90  rounded-xl  `}>
              
              <Card key={index} color={`${item.color}`}  gradient={`${item.gradient}`}>
              {item.components.map((item2,index2)=>{
                const CardComponent = CardComponentMap[item2.name];
                console.log(item2)
                return (<CardComponent key={index2} all={item2} Text={item2.contents} style={item2.style} zIndex={item2.zIndex} page={index} componentIndex={index2} />)
              })}
              </Card>
            
            </div>
            
          
          
        )
        }
        
    })}
        
        
        </>
    );
};




export default CardView;