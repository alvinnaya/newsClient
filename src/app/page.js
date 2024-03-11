'use client'
import React, { useEffect, useState,useRef } from 'react';
import Card from '@/components/ui/Card';
import BaseText from '@/components/ui/CardComponentView/BaseText';
import HeadingText from '@/components/ui/CardComponentView/HeadingText';
import BaseImage from '@/components/ui/CardComponentView/BaseImage';
import Shape from '@/components/ui/CardComponentView/Shape';
import Logo from '@/components/Logo/logo';
import Link from 'next/link';
import Banner from '@/components/Adstera';


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
          const response = await fetch(`https://${apiKey}/api/article/getallArticle?page=${page}&perPage=4`);
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
        Text: BaseText,
        Shape: Shape,
        none: '',
       
        // Tambahkan pemetaan lain di sini
      };



      

      
    return (
        <>  
             <div key={1}  className={`scroll-slide-y duration-700 flex-none flex-col center h-screen overflow-y-auto `} >
              <div className="w-full fixed z-50 bg-Primary bg-white py-0 lg:bg-transparent lg:h-[8rem] px-4 lg:justify-start flex lg:fixed lg:top-0 lg:p-8">
            
                <Link href={'/'} className="lg:w-[8rem] lg:h-[8rem] py-0 w-[10rem] h-[10rem] my-4 "><Logo/></Link>
              
              </div>
              

              {posts && posts.map((item,index) => {
                
                return(
                  <>
                  <div className={`scroll-slide-y-child  flex flex-col center scale-[85%] h-screen lg:scale-75 rounded-xl  `}>
                  <a href={`articles/${item.articleId}`}  key={index}  className="rounded-xl border border-current lg:flex p-0 m-0 hover:brightness-[0.5] active:brightness-[0.5] focus:brightness-[0.5]  ">
                   <div className="w-[60rem] flex aspect-[5/6] rounded-xl m-0 p-0 ">
                   
                   <Card key={index}  color={`${item.blogContent.color}`}  gradient={`${item.blogContent.gradient}`}>
                   {item.blogContent.components.map((item2,index2)=>{
                     const CardComponent = CardComponentMap[item2.name];
                     
                     return (<CardComponent key={index2} all={item2} Text={item2.contents} style={item2.style} zIndex={item2.zIndex} page={index} componentIndex={index2} />)
                   })}
                   </Card>
                   </div>
                 
                 <div className=' lg:w-[8rem] lg:h-full w-full h-[8rem] bg-gradient-to-tr from-primary1 to-primary2 flex center p-0 m-0'>
                 <svg xmlns="http://www.w3.org/2000/svg" width="80%" height="80%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
                 </div>  
                 
                </a> 
                {(index + 1)%3 == 1 && 
                <div  ref={observerTarget} className={` flex flex-col center scale-[80%] h-[1%]   `}>
                
                </div>
                }
               
{/* <div>
  <button className='text-2xl bg-white rounded-xl p-4 m-8 border-slate-700 border-2 '>baca selengkapnya</button>
</div> */}
                  </div>

                 

                  </>
                  
                  
                )
            })}
            
          
            
          <div ref={observerTarget} className='flex flex-col center h-[40%] '>
          <div className="w-[6rem] h-[6rem] ">
              <svg className="animate-spin duration-1000" xmlns="http://www.w3.org/2000/svg" width="80%" height="80%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>
            </div>
          </div>
            
          </div>

            
        </>
    );
};

export default page;