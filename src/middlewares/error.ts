import { NextFunction, Request, Response } from 'express';
import { ApplicationError } from '@errors';

export function logErrors(
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (err instanceof Error) {
        console.error('errors', err.stack);
    }
    next(err);
}

export function clientErrorHandler(
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (req.xhr) {
        res.status(500).json({ message: 'Something went wrong!' });
    } else {
        next(err);
    }
}

export function errorHandler(
    err: unknown,
    req: Request,
    res: Response,
    _next: NextFunction
) {
    if (err instanceof Error) {
        let status: number;
        if (err instanceof ApplicationError) {
            status = err.status;
        } else {
            status = 500;
        }

        res.status(status).json({ message: err.message });
    } else {
        res.status(500).json({ message: 'Something went wrong!' });
    }
}
