import { TOKEN_ALGORITHM, TOKEN_SECRET } from '../config';

export * from './morgan';
import jwt from 'express-jwt';

export const requireAuth = jwt({
    secret: TOKEN_SECRET,
    algorithms: [TOKEN_ALGORITHM],
});
