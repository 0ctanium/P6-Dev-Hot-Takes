import { hash } from 'bcrypt';

export const capitalize = (s: string) =>
    s.replace(/^\w/, (c) => c.toUpperCase());

export const toCapitalCase = (s: string) =>
    s.replace(/\w\S*/g, (w) => capitalize(w));

export const hashPassword = async (password: string, saltRounds = 10) => {
    return hash(password, saltRounds);
};
