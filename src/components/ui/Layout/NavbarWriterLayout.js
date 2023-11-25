import {useState,useEffect} from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useRouter,usePathname } from 'next/navigation';


const NavbarWriterLayout = ({children, setShowLoading,reload,setReload}) => {
    const stroke = '#000000';
    const router = useRouter();
    const pathname = usePathname()
    const [profile,setProfile] = useState('')
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setShowLoading(true)
        Cookies.remove("jwt-token")
        console.log('cookie remove')
        router.push('/auth/writer')
      };



      useEffect(()=>{
        async function fetchData() {
          console.log('get profile')
          try {
            console.log('jalan');
            const data = Cookies.get("jwt-token")
            const res = await fetch(`http://localhost:3000/api/writer/profile/`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'jwt-token': data,
              },
              
            });
            const profile = await res.json();
            console.log('get profile 2')
            console.log(profile.profile)
            setProfile(profile.profile)
      
            
          } catch (error) {
            console.log('Terjadi kesalahan', error);
            // Tambahkan logika apa yang harus dilakukan jika terjadi kesalahan
          }
        }
        fetchData();
      },[])
  
  

    return (
        <div className='w-screen h-screen p-0 flex lg:flex-row flex-col overflow-hidden bg-neutralPrimary2'>
     <div className='flex h-32 lg:h-full p-4'>
     <div className="flex w-full h-32 lg:h-full lg:ml-4 lg:w-32 lg:flex-col justify-between border-e bg-neutralPrimary1 border-current border rounded-full p-4 gap-4">
          <div onClick={()=>{ pathname != "/writer/profile" ? setShowLoading(true) : console.log(true)  }}>
          <Link href={`/writer/profile`} className="flex flex-col center p-4">
            <div >
            <img className="w-16 h-16 rounded-full object-cover border-2 border-current" src={`${profile.profile_image}`||"https://inasianspaces.files.wordpress.com/2020/10/lelouch-ep-25-final.png?w=1200"} alt="Rounded avatar"/>
            </div>
          </Link>
          </div>
         

          {/* menu section */}

          <div className="flex lg:flex-col p-4 gap-4 lg:gap-2">
            {/* menu */}
            <div  onClick={()=>{pathname != "/writer" ? setShowLoading(true) : console.log(pathname) }} className="flex flex-col center ">
                <Link href={"/writer"} className={`${pathname == "/writer"? "bg-gradient-to-r from-primary1 to-primary2 ":""} w-16 h-16 flex center p-2 flex-col hover:bg-gradient-to-r from-primary1 to-primary2 rounded-full `}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5px" strokeLinecap="round" strokeLinejoin="round"><path d="M20 9v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9"/><path d="M9 22V12h6v10M2 10.6L12 2l10 8.6"/></svg>
                </Link>
            </div>

            <div  onClick={()=>{ pathname != "/writer/draft" ? setShowLoading(true) : console.log(true)  }} className="flex flex-col center">
                <Link href={"/writer/draft"} className={`w-16 h-16 ${pathname == "/writer/draft"? "bg-gradient-to-r from-primary1 to-primary2":""} flex p-2 center flex-col hover:bg-gradient-to-r from-primary1 to-primary2 rounded-full  `}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5px" strokeLinecap="round" strokeLinejoin="round"><path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path><polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon></svg>
                </Link>
            </div>
          </div>

          {/* menu logout */}
          <div className="flex flex-col center">
              <button onClick={handleSubmit} className="w-16 h-16 flex p-2 center flex-col  hover:bg-gradient-to-r from-primary1 to-primary2 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 3H6a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h4M16 17l5-5-5-5M19.8 12H9"/></svg>
              </button>
          </div>
        </div>
     </div>
    
            <div className='lg:w-full flex flex-col p-0  h-full mt-4 lg:m-0 overflow-y-auto '>
                
                {children}
            </div>
        </div>
    );
};

export default NavbarWriterLayout;