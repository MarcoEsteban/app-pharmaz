'use client';

import { useForm } from "react-hook-form";
import { FaKey, FaUserTie } from "react-icons/fa";
import { login } from "@/actions";
import { messageSweetAlert } from "@/utils";
import { useRouter } from 'next/navigation';


type FormInputs = {
  email: string;
  password: string;
};

export const FormLogin = () => {
  
  const route = useRouter();
  
  // ================
  // React Hook Form:
  // ================
  const { register, handleSubmit } = useForm<FormInputs>();

  const onSubmit = async ( data: FormInputs ) => {
    
    const formData = new FormData;
    const { ...userToSave } = data;

    formData.append( 'email', userToSave.email );
    formData.append( 'password', userToSave.password );

    // ===============
    // Server-Actions:
    // ===============
    const user = await login( formData );

    const ok = user?.ok ? true : false;

    messageSweetAlert( ok, user?.message );
    
    route.replace('/')
  }

  return (
      <form onSubmit={ handleSubmit( onSubmit ) } className="w-full">
        <div className="w-full p-1 justify-start flex flex-col">
          {/*===================== Email =====================*/}
          <div className="flex flex-row">
            <label htmlFor="email" className="z-highest rounded-l-lg w-10 h-10 flex justify-center items-center text-2xl text-gray-400 border border-r-0">
              <FaUserTie />
            </label>
            <input 
              id="email" 
              className="border border-gray-200 rounded-r-lg outline-none focus:ring-1 ring-blue-400 w-full pl-1" 
              placeholder="username" 
              required={false} 
              { ...register( 'email' )}
            />
          </div>

          {/*=================== Password ====================*/}
          <div className="my-4 flex flex-row">
            <label htmlFor="password" className="z-highest rounded-l-lg w-10 h-10 flex justify-center items-center text-2xl text-gray-400 border border-r-0">
              <FaKey size={18} />
            </label>
            <input 
              id="password" 
              type="password" 
              className="h-10 border border-gray-200 rounded-r-lg outline-none focus:ring-1 ring-blue-300 w-full pl-1" 
              placeholder="password" 
              required={false} 
              { ...register( 'password' )}
            />
          </div>
        
          <button className="px-4 py-2 rounded bg-blue-400 text-white hover:bg-blue-600 my-4 w-full">Ingresar</button>
        
        </div>
      </form>
  );
}