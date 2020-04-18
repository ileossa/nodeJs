import App from './app'
import PostController from './services/posts/posts.controller'
import PingController from './services/ping/ping.controller'

const app = new App([new PostController(), new PingController()], 5000)
app.listen()