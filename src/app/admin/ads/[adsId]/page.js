'use client';
import { AppStateContext,AppStateProvider } from '@/components/AppStateContext';
import AdsEditorPage from '@/components/ui/Ads/AdsEditorPage';


const page = ({params}) => {
       
  
    return (
        <>
            <AppStateProvider>
                <AdsEditorPage Id={params.adsId}/>
            </AppStateProvider>
            
        </>
    );
};

export default page;