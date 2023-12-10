import React, { useState, useEffect } from 'react';
import { PerroCall } from '../utils/calls';
import DogCard from '@/components/DogCard';
import { useRouter } from 'next/router';

const DogsList = () => {
    const [allDogs, setAllDogs] = useState(undefined)
    const [showDescription, setShowDescription] = useState(-1);
    const router = useRouter();

    useEffect(()=>{

        PerroCall('getAll', 'GET').then((res)=> {console.log(res); setAllDogs(res.data);})
        
    }, []);


    return(

        <div className="w-[99vw] overflow-x-hidden p-4 relative items-center h-min">
            <h2 className="text-xl font-semibold self-center text-center shadow-lg border-dotted border-b-transparent w-[100%] rounded-t-lg p-[10px] text-green-500">
                Lista de Perros</h2>
            <div className="grid lg:grid-cols-3 grid-cols-1 row-auto gap-8 max-h-[90vh] h-[90vh] overflow-y-scroll overflow-x-hidden mt-[20px] pb-[100px] pt-[50px] shadow-lg">
                {allDogs && allDogs.map((dog, index) => (
                    <div key={index} className='h-max hover:scale-105 cursor-pointer mx-[50px]' onClick={()=> router.push(`/DogSelection/${dog.id}`)}>
                        <DogCard  dog={dog} isLoading={false} width={"full"} setShowDescription={setShowDescription} openID={-1} />
                    </div>
                ))}
            </div>
        </div>
    )
}



export default DogsList