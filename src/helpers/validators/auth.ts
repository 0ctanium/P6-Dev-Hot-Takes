import Joi from 'joi';
import { SignUpInput } from '../../types';

export const signUpInputSchema = Joi.object<SignUpInput>({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(30),
});
