import { Router } from 'express';
import { createSauce, getAllSauces, getSauceById } from '@controllers';
import { requireAuth, sauceImage } from '@middlewares';

const router = Router();

router.get('/:sauceId', requireAuth, getSauceById);
router.get('/', requireAuth, getAllSauces);
router.post('/', requireAuth, sauceImage.single('image'), createSauce);

export default router;
