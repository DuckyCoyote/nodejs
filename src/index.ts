import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';

import router from './routes/index';

import { errorHandler } from './middlewares/error-handler';

const app = express();

app.use(express.json());

app.use(
  (req: Request, res: Response, next: NextFunction) => {
    next();
  },
  cors({ maxAge: 84500 })
);

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

router(app);



app.use(errorHandler);

app.listen(4500, () => {
  console.log('Listening on port 4500!');
});
