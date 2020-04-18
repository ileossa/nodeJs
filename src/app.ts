import * as express from 'express'
import * as bodyParser from 'body-parser'

class App {
    app: express.Application
    port: number

    constructor(controller, port) {
        this.app = express()
        this.port = port
        this.initializeMiddlewares()
        this.initializeControllers(controller)
    }

    private initializeMiddlewares() {
        this.app.use(bodyParser.json())
        this.app.use(this.loggerMiddleware)
    }

    private initializeControllers(controller){
        controller.forEach((controller) => {
            this.app.use('/',  controller.router)
        })
    }

    private loggerMiddleware(request: express.Request, response: express.Response, next) {
        console.log(`${request.method} ${request.path}`);
        next();
    }

    public listen(){
        this.app.listen(this.port, () => {
            console.log(`App listening on the port http://localhost:${this.port}`)
        })
    }
}

export default App