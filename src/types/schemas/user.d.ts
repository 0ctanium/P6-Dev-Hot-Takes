import { BaseDocument } from '@types';

export interface UserType extends BaseDocument {
    // The unique email address of the user
    email: string;
    // The salted and hashed representation of the user's password
    password: string;
}

export interface UserInput {
    // The unique email address of the user
    email: string;
    // The salted and hashed representation of the user's password
    password: string;
}
