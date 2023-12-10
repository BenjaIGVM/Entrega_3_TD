import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import DogCard from '@/components/DogCard';
import { AiOutlineHeart, AiOutlineFrown } from "react-icons/ai";
import { useRouter } from 'next/router';
import { PerroCall, InteraccionCall } from '../../utils/calls';
import Modal from '@/components/Modal';

const fetchDog = async (id) => {
    if (!id) return;

    return PerroCall(`randomCandidato/?params=?id=${id}`, 'GET').then((res) => res)
}


function DogTinder() {
    const [userDog, setUserDog] = useState()
    const [candidateDog, setCandidateDog] = useState();
    const [acceptedDogs, setAcceptedDogs] = useState(undefined);
    const [rejectedDogs, setRejectedDogs] = useState(undefined);
    const [showDescription, setShowDescription] = useState(-1);
    const [waitForBack, setWaitForBack] = useState(true)
    const router = useRouter();
    const { id } = router.query;
    const [match, setMatch] = useState('')

    const { data, isLoading, isFetching, refetch } = useQuery(['dogs', { id }], () => fetchDog(id), { refetchOnWindowFocus: false });

    useEffect(() => {
        if (id) {
            InteraccionCall(`getAceptados/?params=?perro_interesado_id=${id}`, 'GET')
                .then((res) => { if (!res.error) { setAcceptedDogs(res.data); } })

            InteraccionCall(`getRechazados/?params=?perro_interesado_id=${id}`, 'GET')
                .then((res) => { if (!res.error) { setRejectedDogs(res.data); } })
            PerroCall(`getOne/?params=?id=${id}`, 'GET').then((res) => { if (!res.error) { setUserDog(res.data); } })
        }
    }, [id])

    useEffect(() => {
        if (acceptedDogs && rejectedDogs && !isFetching) {
            setWaitForBack(false)
        }
    }, [acceptedDogs, rejectedDogs])

    useEffect(() => {
        if (!isFetching && data) {
            if (data.error) {
                refetch();
                return;
            }

            if (!data.data) {
                setCandidateDog({ name: "No hay mas candidatos", url: "https://cdn-icons-png.flaticon.com/512/4253/4253264.png" })
            } else {
                setCandidateDog(data.data)
                if (acceptedDogs != undefined && rejectedDogs != undefined) {
                    setWaitForBack(false)
                }

            }
        }
    }, [isFetching])


    /*     const regret = (pDog)=>{
            if(pDog.type === 0){
                setAcceptedDogs((prev)=>prev.filter((dog)=> dog.id != pDog.id)) 
                setRejectedDogs((prev)=> [{...pDog, type : 1}, ...prev])
            }else{
                setRejectedDogs((prev)=>prev.filter((dog)=> dog.id != pDog.id))
                setAcceptedDogs((prev)=> [{...pDog, type : 0}, ...prev])
    
            }
        } */


    const handleAccept = () => {
        setWaitForBack(true)
        InteraccionCall(`create`, 'POST', { perro_interesado_id: id, perro_candidato_id: candidateDog.id, preferencia: 'aceptado' })
            .then((res) => {
                if (!res.error) {
                    if (res.match_message != '') {
                        setMatch(candidateDog.name)
                    }

                    setAcceptedDogs([{ ...candidateDog, type: 0 }, ...acceptedDogs]);
                }

                if (!isLoading) {
                    refetch()
                }
            })

    }

    const handleReject = () => {
        setWaitForBack(true)
        InteraccionCall(`create`, 'POST', { perro_interesado_id: id, perro_candidato_id: candidateDog.id, preferencia: 'rechazado' })
            .then((res) => {
                console.log(res)
                if (!res.error) {
                    setRejectedDogs([{ ...candidateDog, type: 1 }, ...rejectedDogs]);
                }
                if (!isLoading) {
                    refetch();;
                }

            })


    }


    return (

        <div className="grid lg:grid-cols-4 grid-cols-2 text-black gap-4 h-[98vh]">
            <div className="col-span-1  p-4 items-center h-min">
                <h2 className="text-xl font-semibold mb-[10px] self-center text-center text-blue-500">Usuario</h2>
                {userDog &&
                    <DogCard dog={userDog} isLoading={false} width={'full'} setShowDescription={setShowDescription} openID={showDescription} />}

            </div>

            <div className="col-span-1  p-4 items-center h-min">

                <h2 className="text-xl font-semibold mb-[10px] self-center text-center">Candidato</h2>
                {candidateDog &&
                    <DogCard dog={candidateDog} isLoading={isLoading || isFetching} width={"full"} setShowDescription={setShowDescription} openID={showDescription} >
                        <div className="flex justify-center pt-4 border-t-blue-500 border-t-[2px]">
                            <button onClick={handleAccept} disabled={isLoading || isFetching || waitForBack} className="bg-green-500 border-green-500 border-[3px] text-white hover:bg-white hover:text-green-500 px-4 py-2 rounded-full mb-[10px] mr-12" >
                                <AiOutlineHeart size={40} className=' self-center ' />
                            </button>
                            <button onClick={handleReject} disabled={isLoading || isFetching || waitForBack} className="bg-red-500 border-red-500 border-[3px] text-white hover:bg-white hover:text-red-500 px-4 py-2 rounded-full mb-[10px]" >
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
                    {acceptedDogs && acceptedDogs.map((dog, index) => (
                        <DogCard key={index} dog={dog} isLoading={false} width={"70%"} setShowDescription={setShowDescription} openID={showDescription} />
                    ))}
                </div>
            </div>

            <div className="col-span-1  p-4 items-center h-min">
                <h2 className="text-xl font-semibold self-center text-center shadow-lg border-dotted border-b-transparent w-[100%] rounded-t-lg p-[10px]  text-red-500">
                    Rechazados</h2>
                <div className="h-[90vh] max-h-[90vh] overflow-y-scroll mt-[10px] shadow-lg space-y-7">
                    {rejectedDogs && rejectedDogs.map((dog, index) => (
                        <DogCard key={index} dog={dog} isLoading={false} width={"70%"} setShowDescription={setShowDescription} openID={showDescription} />
                    ))}
                </div>
            </div>



            <Modal isOpen={match != ''}
                tittle={
                    <h1 className="text-xl font-bold text-white p-2 justify-center items-center text-center rounded-t-[10px] bg-primary">
                        ¡Felicidades! { }</h1>}

                Display={
                    <h2 className="text-md font-md mt-1 text-center">Has echo match con {match}</h2>}
                onClose={() => setMatch('')}
            />


        </div >
    );
}

export default DogTinder;
