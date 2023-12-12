import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

function DogTinder() {
    const router = useRouter();


    return (

        <div className="flex items-center justify-center my-auto h-screen mx-auto w-screen text-black gap-4">
            <button onClick={()=> router.push(`/Register`)} className="bg-green-500 text-white text-[40px] hover:bg-green-950 px-10 py-6 rounded-full mt-4">
                Registrar
            </button>
            
            <button onClick={()=> router.push(`/DogsList`)} className="bg-green-500 text-white text-[40px] hover:bg-green-950 px-10 py-6 rounded-full mt-4">
                Seleccionar Perro
            </button>

        </div >
    );
}

export default DogTinder;