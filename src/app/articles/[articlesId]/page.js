
import CardView from "@/components/ui/CardComponentView/CardView";
import Slider from "@/components/ui/CardComponentView/Slider";
import Logo from "@/components/Logo/logo";
import Link from "next/link";


  export async function generateMetadata({ params, searchParams }, parent) {
    // read route params
    const apiKey = process.env.API_KEY || 'localhost:3000';
   console.log(apiKey)
    // fetch data
    const response = await fetch(`https://${apiKey}/api/article/getArticlePublishHeader/${params.articlesId}`, {
        method: 'GET',
        
      });
    const article = await response.json();
   
    return {
      'monetag': "bb42474b5d86370c5d7e6d6b4a540ee2",
      'google-adsense-account':"ca-pub-2421830929324855",
      title: `${article.title}`,
      description: `${article.descrip}`,
      openGraph: {
        images: [`${article.url_image.replace("http://103.127.132.64:3000", "http://api.figustack.com")? article.url_image.replace("http://103.127.132.64:3000", "http://api.figustack.com"): article.url_image.replace }`],
        title: `${article.title}`,
        description: `${article.descrip}`
      },
    }
  }
  

const page = async({params}) => {
  const apiKey = process.env.API_KEY || 'localhost:3000';
   
  const response = await fetch(`https://${apiKey}/api/article/getArticlePublish/${params.articlesId}`, {
    method: 'GET',
    
  });
  const response2 = await fetch(`https://${apiKey}/api/ads/getRecomendation/${params.articlesId}`, {
    method: 'GET',
    
  });
  console.log(apiKey)
    const article = await response.json();
    const card = article.content.BlogContent;
    const ads = await response2.json();  
    

    return (
      <>

        <div className="w-[100vw] h-screen   flex flex-col overflow-hidden lg:center  ">
          <div className="w-full h-[20rem] lg:h-[8rem] center lg:justify-start flex lg:fixed lg:top-0 lg:p-8">
          
          <Link href={'/'} className="lg:w-[8rem] lg:h-[8rem] w-[10rem] h-[10rem] my-4 "><Logo/></Link>
          
          </div>
          <div className="flex center flex-col h-full lg:h-max  lg:scale-90">
            <Slider Id={params.articlesId} TotalIndexArticle={card.length} card={card} ads={ads} response2={response2} TotalIndex={ads==0 ? parseInt((card.length)+1) :parseInt((card.length)+((card.length)/2)+1)}>
           
            </Slider>
          </div>
         
        </div>
        </>
        
       
       
    );
};

export default page;