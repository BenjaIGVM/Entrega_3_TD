import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import DogCard from '@/components/DogCard';
import dogNames from "dog-names";
import { loremIpsum } from "react-lorem-ipsum";
import { AiOutlineHeart, AiOutlineFrown } from "react-icons/ai";
import { useRouter } from 'next/router';
import { perroCall } from '../../utils/perroCalls';

const fetchDog = async (id) => {
    return perroCall(`randomCandidato/?id=${id}`, 'GET').then((res)=>res)
}

function DogTinder(req, res) {
    const [dog, setDog] = useState({ name: "Perro", imgSrc: "https://cdn-icons-png.flaticon.com/512/4253/4253264.png" });
    const [acceptedDogs, setAcceptedDogs] = useState([]);
    const [rejectedDogs, setRejectedDogs] = useState([]);
    const [showDescription, setShowDescription] = useState(-1);
    const router = useRouter();
    const { id } = router.query;

    const { data, isLoading, isFetching, refetch } = useQuery(['dogs', { id }], () => fetchDog(id), { refetchOnWindowFocus: false });



    useEffect(() => {
        if (!isFetching && data) {
            setDog({
                id: Date.now().toString(), url: data.message, name: dogNames.allRandom(),
                description: loremIpsum({ startWithLoremIpsum: false, avgWordsPerSentence: 3, avgSentencesPerParagraph: 5, random: true })
            })
        }
    }, [isFetching])


    const regret = (pDog)=>{
        if(pDog.type === 0){
            setAcceptedDogs((prev)=>prev.filter((dog)=> dog.id != pDog.id)) 
            setRejectedDogs((prev)=> [{...pDog, type : 1}, ...prev])
        }else{
            setRejectedDogs((prev)=>prev.filter((dog)=> dog.id != pDog.id))
            setAcceptedDogs((prev)=> [{...pDog, type : 0}, ...prev])

        }
    }


    const handleAccept = ()=> {
        setAcceptedDogs([{...dog, type : 0}, ...acceptedDogs]);
        if (!isLoading) {
            refetch();;
        }
    }

    const handleReject = ()=> {
        setRejectedDogs([{...dog, type : 1}, ...rejectedDogs]);

        if (!isLoading) {
            refetch();;
        }
    }


    return (

        <div className="grid lg:grid-cols-3 grid-cols-1 text-black gap-4">

            <div className="col-span-1  p-4 items-center h-min">

                <h2 className="text-xl font-semibold mb-[10px] self-center text-center">Candidato</h2>
                {dog &&
                    <DogCard dog={dog} isLoading={isLoading || isFetching} width={"90%"} setShowDescription={setShowDescription} openID={showDescription} >
                        <div className="flex justify-center pt-4 border-t-blue-500 border-t-[2px]">
                            <button onClick={handleAccept} disabled={isLoading || isFetching} className="bg-green-500 border-green-500 border-[3px] text-white hover:bg-white hover:text-green-500 px-4 py-2 rounded-full mb-[10px] mr-12" >
                                <AiOutlineHeart size={40} className=' self-center ' />
                            </button>
                            <button onClick={handleReject} disabled={isLoading || isFetching} className="bg-red-500 border-red-500 border-[3px] text-white hover:bg-white hover:text-red-500 px-4 py-2 rounded-full mb-[10px]" >
                                <AiOutlineFrown size={40} className=' self-center ' />
                            </button>
                        </div>
                    </DogCard>


                }

            </div >


            <div className="col-span-1 p-4 relative items-center h-min">
                <h2 className="text-xl font-semibold self-center text-center shadow-lg border-dotted border-b-transparent w-[100%] rounded-t-lg p-[10px] text-green-500">
                    Aceptados</h2>
                <div className=" max-h-[90vh] h-[90vh] overflow-y-scroll mt-[10px] shadow-lg space-y-7">
                    {acceptedDogs.map((dog, index) => (
                        <DogCard key={index} dog={dog} isLoading={false} width={"70%"} setShowDescription={setShowDescription} openID={showDescription} regret={regret}/>
                    ))}
                </div>
            </div>

            <div className="col-span-1  p-4 items-center h-min">
                <h2 className="text-xl font-semibold self-center text-center shadow-lg border-dotted border-b-transparent w-[100%] rounded-t-lg p-[10px]  text-red-500">
                    Rechazados</h2>
                <div className="h-[90vh] max-h-[90vh] overflow-y-scroll mt-[10px] shadow-lg space-y-7">
                    {rejectedDogs.map((dog, index) => (
                        <DogCard key={index} dog={dog} isLoading={false} width={"70%"} setShowDescription={setShowDescription} openID={showDescription} regret={regret}/>
                    ))}
                </div>
            </div>



        </div >
    );
}

export default DogTinder;
