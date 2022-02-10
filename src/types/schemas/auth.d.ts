import { ObjectId } from 'mongoose';

export interface Claims {
    // Authorization server
    iss: string;
    // Authorized api
    aud: string;
    // Creation date
    iat: number;
    // Expiration date
    exp: number;
    // Token id
    jti: string;

    // User id
    sub: string;
    // User email
    email: string;
}

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
