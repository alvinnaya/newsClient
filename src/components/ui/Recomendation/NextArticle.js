import React, { useEffect, useState } from 'react';
import Card from '../Card';
import BaseText from '../CardComponentView/BaseText';
import HeadingText from '../CardComponentView/HeadingText';
import BaseImage from '../CardComponentView/BaseImage';
import Link from 'next/link';


const NextArticle = ({id,TotalIndex,currentIndex}) => {
    const[anotherArticle,setAnotherArticle] = useState(null)
    const apiKey = process.env.API_KEY || 'localhost:3000';
    


    useEffect(() => {

        async function fetchData(id) {
          try {
            
            const response = await fetch(`http://${apiKey}/api/recomendation/getRecomendation/${id}`, {
              method: 'GET',
              
            });
            const article = await response.json();
            console.log(article)
            const response2 = await fetch(`http://${apiKey}/api/recomendation/getArticles?ids=${article}`, {
                method: 'GET',
                
              });

            const article2 = await response2.json();
            console.log('article2',article2)

            const Cards = await article2.map((item,index) => {
                console.log('item',item.blogContent)
                return(
                  <Link href={`${item.articleId}`} className={`scroll-slide-y-child  flex flex-col border-slate-700 border-2 scale-75 rounded-xl  `}>
                    <div key={TotalIndex}  className="w-[60rem] aspect-[1/1] scale-90 rounded-xl ">
                   
                   <Card key={index} className='' color={item.blogContent.color} gradient={item.blogContent.gradient}>
                   {item.blogContent.components.map((item2,index2)=>{
                     const CardComponent = CardComponentMap[item2.name];
                     console.log(item2)
                     return (<CardComponent key={index2} all={item2} Text={item2.contents} style={item2.style} zIndex={item2.zIndex} page={index} componentIndex={index2} />)
                   })}
                   </Card>
                 
                </div> 
<div>
  <button className='text-2xl bg-white rounded-xl p-4 m-8 border-slate-700 border-2 '>baca selengkapnya</button>
</div>
                  </Link>
                  
                  
                  
                )
            });

            console.log('another Article',Cards)
            setAnotherArticle(Cards)
          } catch (error) {
            console.error('Terjadi kesalahan', error);
            // Tambahkan logika apa yang harus dilakukan jika terjadi kesalahan
          }
          
        }
        fetchData(id);
        
      },[]);

      const CardComponentMap = {
        ImageContainer: BaseImage,
        HeadingText : HeadingText,
        SubHeading : BaseText,
        none: '',
       
        // Tambahkan pemetaan lain di sini
      };



      

      
    return (
        <>  
             <div key={TotalIndex+1}  className={`w-[60rem] scroll-slide-y aspect-[5/6] duration-700 flex-none flex-col overflow-y-auto overflow-x-hidden ${currentIndex >= TotalIndex? "":"opacity-0"} `} >
              
              {anotherArticle}
            
            </div>
        </>
    );
};

export default NextArticle;