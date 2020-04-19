import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as mongoose from 'mongoose'
import Controller from './interfaces/controller.interface'
import errorMiddleware from './middleware/error.middleware'
import {NextFunction} from "express";


export default class App {
    app: express.Application

    constructor(controllers: Controller[]) {
        this.app = express()
        this.connectToMongoDB()
        this.initializeMiddlewares()
        this.initializeControllers(controllers)
    }

    private initializeMiddlewares() {
        this.app.use(bodyParser.json())
        this.app.use(this.loggerMiddleware)
        this.app.use(errorMiddleware)
    }

    private initializeControllers(controller: Controller[]){
        controller.forEach((controller) => {
            this.app.use('/',  controller.router)
        })
    }

    private loggerMiddleware(request: express.Request, response: express.Response, next: NextFunction) {
        console.log(`${request.method} ${request.path}`);
        next();
    }

    private connectToMongoDB(){
        const {
            MONGO_USER,
            MONGO_PASSWORD,
            MONGO_PATH
        } = process.env
        var pathConnection = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`
        console.log(pathConnection)
        mongoose.connect(pathConnection, {useNewUrlParser: true, useUnifiedTopology: true});
    }

    public listen(){
        this.app.listen(process.env.PORT, () => {
            console.log(`App listening on the port http://localhost:${process.env.PORT}`)
        })
    }
}