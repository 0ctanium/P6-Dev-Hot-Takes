import { RequestHandler } from 'express';
import { ApiResponse, LoginInput, LoginOutput, SignUpInput } from '../types';
import {
    loginInputSchema,
    signUpInputSchema,
} from '../helpers/validators/auth';
import { createUser, getUserByEmail } from '../services/user.service';
import { joiErrorToMessage } from '../helpers/formatter';
import { compare } from 'bcrypt';
import { generateToken } from '../services/token.service';

export const signUp: RequestHandler<unknown, ApiResponse, SignUpInput> = (
    req,
    res
) => {
    const { value, error } = signUpInputSchema.validate(req.body);
    const valid = error == null;
    if (!valid) {
        console.log(error);
        res.status(422).json({
            message: joiErrorToMessage(error),
        });
        return;
    }

    if (!value) {
        res.status(400).json({
            message: 'Value is empty',
        });
        return;
    }

    createUser({
        email: value.email,
        password: value.password,
    })
        .then(() => {
            res.status(201).json({
                message: 'User created successfully',
            });
            return;
        })
        .catch((err) => {
            if (err.code === 11000) {
                // Handle duplicates
                res.status(409).json({
                    message: 'User already exists',
                });
            } else {
                if (err instanceof Error) {
                    // Unknown error
                    console.error(err);
                    res.status(500).json({
                        message: err.message,
                    });
                } else {
                    // Unknown error
                    console.error(err);
                    res.status(500).json({
                        message: 'Unknown error',
                    });
                }
            }
            return;
        });
};

export const login: RequestHandler<
    unknown,
    ApiResponse<LoginOutput>,
    LoginInput
> = async (req, res) => {
    const { value, error } = loginInputSchema.validate(req.body);
    const valid = error == null;
    if (!valid) {
        console.log(error);
        res.status(422).json({
            message: joiErrorToMessage(error),
        });
        return;
    }

    if (!value) {
        res.status(400).json({
            message: 'Value is empty',
        });
        return;
    }

    const user = await getUserByEmail(value.email);

    if (!user || !user._id) {
        res.status(404).json({
            message: 'User not found',
        });
        return;
    }

    const passwordValid = await compare(value.password, user.password);
    if (!passwordValid) {
        res.status(403).json({
            message: 'Bad credentials',
        });
        return;
    }

    const { token, tokenId } = generateToken(user);

    res.status(201).json({
        message: 'Successfully authenticated',
        userId: user._id,
        token,
        tokenId,
    });
};
