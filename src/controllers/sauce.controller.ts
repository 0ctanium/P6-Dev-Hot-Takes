import { RequestHandler } from 'express';
import { ApplicationError, InternalError } from '@errors';
import { joiErrorToMessage } from '@helpers';
import { createSauce } from '@services';
import { SauceInput } from '@types';
import { sauceInputSchema } from '@validators';

export const addSauce: RequestHandler = (req, res, next) => {
    const { body, file, user } = req;

    if (!user) {
        return next(new ApplicationError('Authentication required', 401));
    }

    if (!file) {
        return next(new ApplicationError('Image file is required', 422));
    }

    if (!body.sauce) {
        return next(new ApplicationError('No sauce given', 422));
    }
    const sauce: SauceInput =
        typeof body.sauce === 'string' ? JSON.parse(body.sauce) : body.sauce;

    const { value, error } = sauceInputSchema.validate(sauce);
    if (error != null) {
        return next(new ApplicationError(joiErrorToMessage(error), 422));
    }

    if (!value) {
        return next(new ApplicationError('Value is empty', 400));
    }

    if (value.userId && user.sub !== value.userId) {
        return next(
            new ApplicationError('User id does not match the current user', 403)
        );
    }

    createSauce(value, file.path.replace(/^data\//g, ''), user.sub)
        .then(() => {
            return res.status(201).json({
                message: 'Sauce created successfully',
            });
        })
        .catch((err) => {
            return next(new InternalError(err));
        });
};
