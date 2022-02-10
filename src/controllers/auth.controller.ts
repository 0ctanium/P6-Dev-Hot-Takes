import { compare } from 'bcrypt';
import { RequestHandler } from 'express';
import {
    ApplicationError,
    InternalError,
    ResourceNotFoundError,
} from '@errors';
import { joiErrorToMessage } from '@helpers';
import { generateToken, createUser, getUserByEmail } from '@services';
import { ApiResponse, LoginInput, LoginOutput, SignUpInput } from '@types';
import { loginInputSchema, signUpInputSchema } from '@validators';

export const signUp: RequestHandler<unknown, ApiResponse, SignUpInput> = (
    req,
    res,
    next
) => {
    const { value, error } = signUpInputSchema.validate(req.body);
    if (error != null) {
        return next(new ApplicationError(joiErrorToMessage(error), 422));
    }

    if (!value) {
        return next(new ApplicationError('Value is empty', 400));
    }

    createUser({
        email: value.email,
        password: value.password,
    })
        .then(() => {
            return res.status(201).json({
                message: 'User created successfully',
            });
        })
        .catch((err) => {
            if (err.code === 11000) {
                // Handle duplicates
                return next(new ApplicationError('User already exists', 409));
            }

            return next(new InternalError(err));
        });
};

export const login: RequestHandler<
    unknown,
    ApiResponse<LoginOutput>,
    LoginInput
> = async (req, res, next) => {
    const { value, error } = loginInputSchema.validate(req.body);
    if (error != null) {
        return next(new ApplicationError(joiErrorToMessage(error), 422));
    }

    if (!value) {
        return next(new ApplicationError('Value is empty', 400));
    }

    const user = await getUserByEmail(value.email);

    if (!user || !user._id) {
        return next(new ResourceNotFoundError('User'));
    }

    const passwordValid = await compare(value.password, user.password);
    if (!passwordValid) {
        return next(new ApplicationError('Bad credentials', 403));
    }

    const { token, tokenId } = generateToken(user);

    return res.status(201).json({
        message: 'Successfully authenticated',
        userId: user._id,
        token,
        tokenId,
    });
};
