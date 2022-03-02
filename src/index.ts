import 'dotenv/config';

import { mkdir } from 'fs/promises';
import * as http from 'http';
import mongoose from 'mongoose';
import { app } from '@app';
import { DATA_DIR, DB_URI, PORT } from '@config';

(async () => {
    // Create data dir if needed
    await mkdir(DATA_DIR, { recursive: true });

    // Connect to MongoDB
    await mongoose.connect(DB_URI);

    // Initialize HTTP server
    const server = http.createServer(app);

    server.listen(PORT, () => {
        console.log(`🚀 Hot Take API listening on port ${PORT} !`);
    });
})();
