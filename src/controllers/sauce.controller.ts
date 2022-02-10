import { RequestHandler } from 'express';

export const addSauce: RequestHandler = (req, res) => {
    const body = req.body;
    const file = req.file;

    console.log({ body, file });
};
