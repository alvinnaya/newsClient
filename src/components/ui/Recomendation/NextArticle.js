import React, { useEffect, useState, useRef } from 'react';
import Card from '../Card';
import BaseText from '../CardComponentView/BaseText';
import HeadingText from '../CardComponentView/HeadingText';
import BaseImage from '../CardComponentView/BaseImage';
import Link from 'next/link';
import Shape from '../CardComponentView/Shape';

const NextArticle = ({id,TotalIndex,currentIndex}) => {
    const[anotherArticle,setAnotherArticle] = useState(null)
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const observerTarget = useRef(null);

    const apiKey = process.env.API_KEY|| 'localhost:3000';
    
    useEffect(() => {
    
      if (page === 1) {
        console.log("pag",page);
        loadMore();
        return;
      }
      if(loading){
        return;
      }
      const observer = new IntersectionObserver(
        (entries) => {
          console.log('terliat',entries[0])
          
          if (entries[0].isIntersecting) {
            console.log('meload');
            loadMore(); // Memanggil loadMore saat elemen teramati
            console.log('meload');
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
      console.log(observerTarget.current)
      if (loading) return;
  
      setLoading(true);
  
      try {
        console.log('link',process.env.API_KEY)
        const response = await fetch(`https://${apiKey}/api/recomendation/getRecomendation/${id}`, {
              method: 'GET',
              
            });
            const article = await response.json();
            console.log(article)
            const response2 = await fetch(`https://${apiKey}/api/recomendation/getArticles?ids=${article}&page=${page}`, {
                method: 'GET',
                
              });

            const article2 = await response2.json();
        setPosts([...posts, ...article2]);
        console.log('length',article2.length);
        if(article2.length != 0){
          setPage(page + 1)
        }
        
        
      
      } catch (error) {
        console.error(error);
      } finally {
        console.log(page)
         
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
                console.log('index',(index + 1)%3)
                return(
                  <div className={`scroll-slide-y-child flex flex-col center scale-[80%] h-full lg:scale-75 rounded-xl  `}>
                  <Link href={`${item.articleId}`}    className="rounded-xl border border-current p-0 m-0  ">
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
                 
                </Link> 
                  </div>
                  
                  
                  
                )
            })
            }

            
           
              <div ref={observerTarget} className={` flex flex-col center scale-[80%] h-[5%]   `}>
                  
              </div>
            
            
            </div>
        </>
    );
};

export default NextArticle;