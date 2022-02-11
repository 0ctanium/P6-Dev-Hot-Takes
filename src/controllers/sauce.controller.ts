import { RequestHandler } from 'express';
import { Types } from 'mongoose';
import {
    ApplicationError,
    InternalError,
    ResourceNotFoundError,
} from '@errors';
import { joiErrorToMessage } from '@helpers';
import * as sauceService from '@services/sauce.service';
import { SauceInput, SauceType } from '@types';
import { sauceInputSchema } from '@validators';

export const getAllSauces: RequestHandler = (req, res, next) => {
    const { user } = req;

    if (!user) {
        return next(new ApplicationError('Authentication required', 401));
    }
    sauceService
        .getAllSauces()
        .then((sauces) => {
            return res.status(200).json(sauces);
        })
        .catch((err: Error) => {
            return next(new InternalError(err));
        });
};

export const getSauceById: RequestHandler<{ sauceId: string }> = (
    req,
    res,
    next
) => {
    const { user } = req;
    const { sauceId } = req.params;

    if (!user) {
        return next(new ApplicationError('Authentication required', 401));
    }

    sauceService
        .getSauceById(sauceId)
        .then((sauces) => {
            return res.status(200).json(sauces);
        })
        .catch((err: Error) => {
            return next(new InternalError(err));
        });
};

export const likeSauceById: RequestHandler<{ sauceId: string }> = (
    req,
    res,
    next
) => {
    const { user, body } = req;
    const { sauceId } = req.params;

    if (!user) {
        return next(new ApplicationError('Authentication required', 401));
    }

    let logic: Promise<any>;
    switch (body.like) {
        // Like
        case 1:
            logic = sauceService.likeSauceById(sauceId, user.sub);
            break;
        // Remove like/dislike
        case 0:
            logic = sauceService.removeLikeSauceById(sauceId, user.sub);
            break;
        // Dislike
        case -1:
            logic = sauceService.dislikeSauceById(sauceId, user.sub);
            break;

        // Throw error
        default:
            return next(
                new ApplicationError(
                    'Like is required and must be between -1 and 1',
                    400
                )
            );
    }

    logic
        .then((sauces: SauceType) => {
            return res.status(200).json(sauces);
        })
        .catch((err: Error) => {
            return next(new InternalError(err));
        });
};

export const createSauce: RequestHandler = (req, res, next) => {
    const { body, file, user } = req;

    if (!user) {
        return next(new ApplicationError('Authentication required', 401));
    }

    if (!file) {
        return next(new ApplicationError('Image file is required', 422));
    }

    const sauce: SauceInput =
        body.sauce && typeof body.sauce === 'string'
            ? JSON.parse(body.sauce)
            : body;

    if (!sauce) {
        return next(new ApplicationError('No sauce given', 422));
    }

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
    sauceService
        .createSauce(value, file.path.replace(/^data\//g, ''), user.sub)
        .then(() => {
            return res.status(201).json({
                message: 'Sauce created successfully',
            });
        })
        .catch((err: Error) => {
            return next(new InternalError(err));
        });
};

export const deleteSauceById: RequestHandler<{ sauceId: string }> = (
    req,
    res,
    next
) => {
    const { user } = req;
    const { sauceId } = req.params;

    if (!user) {
        return next(new ApplicationError('Authentication required', 401));
    }

    return sauceService.getSauceById(sauceId).then(async (sauce) => {
        if (!sauce || !sauce._id) {
            return next(new ResourceNotFoundError('Sauce'));
        }

        const userId: string =
            sauce.userId instanceof Types.ObjectId
                ? sauce.userId?.toString()
                : sauce.userId?.id.toString();

        if (user.sub !== userId) {
            return next(
                new ApplicationError('Current user does not own the sauce', 403)
            );
        }

        return sauceService
            .deleteSauce(sauce._id.toString())
            .then(() => {
                return res.status(201).json({
                    message: 'Sauce deleted successfully',
                });
            })
            .catch((err) => {
                return next(new InternalError(err));
            });
    });
};

export const editSauceById: RequestHandler = (req, res, next) => {
    const { body, file, user } = req;
    const { sauceId } = req.params;

    if (!user) {
        return next(new ApplicationError('Authentication required', 401));
    }

    const sauce: SauceInput =
        body.sauce && typeof body.sauce === 'string'
            ? JSON.parse(body.sauce)
            : body;

    if (!sauce) {
        return next(new ApplicationError('No sauce given', 422));
    }

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

    return sauceService.getSauceById(sauceId).then(async (sauce) => {
        if (!sauce) {
            return next(new ResourceNotFoundError('Sauce'));
        }

        const userId: string =
            sauce.userId instanceof Types.ObjectId
                ? sauce.userId?.toString()
                : sauce.userId?.id.toString();

        if (user.sub !== userId) {
            return next(
                new ApplicationError('Current user does not own the sauce', 403)
            );
        }

        return sauceService
            .editSauce(
                sauceId,
                value,
                user.sub,
                file ? file.path.replace(/^data\//g, '') : undefined
            )
            .then(() => {
                return res.status(201).json({
                    message: 'Sauce created successfully',
                });
            })
            .catch((err: Error) => {
                return next(new InternalError(err));
            });
    });
};
