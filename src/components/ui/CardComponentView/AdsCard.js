"use client"
import { useEffect, useState } from "react";
import Card from "../Card";
import BaseText from "../Ads/viewComponents/BaseText";
import BaseImage from "../Ads/viewComponents/BaseImage";
import HeadingText from "../Ads/viewComponents/HeadingText";
import ArticleRecomendation from "./ArticleRecomendation";
import Script from "next/script";
import Banner from "@/components/Adstera";
import Ads from "../Ads/viewComponents/Ads";
const AdsCard = ({ads,num}) => {
    const[adsList,setAdsList] = useState([])
   
    const CardComponentMap = {
        Text: BaseText,
        ImageContainer: BaseImage,
        HeadingText : HeadingText,
        SubHeading : BaseText,
        ArticleRecomendationContainer: ArticleRecomendation,
        Ads : Ads,
        none: '',
       
        // Tambahkan pemetaan lain di sini
      };
    useEffect(() => {

        async function fetchData() {
          try {
            console.log('ads1');
            const indeksAcak = Math.floor(Math.random() * ads.length);
            // Mengakses elemen pada indeks acak
            const adsindeks = ads[indeksAcak].ads_id;
            console.log('selected ads', adsindeks);
            const response = await fetch(`https://api.figustack.com/api/ads/getads/${adsindeks}`, {
              method: 'GET',
              
            });
            const adsData = await response.json();
            setAdsList(adsData.content)
            console.log("adsData",adsData.content)
          
          } catch (error) {
            console.error('Terjadi kesalahan', error);
            // Tambahkan logika apa yang harus dilakukan jika terjadi kesalahan
          }
          
        }
        fetchData();
        
      },[]);
 
    return (
        <>
         <Card >
              {adsList.components && adsList.components.map((item2,index2)=>{
                const CardComponent = CardComponentMap[item2.name];
                console.log(item2)
                return (<CardComponent key={index2} all={item2} Text={item2.contents} style={item2.style} zIndex={item2.zIndex}  componentIndex={index2} />)
              })}
        </Card>

{/* <script async="async" data-cfasync="false" src="//pl22586862.profitablegatecpm.com/f597ba5ef69052375faf2c5006cca898/invoke.js"></script>
<div id="container-f597ba5ef69052375faf2c5006cca898"></div> */}
    </>
    );
};

export default AdsCard;