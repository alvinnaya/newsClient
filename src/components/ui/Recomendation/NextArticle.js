import React, { useEffect, useState, useRef } from 'react';
import Card from '../Card';
import BaseText from '../CardComponentView/BaseText';
import HeadingText from '../CardComponentView/HeadingText';
import BaseImage from '../CardComponentView/BaseImage';
import Link from 'next/link';
import Shape from '../CardComponentView/Shape';
import AdsCard from '../CardComponentView/AdsCard';
import Banner from '@/components/Adstera';

const NextArticle = ({id,TotalIndex,currentIndex,ads}) => {
    const[anotherArticle,setAnotherArticle] = useState(null)
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const observerTarget = useRef(null);

    const apiKey = process.env.API_KEY|| 'localhost:3000';
    
    useEffect(() => {
    
      if (page === 1) {
        //console.log("pag",page);
        loadMore();
        return;
      }
      if(loading){
        return;
      }
      const observer = new IntersectionObserver(
        (entries) => {
          //console.log('terliat',entries[0])
          
          if (entries[0].isIntersecting) {
            //console.log('meload');
            loadMore(); // Memanggil loadMore saat elemen teramati
            //console.log('meload');
          }
        }
      );
    
      if (observerTarget.current) {
        observer.observe(observerTarget.current);
      }
    
      return () => {
        if (observerTarget.current) {
          observer.unobserve(observerTarget.current);
        }
      };
    }, [page]);




    const loadMore = async () => {
      //console.log(observerTarget.current)
      if (loading) return;
  
      setLoading(true);
  
      try {
        //console.log('link',process.env.API_KEY)
        const response = await fetch(`https://${apiKey}/api/recomendation/getRecomendation/${id}`, {
              method: 'GET',
              
            });
            const article = await response.json();
            //console.log(article)
            const response2 = await fetch(`https://${apiKey}/api/recomendation/getArticles?ids=${article}&page=${page}`, {
                method: 'GET',
                
              });

            const article2 = await response2.json();
        setPosts([...posts, ...article2]);
        //console.log('length',article2.length);
        if(article2.length != 0){
          setPage(page + 1)
        }
        
        
      
      } catch (error) {
        //console.error(error);
      } finally {
        //console.log(page)
         
        setLoading(false);
      }
    };





      const CardComponentMap = {
        ImageContainer: BaseImage,
        HeadingText : HeadingText,
        SubHeading : BaseText,
        Shape: Shape,
        Text: BaseText,

        none: '',
       
        // Tambahkan pemetaan lain di sini
      };



      

      
    return (
        <>  
             <div key={TotalIndex+1}  className={`w-[60rem] scale-[1.05]  md:scale-100  scroll-slide-y aspect-[5/6] duration-700 flex-none flex-col overflow-y-auto overflow-x-hidden ${currentIndex >= TotalIndex? "":"opacity-0"} `} >
              
              {posts && posts.map((item,index) => {
                //console.log('index',(index + 1)%3)
                return(
                  <>
                  
                  <div className={`scroll-slide-y-child flex flex-col center scale-[80%] h-full lg:scale-75 rounded-xl  `}>
                  
                  <a href={`${item.articleId}`} className="rounded-xl border border-current p-0 m-0 hover:brightness-[0.8] active:brightness-[0.5] focus:brightness-[0.5] ">
                 
                   <div className="w-[60rem] flex aspect-[5/6] rounded-xl m-0 p-0">
                   <Card  key={index} color={`${item.blogContent.color}`}  gradient={`${item.blogContent.gradient}`}>
                   {item.blogContent.components.map((item2,index2)=>{
                     const CardComponent = CardComponentMap[item2.name];
                     
                     return (<CardComponent key={index2} all={item2} Text={item2.contents} style={item2.style} zIndex={item2.zIndex} page={index} componentIndex={index2} />)
                   })}
                   </Card>
                   </div>
                 
                 <div className='  w-full h-[8rem] bg-gradient-to-tr from-primary1 to-primary2 rounded-b-xl flex center p-0 m-0'>
                 <svg xmlns="http://www.w3.org/2000/svg" width="80%" height="80%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
                 </div>  
                 
                </a> 
                {(index + 1)%3 == 1 && 
                <div  ref={observerTarget} className={` flex flex-col center scale-[80%] h-[60%]   `}>
                
                </div>
                }
                  </div>

                  { (index + 1) >= 4 && (index + 1)%3 == 0 && 
                  <div className={`scroll-slide-y-child flex flex-col center scale-[80%] h-full lg:scale-75 rounded-xl  `}>
                  <div  className={`w-[60rem] flex aspect-[5/6] rounded-xl m-0 p-0"`}>
                    {/* <AdsCard ads={ads} ></AdsCard>  */}
                    <Banner w={300} h={250}/>
                   
                  </div>
                  </div>
                  }
                 
                  </>
                  
                  
                )
            })
            }

            
           
              <div className={` flex flex-col center scale-[80%] h-[60%]   `}>
                <div className="w-[8rem] h-[8rem] ">
                <svg className="animate-spin duration-1000" xmlns="http://www.w3.org/2000/svg" width="80%" height="80%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>
                </div>
              </div>
            
            
            </div>
        </>
    );
};

export default NextArticle;