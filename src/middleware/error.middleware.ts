import {NextFunction, Request, Response} from 'express'
import HttpException from "../exceptions/HttpException";

function errorMiddleware(error: HttpException, req: Request, res: Response, next: NextFunction) {
    const code = error.status || 500;
    const message = error.message || 'Global error'
    res.status(code)
        .send({code, message})
}

export default errorMiddlewar