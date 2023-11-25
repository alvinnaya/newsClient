import Logo from "@/components/Logo/logo";
import CardView from "@/components/ui/CardComponentView/CardView";
import PreviewSlider from "@/components/ui/CardComponents.js/Preview/PreviewSlider";



const page = async({params}) => {
  const apiKey = process.env.API_KEY || 'localhost:3000';
const deffaultImage = process.env.DEFFAULT_IMG || '1696143107524.webp';
    const response = await fetch(`http://${apiKey}/api/article/getarticle/${params.storieId}`, {
    method: 'GET',
    
  });
  const article = await response.json();
  const card = article.content.BlogContent;
    return (
        <div className="w-[100vw] h-screen  flex flex-col overflow-hidden lg:center  ">
        <div className="w-full h-[20rem] lg:h-[8rem] center lg:justify-start flex lg:fixed lg:top-0 lg:p-8">
        <div className="lg:w-[8rem] lg:h-[8rem] w-[10rem] h-[10rem] my-4 "><Logo/></div>
        </div>
        <div className="flex center flex-col h-full lg:h-max  lg:scale-90">
          <PreviewSlider Id={params.articlesId} TotalIndexArticle={card.length} card={card} TotalIndex={parseInt(card.length)}>
         
          </PreviewSlider>
        </div>
       
      </div>
    );
};

export default page;