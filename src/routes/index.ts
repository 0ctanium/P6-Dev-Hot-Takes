import express from 'express';

const router = express.Router();

router.all('/', (req, res) => {
    setTimeout(() => {
        res.sendStatus(parseInt(req.query.status as string) || 200);
    }, parseInt(req.query.time as string) || 0);
});

export { router };
