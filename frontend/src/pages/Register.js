import React, { useState, useEffect } from 'react';
import { PerroCall } from '@/utils/calls';
import RandomCard from '@/components/RandomCard';


const Register = () => {
    const [dogData, setDogData] = useState(null);
    const [dogName, setDogName] = useState('');
    const [dogDescription, setDogDescription] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        fetchDog();
    }, []);
    const isValidImageUrl = (url) => {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = url;
        });
    }; 
    const fetchDog = async () => {
        try {
            const response = await fetch('https://dog.ceo/api/breeds/image/random');
            const data = await response.json(); 
            if (response.ok && (await isValidImageUrl(data.message))) {
                setDogData(data);
                setErrors({});
            } else {
                console.error('Error al obtener perro aleatorio o imagen no válida');
                setTimeout(() => {
                    fetchDog();
                }, 1000);
            }
        } catch (error) {
            console.error('Error en la llamada a la API de perros:', error);
            setTimeout(() => {
                fetchDog();
            }, 1000);
        }
    };
    const handleFetchAnotherDog = () => {
        fetchDog();
    };

    const handleRegisterDog = async () => {
        try {
            setErrors({});
            if (!dogName || !/^[A-Za-z\s]+$/.test(dogName)) {
                setErrors({ name: 'El nombre es obligatorio y debe ser un string alfabético.' });
                return;
            }
            if (!dogDescription || !/^[A-Za-z\s.,]+$/.test(dogDescription)) {
                setErrors({
                    description: 'La descripción es obligatoria y no debe contener números ni caracteres especiales.',
                });
                return;
            }

            const imageUrl = dogData?.message;
            if (!imageUrl) {
                setErrors({ imageUrl: 'No se pudo obtener la URL de la imagen del perro.' });
                return;
            }

            const registerResponse = await PerroCall('create', 'POST', {
                name: dogName,
                url: imageUrl,
                description: dogDescription,
            });

            if (registerResponse.error) {
                setErrors({ registerError: `Error al registrar perro: ${registerResponse.error}` });
            } else {
                setSuccessMessage('Perro creado correctamente.');
                setDogName('');
                setDogDescription('');
                fetchDog();
                setTimeout(() => {
                    setSuccessMessage('');
                }, 3000);
            }
        } catch (error) {
            console.error('Error al registrar perro:', error);
            setErrors({ registerError: `Error al registrar perro: ${error.message}` });
        }
    };

    return (
        <div className="text-black gap-4 h-screen flex items-center justify-center">
            <div className="col-span-1 p-4 items-center max-w-md w-full">
                <h2 className="text-xl font-semibold mb-4 self-center text-center">Registre su perro</h2>
                {dogData && (
                    <div className="flex flex-col items-center">
                        <RandomCard imageUrl={dogData.message} className="mb-4 w-full max-w-md" />
                        <button onClick={handleFetchAnotherDog} className="bg-blue-500 text-white px-4 py-2 rounded-full mb-2">
                            Cambiar Imagen
                        </button>
                        <div className="mb-2 w-full max-w-md">
                            <label className="block mb-2 text-black">Nombre:</label>
                            <input
                                type="text"
                                value={dogName}
                                onChange={(e) => setDogName(e.target.value)}
                                className="border rounded px-3 py-2 w-full"
                            />
                            {errors && errors.name && <p className="text-red-500">{errors.name}</p>}
                        </div>
                        <div className="mb-2 w-full max-w-md">
                            <label className="block mb-2 text-black">Descripción:</label>
                            <textarea
                                value={dogDescription}
                                onChange={(e) => setDogDescription(e.target.value)}
                                className="border rounded px-3 py-2 w-full"
                            />
                            {errors && errors.description && <p className="text-red-500">{errors.description}</p>}
                        </div>
                        <button onClick={handleRegisterDog} className="bg-green-500 text-white px-4 py-2 rounded-full mt-4">
                            Registrar Perro
                        </button>
                        {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Register;
