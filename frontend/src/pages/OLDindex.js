import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import DogCard from '@/components/DogCard';
import dogNames from "dog-names";
import { loremIpsum } from "react-lorem-ipsum";
import { AiOutlineHeart, AiOutlineFrown } from "react-icons/ai";

const fetchDog = async () => {
    return fetch('https://dog.ceo/api/breeds/image/random')
        .then((response) => response.json());
}

function DogTinder() {
    const [dog, setDog] = useState({ name: "Perro", imgSrc: "https://cdn-icons-png.flaticon.com/512/4253/4253264.png" });
    const [acceptedDogs, setAcceptedDogs] = useState([]);
    const [rejectedDogs, setRejectedDogs] = useState([]);
    const [showDescription, setShowDescription] = useState(-1);

    const { data, isLoading, isFetching, refetch } = useQuery('dogs', fetchDog, { refetchOnWindowFocus: false });

    useEffect(() => {
        if (!isFetching && data) {
            setDog({
                id: Date.now().toString(), imgSrc: data.message, name: dogNames.allRandom(),
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

/* import React from "react"
import {
    Button,
    Divider,
    Grid,
    LinearProgress,
    List,
    ListItem,
    ListItemText,
    Card,
    CardContent,
    Typography,
    CircularProgress,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import dogNames from "dog-names";
import { LoremIpsum } from "react-lorem-ipsum";

function TinderDog() {
    const [accepted, setAccepted] = useState([]);
    const [rejected, setRejected] = useState([]);
    const [currentDog, setCurrentDog] = useState({
        nombre: "",
        imagen: "",
        description: "",
    });;


    const [acceptedLoading, setAcceptedLoading] = useState(false);
    const [rejectedLoading, setRejectedLoading] = useState(false);

    useEffect(() => {
        fetchDog();
    }, []);

    const fetchDog = async () => {
        axios.get("https://dog.ceo/api/breeds/image/random").then((response) => {
            setCurrentDog({
                name: dogNames.allRandom(),
                imagen: response.data.message,
                description: (
                    <LoremIpsum
                        startWithLoremIpsum={false}
                        avgWordsPerSentence={3}
                        avgSentencesPerParagraph={2}
                    />
                ),
            });
        });
    };

    const acceptDog = async () => {
        if (currentDog) {
            setAcceptedLoading(true);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setAccepted([...accepted, currentDog]);
            fetchDog();
            setAcceptedLoading(false);
        }
    };

    const rejectDog = async () => {
        if (currentDog) {
            setRejectedLoading(true);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setRejected([...rejected, currentDog]);
            fetchDog();
            setRejectedLoading(false);
        }
    };

    const repent = async (dog) => {
        if (accepted.includes(dog)) {
            setAcceptedLoading(true);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setAccepted(accepted.filter((d) => d !== dog));
            setRejected([...rejected, dog]);
            setAcceptedLoading(false);
        } else if (rejected.includes(dog)) {
            setRejectedLoading(true);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setRejected(rejected.filter((d) => d !== dog));
            setAccepted([...accepted, dog]);
            setRejectedLoading(false);
        }
    };

    return (
        <Grid container spacing={2}>
            <Grid item md={4}>
                <Typography variant="h6" gutterBottom>
                    Candidatos
                </Typography>
                {currentDog && (
                    <Card>
                        <img src={currentDog.imagen} alt={currentDog.name} style={{ width: '100%', height: '200px' }} />
                        <CardContent>
                            <Typography variant="subtitle1">{currentDog.name}</Typography>
                            <Typography variant="body2">{currentDog.description}</Typography>
                        </CardContent>
                        <Button variant="contained" color="primary" onClick={acceptDog} disabled={acceptedLoading} >
                            Aceptar
                        </Button>
                        <Button variant="contained" color="secondary" onClick={rejectDog} disabled={rejectedLoading} >
                            Rechazar
                        </Button>
                    </Card>
                )}
            </Grid>
            <Grid item md={4}>
                <Typography variant="h6" gutterBottom>
                    Aceptados
                </Typography>
                {accepted.map((dog, index) => (
                    <Card key={index}>
                        <img src={dog.imagen} alt={dog.name} style={{ width: '100%', height: 'auto' }} />
                        <CardContent>
                            <Typography variant="subtitle1">{dog.name}</Typography>
                            <Typography variant="body2">{dog.description}</Typography>
                        </CardContent>
                        <Button variant="contained" color="secondary" onClick={() => repent(dog)} disabled={acceptedLoading} >
                            Arrepentirse
                        </Button>
                    </Card>
                ))}
            </Grid>
            <Grid item md={4}>
                <Typography variant="h6" gutterBottom>
                    Rechazados
                </Typography>
                {rejected.map((dog, index) => (
                    <Card key={index}>
                        <img src={dog.imagen} alt={dog.name} style={{ width: '100%', height: 'auto' }} />
                        <CardContent>
                            <Typography variant="subtitle1">{dog.name}</Typography>
                            <Typography variant="body2">{dog.description}</Typography>
                        </CardContent>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => repent(dog)}
                            disabled={rejectedLoading}
                        >
                            Arrepentirse
                        </Button>
                    </Card>
                ))}
            </Grid>
        </Grid>
    );
}

export default TinderDog;
 */