import express from 'express';
import router from './routes';
import cors from 'cors';
import { morgan } from './middlewares';
import path from 'path';

const app = express();

app.use(express.json());
app.use(cors());

app.use(express.static(__dirname + '/../public'));

app.use('/api', morgan);
app.use('/api', router);

// Handle 404 errors on API
app.all('/api/*', (req, res) => {
    res.sendStatus(404);
});

// Redirect all routes other than the API on the Angular app
app.get(/\/((?!api).)*/, (req, res) => {
    res.sendFile(path.join(__dirname, '/../public/index.html'), function (err) {
        if (err) {
            res.status(500).send(err);
        }
    });
});

export { app };
