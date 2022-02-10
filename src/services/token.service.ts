import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { TOKEN_ALGORITHM, TOKEN_EXPIRY, TOKEN_SECRET } from '@config';
import { Token, UserType } from '@types';

export const generateToken = (user: UserType): Token => {
    const tokenId = uuidv4();

    const token = jwt.sign(
        {
            // Reserved claims
            iss: 'https://hot-takes.com/api',
            aud: 'https://hot-takes.com/api',
            sub: user._id,
            iat: Date.now(),
            jti: tokenId,

            // Custom claims
            email: user.email,
        },
        TOKEN_SECRET,
        {
            expiresIn: TOKEN_EXPIRY,
            algorithm: TOKEN_ALGORITHM,
        }
    );

    return {
        tokenId,
        token,
    };
};
