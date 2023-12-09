

export default async function handler(req, res) {
    const { route } = req.query
    try {
        
        const response = await fetch('http://localhost:8000/api/interaccion/' + route.join('/'), {
            method: req.method,
            headers: {
                ...req.body.headers
            },
            body : JSON.stringify(req.body.data)
        })

        const data = await response.json();
        res.status(response.status).json(data);

    } catch (error) {
        console.log(error)
        // Handle network errors or other issues
        // Handle network errors or other issues
        res.status(500).json({ error });
    }

};