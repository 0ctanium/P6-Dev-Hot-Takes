import path from 'path';
import cors from 'cors';
import express, { RequestHandler } from 'express';
import { ApplicationError } from '@errors';
import {
    clientErrorHandler,
    errorHandler,
    logErrors,
    morgan,
} from '@middlewares';
import router from '@routes';

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
const notFound: RequestHandler = (req, res, next) => {
    next(new ApplicationError('Page not found', 404));
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

// Handle errors
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

export { app };
