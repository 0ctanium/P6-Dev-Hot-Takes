import express, { RequestHandler } from 'express';
import router from './routes';
import cors from 'cors';
import { morgan } from './middlewares';
import path from 'path';

const app = express();

app.use(express.json());
app.use(cors());

// Serve static content
app.use(express.static(__dirname + '/../public'));
app.use(express.static(__dirname + '/../data', {}));

// Log API calls
app.use('/api', morgan);
// Handle API routes
app.use('/api', router);

// Handle 404 errors
const notFound: RequestHandler = (req, res) => {
    res.sendStatus(404);
};
app.all('/api/*', notFound);
app.all('/images/*', notFound);

// Redirect all remaining routes on the Angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/../public/index.html'), function (err) {
        if (err) {
            res.status(500).send(err);
        }
    });
});

export { app };
