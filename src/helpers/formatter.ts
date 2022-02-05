import Joi from 'joi';
import { toCapitalCase } from './string';

export const joiErrorToMessage = (error: Joi.ValidationError): string => {
    return error.details
        .map((d) => `${toCapitalCase(d.path.join(' '))}: ${d.message}`)
        .join('\n');
};
