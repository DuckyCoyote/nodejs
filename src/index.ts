import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';

import router from './routes/index';

import { errorHandler } from './middlewares/error-handler';

const app = express();

const options: cors.CorsOptions = {
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Token'],
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  origin: 'http://localhost:3500/',
  preflightContinue: false,
};

app.use(cors(options));

app.use(express.json());

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

router(app);

app.use(errorHandler);

app.listen(4500, () => {
  console.log('Listening on port 4500!');
});
