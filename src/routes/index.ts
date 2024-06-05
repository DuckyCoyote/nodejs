import express, { Application, Router } from 'express';

import company from '../controllers/company.controller';

function routerApi(app: Application) {
  const router: Router = express.Router();
  app.use('/', router);
  router.use('/', company);
}

export default routerApi;