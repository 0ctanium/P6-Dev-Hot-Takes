import { hashPassword } from 'helpers/string';
import { User } from 'models';
import { UserInput } from 'types';

export const getUserById = async (id: string) => {
    return User.findOne({ _id: id });
};

export const getUserByEmail = async (email: string) => {
    return User.findOne({ email });
};

export const createUser = async (input: UserInput) => {
    const hash = await hashPassword(input.password);

    const user = new User({
        email: input.email,
        password: hash,
    });

    return await user.save();
};
