import 'dotenv/config';

import { DB_URI, PORT } from './config';
import { app } from './app';
import * as http from 'http';
import mongoose from 'mongoose';

(async () => {
    // Connect to MongoDB
    await mongoose.connect(DB_URI);

    // Initialize HTTP server
    const server = http.createServer(app);

    server.listen(PORT, () => {
        console.log(`🚀 Hot Take API listening on port ${PORT} !`);
    });
})();
