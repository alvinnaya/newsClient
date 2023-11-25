'use client'
import React, { useEffect, useState,useRef } from 'react';
import Card from '@/components/ui/Card';
import BaseText from '@/components/ui/CardComponentView/BaseText';
import HeadingText from '@/components/ui/CardComponentView/HeadingText';
import BaseImage from '@/components/ui/CardComponentView/BaseImage';
import Logo from '@/components/Logo/logo';
import Link from 'next/link';


const page = () => {
    const[anotherArticle,setAnotherArticle] = useState(null)
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const observerTarget = useRef(null);
    const apiKey = process.env.API_KEY || 'localhost:3000';

    
    const loadMore = async () => {
      
        if (loading) return;
    
        setLoading(true);
    
        try {
          console.log('link',process.env.API_KEY)
          const response = await fetch(`http://${apiKey}/api/article/getallArticle?page=${page}&perPage=4`);
          const data = await response.json();
          setPosts([...posts, ...data]);
          console.log('length',data.length);
          if(data.length != 0){
            setPage(page + 1)
          }
          
          
        
        } catch (error) {
          console.error(error);
        } finally {
          console.log(page)
           
          setLoading(false);
        }
      };


      // const handleScroll = () => {
      //   console.log(window.innerHeight + document.documentElement.scrollTop)
      //   console.log(window.innerHeight)
      
      //   if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading) {
          
      //     return;
      //   }
      //   console.log(window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading)
      //   loadMore();


       
      // };

    


   useEffect(() => {
    
  if (page === 1) {
    console.log(page);
    loadMore();
    return;
  }
  if(loading){
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        loadMore(); // Memanggil loadMore saat elemen teramati
        console.log('meload');
      }
    },
    { threshold: 1 }
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


      const CardComponentMap = {
        ImageContainer: BaseImage,
        HeadingText : HeadingText,
        SubHeading : BaseText,
        none: '',
       
        // Tambahkan pemetaan lain di sini
      };



      

      
    return (
        <>  
             <div key={1}  className={`scroll-slide-y duration-700 flex-none flex-col center h-screen overflow-y-auto `} >
              <div className="w-full fixed z-50 bg-Primary bg-white py-0 lg:bg-transparent lg:h-[8rem] px-4 lg:justify-start flex lg:fixed lg:top-0 lg:p-8">
          
                <div className="lg:w-[8rem] lg:h-[8rem] py-0 w-[10rem] h-[10rem] my-4 "><Logo/></div>
              
              </div>
              
              {posts && posts.map((item,index) => {
                
                return(
                  <div className={`scroll-slide-y-child  flex flex-col center scale-90 h-screen lg:scale-75 rounded-xl  `}>
                    <Link href={`articles/${item.articleId}`}  key={index}  className="w-[60rem] aspect-[5/6] rounded-xl border border-current ">
                   
                   <Card key={index}  color={`${item.blogContent.color}`}  gradient={`${item.blogContent.gradient}`}>
                   {item.blogContent.components.map((item2,index2)=>{
                     const CardComponent = CardComponentMap[item2.name];
                     
                     return (<CardComponent key={index2} all={item2} Text={item2.contents} style={item2.style} zIndex={item2.zIndex} page={index} componentIndex={index2} />)
                   })}
                   </Card>
                 
                </Link> 
                
<div>
  <button className='text-2xl bg-white rounded-xl p-4 m-8 border-slate-700 border-2 '>baca selengkapnya</button>
</div>
                  </div>
                  
                  
                  
                )
            })}
            
            
            
    <div ref={observerTarget}></div>
    
            </div>

            
        </>
    );
};

export default page;