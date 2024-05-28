import express, { Request, Response, NextFunction } from 'express';
import cors, { CorsOptions } from 'cors';

import { errorHandler } from './middlewares/error-handler';
import { companyRouter } from './routes/company';
import { searchRouter } from './routes/search';

const app = express();

app.use(
  (req: Request, res: Response, next: NextFunction) => {
    next();
  },
  cors({ maxAge: 84500 })
);

app.use(companyRouter);
app.use(searchRouter);

app.use(errorHandler);

app.listen(4500, () => {
  console.log('Listening on port 4500!');
});
