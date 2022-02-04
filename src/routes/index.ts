import express from 'express';

const router = express.Router();

router.all('/', (req, res) => {
    res.sendStatus(parseInt(req.query.status as string) || 200);
});

export { router };
