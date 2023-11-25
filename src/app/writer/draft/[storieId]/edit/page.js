'use client';
import Sidebar from '@/components/ui/Sidebar';
import { AppStateContext,AppStateProvider } from '@/components/AppStateContext';


const page = ({params}) => {
       
  
    return (
        <>
            <AppStateProvider>
                <Sidebar Id={params.storieId}/>
            </AppStateProvider>
            
        </>
    );
};

export default page;