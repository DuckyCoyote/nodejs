import express, { Request, Response } from 'express';
import { getCompanies } from '../repositories/CompanyDB';

const router = express.Router();

router.get('/get-companies', async (req: Request, res: Response) => {
  const data = await getCompanies();
  throw new Error('OMG! Error!!');
  res.send(data);
});

export { router as companyRouter };
