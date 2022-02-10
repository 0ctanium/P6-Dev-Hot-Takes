import { Router } from 'express';
import { addSauce } from '@controllers';
import { requireAuth, sauceImage } from '@middlewares';

const router = Router();

router.post('/', requireAuth, sauceImage.single('image'), addSauce);

export default router;
