import express, { Request, Response } from 'express';
import { getCompanies } from '../services/CompanyDB';

const router = express.Router();

router.get('/get-companiesv2', async (req: Request, res: Response) => {
  const { sort, pagination } = req.query;
  const data = await getCompanies(sort as string, pagination as string);
  res.send(data);
});

export { router as companyRouter };
