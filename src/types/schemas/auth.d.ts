import { ObjectId } from 'mongoose';

export interface Token {
    // Token id stored into the cache
    tokenId: string;
    // Token
    token: string;
    // // Refresh token
    // refreshToken: string;
}

export interface SignUpInput {
    // Email address of the user
    email: string;
    // Plain password of the user
    password: string;
}

export interface LoginInput {
    // Email address of the user
    email: string;
    // Plain password of the user
    password: string;
}

export interface LoginOutput extends Token {
    // User object _id
    userId: ObjectId;
}
