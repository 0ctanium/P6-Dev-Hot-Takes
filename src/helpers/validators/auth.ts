import Joi from 'joi';
import { LoginInput, SignUpInput } from 'types';

export const signUpInputSchema = Joi.object<SignUpInput>({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(30).required(),
});

export const loginInputSchema = Joi.object<LoginInput>({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});
