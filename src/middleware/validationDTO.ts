import {plainToClass} from 'class-transformer';
import {validate, ValidationError} from 'class-validator';
import * as express from 'express'
import HttpException from '../exceptions/HttpException'

/*
The class-validator package validates the object, and if it finds some errors,
the middleware calls the next function with the error details. Since we pass an error into
the next function, the Express error middleware that we described above takes care of it.
The errors variable keeps an array of errors, each of them having the constraints object
with the details. This simple example creates a string of all of the issues.

The 400 Bad Request status code means that there is something wrong with the request that the client sent.
    If you need to, you can also pass an array so that it can be easier to iterate over on the frontend
 */
export function validationDTO<T>(type: any, skipMissingProperties = false): express.RequestHandler {

    return (req, res, next) => {
        validate(plainToClass(type, req.body), {skipMissingProperties})
            .then((errors: ValidationError[]) => {
                if (errors.length > 0) {
                    const messages = errors
                        .map((error: ValidationError) => Object.values(error.constraints))
                        .join(', ')
                    next(new HttpException(400, messages))
                } else
                    next()
            })
    }
}