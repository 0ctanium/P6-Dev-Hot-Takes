import { RequestHandler } from 'express';
import { SauceInput } from '../types';
import { sauceInputSchema } from '../helpers/validators/sauce';
import { joiErrorToMessage } from '../helpers/formatter';

export const addSauce: RequestHandler = (req, res) => {
    const { body, file, user } = req;

    if (!user) {
        res.status(401).json({
            message: 'Authentication required',
        });
        return;
    }

    if (!body.sauce) {
        res.status(400).json({
            message: 'No sauce given',
        });
        return;
    }
    const sauce: SauceInput =
        typeof body.sauce === 'string' ? JSON.parse(body.sauce) : body.sauce;

    const { value, error } = sauceInputSchema.validate(sauce);
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

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (value.userId && user['sub'] !== value.userId) {
        res.status(403).json({
            message: 'User id does not match the current user',
        });
        return;
    }

    console.log({ body, file, user });
};
