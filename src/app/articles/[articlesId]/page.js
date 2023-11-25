
import CardView from "@/components/ui/CardComponentView/CardView";
import Slider from "@/components/ui/CardComponentView/Slider";
import Logo from "@/components/Logo/logo";


  export async function generateMetadata({ params, searchParams }, parent) {
    // read route params
    const apiKey = process.env.API_KEY || 'localhost:3000';
   
    // fetch data
    const response = await fetch(`http://${apiKey}/api/article/getArticlePublishHeader/${params.articlesId}`, {
        method: 'GET',
        
      });
    const article = await response.json();
   
    return {
      title: `${article.title}`,
      openGraph: {
        images: [`${article.url_image}`],
        title: `${article.title}`,
        description: `${article.descrip}`
      },
    }
  }
  

const page = async({params}) => {
  const apiKey = process.env.API_KEY || 'localhost:3000';
   
  const response = await fetch(`http://${apiKey}/api/article/getArticlePublish/${params.articlesId}`, {
    method: 'GET',
    
  });
  const response2 = await fetch(`http://${apiKey}/api/ads/getRecomendation/${params.articlesId}`, {
    method: 'GET',
    
  });

    const article = await response.json();
    const card = article.content.BlogContent;
    const ads = await response2.json();  
    

    return (
        <div className="w-[100vw] h-screen   flex flex-col overflow-hidden lg:center  ">
          <div className="w-full h-[20rem] lg:h-[8rem] center lg:justify-start flex lg:fixed lg:top-0 lg:p-8">
          
          <div className="lg:w-[8rem] lg:h-[8rem] w-[10rem] h-[10rem] my-4 "><Logo/></div>
          
          </div>
          <div className="flex center flex-col h-full lg:h-max  lg:scale-90">
            <Slider Id={params.articlesId} TotalIndexArticle={card.length} card={card} ads={ads} response2={response2} TotalIndex={parseInt((card.length)+((card.length)/2)+1)}>
           
            </Slider>
          </div>
         
        </div>
        
       
       
    );
};

export default page;