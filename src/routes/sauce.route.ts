import express from 'express';
import { addSauce } from '../controllers/sauce.controller';
import { requireAuth, sauceImage } from '../middlewares';

const router = express.Router();

router.post('/', requireAuth, sauceImage.single('image'), addSauce);

export default router;
