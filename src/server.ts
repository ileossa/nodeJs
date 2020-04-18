import * as express from 'express';
import * as bodyParser from 'body-parser'

function loggerMiddleware(request: express.Request, response: express.Response, next) {
    console.log(`${request.method} ${request.path}`)
    // Permet de continuer le déroulelent
    next()
}

const app = express()

app.use(loggerMiddleware);
// Permet de parser la requête en entrée au format JSON, de pouvoir l'utiliser sous formme "object"
app.use(bodyParser.json())

app.get('/hello', (request, response) => {
    response.send('Hello world!')
});

app.post('/name', ((req, res) => {
    res.send(req.body)
}));

app.listen(5000)