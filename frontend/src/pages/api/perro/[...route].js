

export default async function handler(req, res) {
    const { route } = req.query

    try {
        let info
        if (req.method != 'GET') {
            info = {
                method: req.method,
                headers: {
                    ...req.body.headers
                },
                body: JSON.stringify(req.body.extraBody)
            }
        } else {
            info = {
                method: req.method,
                headers: {
                    ...req.body.headers
                }
            }
        }
        const response = await fetch('http://localhost:8000/api/perro/' + route.join('/'), info)

        const data = await response.json();
        res.status(response.status).json(data);

    } catch (error) {
        // Handle network errors or other issues
        res.status(500).json({ error });
    }

};