import { RequestHandler } from 'express';
import { ApiResponse, SignUpInput } from '../types';
import { signUpInputSchema } from '../helpers/validators/auth';
import { ApiCode } from '../constants/api_codes';
import { createUser } from '../services/user.service';
import { joiErrorToMessage } from '../helpers/formatter';

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
            code: ApiCode.BAD_REQUEST,
        });
        return;
    }

    if (!value) {
        res.status(400).json({
            message: 'Value is empty',
            code: ApiCode.BAD_REQUEST,
        });
        return;
    }

    createUser({
        email: value.email,
        password: value.password,
    })
        .then((user) => {
            res.status(201).json({
                message: 'User created successfully',
                code: ApiCode.USER_CREATED,
                data: user._id,
            });
            return;
        })
        .catch((err) => {
            if (err.code === 11000) {
                // Handle duplicates
                res.status(500).json({
                    message: 'User already exists',
                    code: ApiCode.USER_ALREADY_CREATED,
                });
            } else {
                if (err instanceof Error) {
                    // Unknown error
                    console.error(err);
                    res.status(500).json({
                        message: err.message,
                        code: ApiCode.INTERNAL_ERROR,
                    });
                } else {
                    // Unknown error
                    console.error(err);
                    res.status(500).json({
                        message: 'Unknown error',
                        code: ApiCode.UNKNOWN_ERROR,
                    });
                }
            }
            return;
        });
};
