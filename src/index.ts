import 'dotenv/config';

import * as http from 'http';
import mongoose from 'mongoose';
import { app } from '@app';
import { DB_URI, PORT } from '@config';

(async () => {
    // Connect to MongoDB
    await mongoose.connect(DB_URI);

    // Initialize HTTP server
    const server = http.createServer(app);

    server.listen(PORT, () => {
        console.log(`🚀 Hot Take API listening on port ${PORT} !`);
    });
})();
