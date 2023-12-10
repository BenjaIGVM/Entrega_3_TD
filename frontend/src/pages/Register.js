import React, { useState, useEffect } from 'react';
import { perroCall } from '../utils/calls';

/* 
TODO:
    -Pagina de registro con imagen aleatoria y llamada al backend createDog.
    -Lista de posibles perros registrados y poder elejir sus matches. 
    -Conectar la pagna de eleccion al backend en base al perro elegido
    -Opcional hacer login con cookies y chingadas
*/

const Register = () => {
    const [dogData, setDogData] = useState(null);
    const [dogName, setDogName] = useState('');
    const [dogDescription, setDogDescription] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    useEffect(() => {
        fetchDog();
    }, []);

    const fetchDog = async () => {
        try {
            const response = await fetch('https://dog.ceo/api/breeds/image/random');
            const data = await response.json();

            if (response.ok) {
                setDogData(data);
            } else {
                console.error('Error al obtener perro aleatorio:', data.message);
            }
        } catch (error) {
            console.error('Error en la llamada a la API de perros:', error);
        }
    };

    const handleFetchAnotherDog = () => {
        fetchDog();
    };

    const handleRegisterDog = async () => {
        try {
            if (!dogName || !dogDescription) {
                console.error('Nombre y descripción son obligatorios.');
                return;
            }

            console.log('imagen', dogData?.message);

            const imageUrl = dogData?.message;


            if (!imageUrl) {
                console.error('No se pudo obtener la URL de la imagen del perro.');
                return;
            }


            const registerResponse = await perroCall('create', 'POST', {
                name: dogName,
                url: imageUrl,
                description: dogDescription,
            });

            console.log('Respuesta del backend al registrar perro:', registerResponse);

            setSuccessMessage('Perro creado correctamente.');

            setDogName('');
            setDogDescription('');

            fetchDog();
        } catch (error) {
            console.error('Error al registrar perro:', error);
        }
    };

    return (
        <div className="col-span-1 p-4 items-center h-min">
            <h2 className="text-xl font-semibold mb-[10px] self-center text-center">Candidato</h2>
            {dogData && (
                <div className="flex flex-col items-center">
                    <img src={dogData.message} alt="Perro Aleatorio" className="mb-4" />
                    <button onClick={handleFetchAnotherDog} className="bg-blue-500 text-white px-4 py-2 rounded-full mb-2">
                        Cambiar Imagen
                    </button>
                    <div>
                        <label className="block mb-2 text-black">Nombre del Perro:</label>
                        <input
                            type="text"
                            value={dogName}
                            onChange={(e) => setDogName(e.target.value)}
                            className="border rounded px-2 py-1 mb-2"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-black">Descripción del Perro:</label>
                        <textarea
                            value={dogDescription}
                            onChange={(e) => setDogDescription(e.target.value)}
                            className="border rounded px-2 py-1"
                        />
                    </div>
                    <button onClick={handleRegisterDog} className="bg-green-500 text-white px-4 py-2 rounded-full mt-4">
                        Registrar Perro
                    </button>  {successMessage && <p className="text-green-500">{successMessage}</p>}
                </div>
            )}
        </div>
    );
};

export default Register;



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



//import React, { useState, useEffect } from 'react';
// import { perroCall } from '../utils/perroCalls';

// const Register = () => {
//     const [dogData, setDogData] = useState(null);
//     const [dogName, setDogName] = useState('');
//     const [dogDescription, setDogDescription] = useState('');
//     const [successMessage, setSuccessMessage] = useState('');
//     const [errors, setErrors] = useState({});

//     useEffect(() => {
//         fetchDog();
//     }, []);
//      const fetchDog = async () => {
//         try {
//             const response = await fetch('https://dog.ceo/api/breeds/image/random');
//             const data = await response.json();

//             if (response.ok) {
//                 setDogData(data);
//                 setErrors({});
//             } else {
//                 console.error('Error al obtener perro aleatorio:', data.message);
//             }
//         } catch (error) {
//             console.error('Error en la llamada a la API de perros:', error);
//         }
//     };
//     const handleFetchAnotherDog = () => {
//         fetchDog();
//     };

//     const handleRegisterDog = async () => {
//         try {
//             setErrors({});
//             if (!dogName || !dogDescription) {
//                 console.error('Nombre y descripción son obligatorios.');
//                 return;
//             }
//             console.log('imagen', dogData?.message);
//             const imageUrl = dogData?.message;
//             if (!imageUrl) {
//                 console.error('No se pudo obtener la URL de la imagen del perro.');
//                 return;
//             }
//             const registerResponse = await perroCall('create', 'POST', {
//                 name: dogName,
//                 url: imageUrl,
//                 description: dogDescription,
//             });
//             if (registerResponse.error) {
//                 console.error('Error al registrar perro:', registerResponse.error);
//                 setErrors(registerResponse.error);
//             } else {
//                 console.log('Perro creado correctamente.');
//                 setSuccessMessage('Perro creado correctamente.');
//                 setDogName('');
//                 setDogDescription('');
//                 fetchDog();
//             }
//         } catch (error) {
//             console.error('Error al registrar perro:', error);
//         }
//     };
//     return (
//         <div className="grid lg:grid-cols-3 grid-cols-1 text-black gap-4">
//             <div className="col-span-1 p-4 items-center h-min">
//                 <h2 className="text-xl font-semibold mb-4 self-center text-center">Candidato</h2>
//                 {dogData && (
//                     <div className="flex flex-col items-center">
//                         <img src={dogData.message} alt="Perro Aleatorio" className="mb-4 rounded-lg" />
//                         <button onClick={handleFetchAnotherDog} className="bg-blue-500 text-white px-4 py-2 rounded-full mb-2">
//                             Cambiar Imagen
//                         </button>
//                         <div>
//                             <label className="block mb-2 text-black">Nombre del Perro:</label>
//                             <input
//                                 type="text"
//                                 value={dogName}
//                                 onChange={(e) => setDogName(e.target.value)}
//                                 className="border rounded px-3 py-2 w-full mb-2"
//                             />
//                             {errors && errors.name && <p className="text-red-500">{errors.name}</p>}
//                         </div>
//                         <div>
//                             <label className="block mb-2 text-black">Descripción del Perro:</label>
//                             <textarea
//                                 value={dogDescription}
//                                 onChange={(e) => setDogDescription(e.target.value)}
//                                 className="border rounded px-3 py-2 w-full"
//                             />
//                             {errors && errors.description && <p className="text-red-500">{errors.description}</p>}
//                         </div>
//                         <button onClick={handleRegisterDog} className="bg-green-500 text-white px-4 py-2 rounded-full mt-4">
//                             Registrar Perro
//                         </button>
//                         {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Register;
