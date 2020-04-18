import 'dotenv/config'

import App from './app'
import ValidateEnv from './utils/validate.env'
import PostController from './services/posts/posts.controller'
import PingController from './services/ping/ping.controller'



const env = new ValidateEnv().validateEnv()
const app = new App([new PostController(), new PingController()])
app.listen()