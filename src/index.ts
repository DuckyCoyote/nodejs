import express from 'express';
import cors, {CorsOptions} from 'cors';

import { errorHandler } from './middlewares/error-handler';
import { companyRouter } from './routes/company';
import { searchRouter } from './routes/search';

const app = express();

const WHITELIST: string = 'http://localhost:3000'

const options: CorsOptions = {
  origin: (origin , callback: (err: Error | null, allow?: boolean) => void) => {
    if (WHITELIST.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('No permitido!'));
    }
  }
}

app.use(cors(options));

app.use(companyRouter);
app.use(searchRouter);

app.use(errorHandler);

app.listen(4500, () => {
  console.log('Listening on port 4500!');
});
