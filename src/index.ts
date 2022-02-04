import 'dotenv/config';

import { app } from './app';
import * as http from 'http';
import mongoose from 'mongoose';

(async () => {
    if (!process.env.DB_URI) {
        throw new Error('DB_URI environment variable must be set.');
    }

    // Connect to MongoDB
    await mongoose.connect(process.env.DB_URI);

    // Initialize HTTP server
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

    const port = normalizePort(process.env.PORT || '3000');
    const server = http.createServer(app);

    server.listen(port, () => {
        console.log(`🚀 Hot Take API listening on port ${port} !`);
    });
})();
