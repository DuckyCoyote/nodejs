import express, { Request as ExRequest, Response as ExResponse, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express'

import { RegisterRoutes } from "./build/routes";

import swaggerDoc from './src/swagger';
import CompanyRouter from './src/routes/Company.router';

import { errorHandler } from './src/middlewares/error-handler';

const app = express();

const options: cors.CorsOptions = {
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Token'],
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  origin: 'http://localhost:3500',
  preflightContinue: false,
};

app.use(cors(options));

app.use(express.json());

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

// app.use(CompanyRouter)
RegisterRoutes(app);

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use(errorHandler);

app.use("/docs", swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
  return res.send(
    swaggerUi.generateHTML(await import("./build/swagger.json"))
  );
});

app.listen(4500, () => {
  console.log('Listening on port 4500!');
});
