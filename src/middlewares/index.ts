import * as crypto from 'crypto';
import jwt from 'express-jwt';
import mime from 'mime';
import multer from 'multer';
import { TOKEN_ALGORITHM, TOKEN_SECRET } from 'config';

export * from './error';
export * from './morgan';

export const requireAuth = jwt({
    secret: TOKEN_SECRET,
    algorithms: [TOKEN_ALGORITHM],
});

function getFilename(cb: (err?: Error | null, raw?: string) => void) {
    crypto.randomBytes(16, function (err, raw) {
        cb(err, err ? undefined : raw.toString('hex'));
    });
}

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'data/images/');
    },
    filename(req, file, cb) {
        getFilename((err, filename) => {
            cb(null, `${filename}.${mime.extension(file.mimetype)}`);
        });
    },
});

export const sauceImage = multer({ storage });
