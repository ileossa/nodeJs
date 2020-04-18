import * as express from 'express';
import * as bodyParser from 'body-parser'

const app = express()
const router = express.Router()

function loggerMiddleware(request: express.Request, response: express.Response, next) {
    console.log(`${request.method} ${request.path}`)
    // Permet de continuer le déroulelent
    next()
}

/* Definition router function */
router.get('/ping', (req, res) => {
    res.send("pong");
})
router.get('/', ((req, res) => {
    res.send({
        hostname: req.hostname,
        path: req.path,
        method: req.method,
    })
}))
router.post('/response', (req, res) => {
    res.send(req.body)
})

/* Middleware function */
app.use(loggerMiddleware);
// Permet de parser la requête en entrée au format JSON, de pouvoir l'utiliser sous formme "object"
app.use(bodyParser.json())

/* router path defintion */
app.use('/api', router)



app.listen(5000)