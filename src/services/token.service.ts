import { Token, UserType } from '../types';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';

const TOKEN_SECRET = process.env.TOKEN_SECRET;
const TOKEN_EXPIRY = process.env.TOKEN_EXPIRY
    ? parseInt(process.env.TOKEN_EXPIRY)
    : 24 * 60 * 60; // 24h default expiration time

if (!TOKEN_SECRET) {
    throw new Error('No token secret defined');
}

export const generateToken = (user: UserType): Token => {
    const tokenId = uuidv4();

    const token = jwt.sign(
        {
            // Reserved claims
            iss: 'api.hot-takes',
            sub: user._id,
            iat: Date.now(),
            jti: tokenId,

            // Custom claims
            email: user.email,
        },
        TOKEN_SECRET,
        {
            expiresIn: TOKEN_EXPIRY,
        }
    );

    return {
        tokenId,
        token,
    };
};
