'use client';
import NavbarAdminLayout from "@/components/ui/Layout/NavbarAdminLayout";
import { useEffect,useState } from "react";
import Cookies from 'js-cookie';
import ModalButton from "@/components/ui/ModalButton";
import Alert from "@/components/ui/Alert";
import ReuseModalButton from "@/components/ui/ReuseModal";
import Loading from "@/components/ui/Loading";




const Home = () => {

const [showModal, setShowModal] = useState(false);
const [gagal, setGagal] = useState(false);
const [pesanGagal, setPesanGagal] = useState('');
const [allProfile,setAllProfile] = useState([]);
const [nama,setNama] = useState(null)
const [username,setUsername] = useState(null)
const [password,setPassword] = useState(null)
const [reload,setReload] = useState(true)
const [showLoading, setShowLoadig] = useState(true);
const apiKey = process.env.API_KEY || 'localhost:3000';

useEffect(()=>{
  async function fetchData() {
    setShowLoadig(true)
    console.log('get profile')
    try {
      console.log('jalan');
      const data = Cookies.get("admin-token")
      const res = await fetch(`https://${apiKey}/api/writer/get-allprofile/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'admin-token': data,
        },
        
      });
      const profile = await res.json();
      console.log('get profile 2')
      console.log(profile.profile)
      setAllProfile(profile.profile)
      setShowLoadig(false)

      
    } catch (error) {
      console.log('Terjadi kesalahan', error);
      // Tambahkan logika apa yang harus dilakukan jika terjadi kesalahan
    }
  }
  fetchData();
},[reload])

  
const handleRegister = async()=>{
  const data = Cookies.get("admin-token")
  console.log(nama,username,password)
  if(nama == null || username == null || password == null){
    return;
  }
  setShowLoadig(true)
  try{
    const res = await fetch(`https://${apiKey}/api/writer/register/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'admin-token': data,
      }, 
      body: JSON.stringify({
        "nama":nama,
        "username": username,
        "password": password
    }),
      
    });
    const feedback = await res.json();
    console.log(feedback);
    setShowModal(false);
    setShowLoadig(false)
    setReload(!reload)
  }catch(error){
    console.log(error)
  }
  
}

 


    return (
      <>
      <NavbarAdminLayout setShowLoading={setShowLoadig} setReload={setReload} reload={reload} >
      <Loading showLoading={showLoading}/>  
        <div className="w-full center flex flex-col gap-8">
        <div className="flex center my-16">
          <h1 className="text-4xl font-bold">Daftar Penulis Kamu</h1>
        </div>

        <div className="overflow-x-auto w-[80%]">
  <table className="min-w-full rounded-xl divide-y-2 divide-neutralSecondary1 bg-neutralPrimary1 text-sm">
    <thead className="ltr:text-left rtl:text-right">
      <tr className="text-xl">
        <th className="whitespace-nowrap border-2 border-neutralSecondary2 px-8 py-4 font-medium text-neutralSecondary1">
          id
        </th>
        <th className="whitespace-nowrap border-2 border-neutralSecondary2 px-8 py-4 font-medium text-neutralSecondary1">
          nama
        </th>
        <th className="whitespace-nowrap border-2 border-neutralSecondary2 px-8 py-4 font-medium text-neutralSecondary1">
          username
        </th>
        <th className="whitespace-nowrap border-2 border-neutralSecondary2 px-8 py-4 font-medium text-neutralSecondary1">
          Salary
        </th>
      </tr>
    </thead>

    <tbody className="divide-y divide-gray-200 ">
      {allProfile != null ? allProfile.map((item)=>{
return(
<tr className="odd:bg-gray-50 text-lg">
        <td className="whitespace-nowrap border-x-2 border-neutralSecondary2 px-8 py-4 font-medium text-neutralSecondary2">
          {item.id}
        </td>
        <td className="whitespace-nowrap border-x-2 border-neutralSecondary2 px-8 py-4 text-neutralSecondary2">
          {item.nama}
        </td>
        <td className="whitespace-nowrap border-x-2 border-neutralSecondary2 px-8 py-4 text-neutralSecondary2">
          {item.username}
        </td>
        <td className="whitespace-nowrap border-x-2 border-neutralSecondary2 px-8 py-4 text-neutralSecondary2">$120,000</td>
      </tr>
)
      }): ''}

      

     
    </tbody>
  </table>
</div>

          <div className="flex center my-16">
            <button onClick={()=>setShowModal(true)} className="w-[3.5rem] bg-neutralSecondary1 text-neutralPrimary2 p-4 rounded-full flex center">
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            </button>
          </div>
        </div>
        {gagal? <Alert fungsi={()=>setGagal(false)}>{pesanGagal}</Alert>:''}
      </NavbarAdminLayout>
      <ReuseModalButton showModal={showModal}>
      <div className="w-[40rem] flex flex-col gap-8 center p-4 ">

      <div className=" w-[50%] flex center">
 <h1 className="text-4xl font-bold">Register</h1>
      </div>
<div className=" w-[70%]">
  <input
    type="email"
    placeholder="username"
    className="mt-8 w-full px-6 py-4 bg-neutralPrimary2 rounded-xl text-2xl border border-current outline-none"
    onChange={(e)=>setUsername(e.target.value)}
    value={username}
  />
</div>
<div className=" w-[70%]">
  <input
    type="email"
    placeholder="nama"
    className="mt-8 w-full  px-6 py-4 bg-neutralPrimary2 rounded-xl text-2xl border border-current outline-none"
    onChange={(e)=>setNama(e.target.value)}
    value={nama}
  />
</div>
<div className=" w-[70%]">
  <input
    type="password"
    placeholder="password"
    className="mt-8 w-full px-6 py-4 bg-neutralPrimary2 rounded-xl text-2xl border border-current outline-none"
    onChange={(e)=>setPassword(e.target.value)}
    value={password}
  />
</div>




      <div ClassName="flex items-center justify-end p-4 rounded-b mt-12">




                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    cancel
                  </button>
                  <button
                    className="bg-gradient-to-r from-primary1 to-primary2  text-neutralSecondary1  font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleRegister}
                    
                  >
                    confirm
                  </button>
                </div>
</div>
      </ReuseModalButton>
      </>
        
    );
};



export default Home;
