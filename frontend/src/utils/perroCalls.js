export const perroCall = async (route, method, extraBody) =>{
    try {
        let info
        if (method != 'GET') {
            const headers = { 'Content-Type': 'application/json' }
            info = {
                method: method,
                headers,
                body: JSON.stringify({headers, extraBody})
            }
        } else {
            info = {
                method: method
            }
        }

        const response = await fetch('/api/perro/' + route, info);

        const data = await response.json();

        return data
    } catch (error) {
        console.error('Error durante Registro:', error);
        return error
    }
}