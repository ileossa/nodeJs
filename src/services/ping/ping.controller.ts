import * as express from 'express'

class pingController {
    public path = '/ping'
    public router = express.Router()

    constructor() {
        this.initializaRoutes()
    }

    public initializaRoutes() {
        this.router.get(this.path, (req: express.Request, res: express.Response) => {
            res.send('pong'.concat(Date.now().toString()))
        })
    }
}

export default pingController