import Joi from 'joi';
import { SauceInput } from '../../types';

export const sauceInputSchema = Joi.object<SauceInput>({
    name: Joi.string().required(),
    manufacturer: Joi.string().required(),
    description: Joi.string().required(),
    mainPepper: Joi.string().required(),
    heat: Joi.number().min(0).max(10).required(),
    userId: Joi.string(),
});
