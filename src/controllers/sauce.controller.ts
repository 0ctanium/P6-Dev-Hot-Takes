import { RequestHandler } from 'express';
import { ApplicationError } from 'errors';
import { joiErrorToMessage } from 'helpers/formatter';
import { sauceInputSchema } from 'helpers/validators/sauce';
import { SauceInput } from 'types';

export const addSauce: RequestHandler = (req, res, next) => {
    const { body, file, user } = req;

    if (!user) {
        return next(new ApplicationError('Authentication required', 401));
    }

    if (!body.sauce) {
        return next(new ApplicationError('No sauce given', 400));
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

    console.log({ body, file, user });
};
