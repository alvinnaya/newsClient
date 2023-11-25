'use client';

import { useRouter } from 'next/navigation';
import {useState} from 'react';
import Cookies from 'js-cookie';


const registerWriter = () => {
    const [formData, setFormData] = useState({
      "username": "anp123",
      "password": "Rielia13",
      "pwconfirm": "",
    });

    const router = useRouter();

    const handleUser = (e)=>{
      const form = formData
      form.username = e.target.value
      setFormData(form);
      console.log(formData)
    }

    const handlePassword = (e)=>{
      const form = formData
      form.password = e.target.value
      setFormData(form);
      console.log(formData)
    }

    const handlePwconfirm = (e)=>{
        const form = formData
        form.pwconfirm = e.target.value
        setFormData(form);
        console.log(formData)
      }

    const handleSubmit = async (e) => {
      e.preventDefault();
      
      try {
        const response = await fetch('http://localhost:3000/api/admin/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        
        const data = await response.json();
        // Handle the data as needed
        console.log(data)
        if(data.token){
          console.log(data.token);
          console.log('token disimpan');
          Cookies.set("admin-token", JSON.stringify(data))
          router.push('/writer')
        }else{
          Cookies.remove("admin-token")
          console.log('token dihapus')
        }
    
        
        
      } catch (error) {
        // Handle errors
        Cookies.remove("admin-token")
        console.error(error);
      }
    };



    return (
        <div className='flex flex-col center'>

            {/*
  Heads up! 👋

  Plugins:
    - @tailwindcss/forms
*/}

<div className="mx-auto max-w-screen-xl px-8 py-32 sm:px-12 lg:px-16">
  <div className="mx-auto max-w-lg">
    <h1 className="text-center text-4xl font-bold text-indigo-600 sm:text-6xl">
      Buat Penulis
    </h1>

    {/* <p className="mx-auto mt-8 max-w-md text-center text-gray-500">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati sunt
      dolores deleniti inventore quaerat mollitia?
    </p> */}

    <form
      action=""
      className="mb-0 mt-12 space-y-8 rounded-lg p-8 shadow-lg sm:p-12 lg:p-16"
    >
      <p className="text-center text-lg font-medium">Sign in to your account</p>

      <div>
        <label htmlFor="username" className="sr-only">username</label>

        <div className="relative">
          <input
            type="username"
            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            placeholder="Enter username"
            onChange={handleUser}
          />

          <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              />
            </svg>
          </span>
        </div>
      </div>

      <div>
        <label htmlFor="password" className="sr-only">Password</label>

        <div className="relative">
          <input
            type="password"
            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            placeholder="Enter password"
            onChange={handlePassword}
          />

          <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </span>
        </div>
      </div>

      <div>
        <label htmlFor="password confirm" className="sr-only">Password confirm</label>

        <div className="relative">
          <input
            type="password"
            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            placeholder="Enter password"
            onChange={handlePwconfirm}
          />

          <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </span>
        </div>
      </div>

      <button
        type="submit"
        className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
        onClick={handleSubmit}
      >
        Sign in
      </button>

      <p className="text-center text-sm text-gray-500">
        No account?
        <a className="underline" href="">Sign up</a>
      </p>
    </form>
  </div>
</div>
           
            
        </div>
    );
};

export default registerWriter;