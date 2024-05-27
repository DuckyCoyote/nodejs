import express from 'express';
import { errorHandler } from './middlewares/error-handler';
import { companyRouter } from './routes/company';
import { searchRouter } from './routes/search';

const app = express();

app.use(companyRouter);
app.use(searchRouter);

app.use(errorHandler);

app.listen(4500, () => {
  console.log('Listening on port 4500!');
});
