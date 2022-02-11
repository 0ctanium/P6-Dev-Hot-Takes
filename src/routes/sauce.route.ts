import { Router } from 'express';
import {
    createSauce,
    deleteSauceById,
    getAllSauces,
    getSauceById,
    likeSauceById,
    editSauceById,
} from '@controllers';
import { requireAuth, sauceImage } from '@middlewares';

const router = Router();

router.post('/:sauceId/like', requireAuth, likeSauceById);
router.get('/:sauceId', requireAuth, getSauceById);
router.delete('/:sauceId', requireAuth, deleteSauceById);
router.put('/:sauceId', requireAuth, sauceImage.single('image'), editSauceById);
router.get('/', requireAuth, getAllSauces);
router.post('/', requireAuth, sauceImage.single('image'), createSauce);

export default router;
