import App from './app'
import * as mongoose from 'mongoose'
import 'dotenv/config'
import PostController from './services/posts/posts.controller'
import PingController from './services/ping/ping.controller'


const {
    MONGO_USER,
    MONGO_PASSWORD,
    MONGO_PATH
} = process.env

mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`)

const app = new App([new PostController(), new PingController()], 5000)
app.listen()