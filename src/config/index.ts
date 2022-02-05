export const DB_URI = process.env.DB_URI as string;

if (!DB_URI) {
    throw new Error('No database connection uri defined');
}

export const TOKEN_SECRET = process.env.TOKEN_SECRET as string;

if (!TOKEN_SECRET) {
    throw new Error('No token secret defined');
}

export const TOKEN_EXPIRY = process.env.TOKEN_EXPIRY
    ? parseInt(process.env.TOKEN_EXPIRY)
    : 24 * 60 * 60; // 24 h default expiration time

function normalizePort(val: string) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

export const PORT = normalizePort(process.env.PORT || '3000');

export const TOKEN_ALGORITHM = 'HS256';
