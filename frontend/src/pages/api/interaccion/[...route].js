

export default async function handler(req, res) {
    const { route, params } = req.query

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
        const response = await fetch('http://localhost:8000/api/interaccion/' + route.join('/') + (params ? params : ""), info)

        const data = await response.json();
        if(response.status == 200){
            res.status(response.status).json(data);

        }else{
            res.status(response.status).json({error:data});

        }

    } catch (error) {
        // Handle network errors or other issues
        res.status(500).json({ error });
    }

};