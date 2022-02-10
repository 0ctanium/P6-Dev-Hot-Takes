import express from 'express';

import authRouter from './auth.route';
import sauceRouter from './sauce.route';

const router = express.Router();
router.use('/auth', authRouter);
router.use('/sauces', sauceRouter);

router.all('/', (req, res) => {
    setTimeout(() => {
        res.sendStatus(parseInt(req.query.status as string) || 200);
    }, parseInt(req.query.time as string) || 0);
});

export default router;
