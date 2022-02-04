import express from 'express';
import { router } from './routes';
import cors from 'cors';
import { morgan } from './middlewares';

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan);

app.use('/api', router);

export { app };
