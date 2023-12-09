import React, { useState } from 'react';
import { useEffect } from 'react';

import { AiFillEye, AiFillEyeInvisible, AiOutlineHeart, AiOutlineFrown } from "react-icons/ai";

const DogCard = ({ dog, isLoading, width, openID, setShowDescription, regret, children }) => {

    const [Loading, setIsLoading] = useState(isLoading)
/* 
    useEffect(() => {
        setIsLoading(true);
    }, [dog.url])
 */

    useEffect(() => {
        if (isLoading) {
            setIsLoading(true);
        }
    }, [isLoading])

    const toggleDescription = () => {

        setShowDescription(dog.id == openID ? -1 : dog.id);
    };

    return (
        <div className=" mx-auto rounded-lg  overflow-hidden bg-white text-black shadow-lg" style={{ width: width }}>
            <div className="relative">
                <div style={{ paddingBottom: '100%', overflow: 'hidden' }} className="rounded-lg" >
                    {Loading && <LoadingDiv />}
                    <img src={dog.url} alt={dog.name} onError={() => setIsLoading(false)} className="absolute h-full w-full object-cover"
                        onLoad={() => setIsLoading(false)} style={{ display: (Loading || isLoading) ? 'none' : 'block' }} />

                </div>
            </div>
            <div className="mt-2  flex flex-col">
                <h3 className="text-lg mx-[10px] font-bold ">{dog.name}</h3>
                <h4 className="text-md mx-[10px] font-thin transition-transform duration-300 ease-in-out" >
                    {openID == dog.id && dog.description}
                </h4>


                {(openID == dog.id &&
                    <button onClick={toggleDescription}
                        className="w-[100%] bg-blue-500 text-white p-[10px] font-bold hover:bg-white hover:text-blue-500 border-t-[2px] 
                        border-t-blue-500 mt-2 text-center justify-center items-center flex" >
                        <AiFillEyeInvisible size={40} className=' self-center ' />
                    </button>)
                    ||
                    <button onClick={toggleDescription}
                        className="w-[100%] hover:bg-blue-500 hover:text-white p-[10px] font-bold bg-white text-blue-500 border-t-[2px]
                         border-t-blue-500 mt-2 text-center justify-center items-center flex" >

                        <AiFillEye size={40} className=' self-center ' />
                    </button>
                }


                {regret &&
                    <button onClick={() => regret(dog)}
                        className="w-[100%] bg-slate-600 text-white p-[10px] font-bold hover:bg-white hover:text-slate-600 border-t-[2px] 
                        border-t-slate-600 text-center justify-center items-center flex" >
                        {(dog.type == 1 && <AiOutlineHeart size={40} className=' self-center ' />)
                            || <AiOutlineFrown size={40} className=' self-center ' />}

                    </button>
                }
            </div>
            {children}
        </div>
    );
};


const LoadingDiv = () => {
    return (
        <div className="absolute h-full w-full object-cover flex flex-col items-center justify-center bg-blue-200 bg-opacity-40">
            <div className='animate-bounce mx-auto flex flex-col items-center  justify-center mt-[20px]'>
                <svg aria-hidden="true" className="w-20 h-20 mr-2 mt-[10px] text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <h1 className=" font-extrabold text-[2vw] mt-[5px]">CARGANDO...</h1>
            </div>
        </div>)
}

export default DogCard;