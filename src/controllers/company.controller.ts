import express, { NextFunction, Request, Response } from 'express';
import { body, query, validationResult } from 'express-validator';

import CompanySchema from '../schemas/company.schema';
import { RequestValidationError } from '../errors/request-validation-error';
import { DatabaseConnectionError } from '../errors/database-connection-error';

import CompanyService from '../services/company.service';
import { ObjectFlags } from 'typescript';
import { CompanyTable } from '../services/typos/company.typos';
import { isArray } from 'util';

const router = express.Router();
const company = new CompanyService();

router.post(
  '/auth',
  [
    body('email')
      .notEmpty()
      .withMessage('Email is required!')
      .isEmail()
      .withMessage('Email is invalid'),
  ],
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }
    throw new DatabaseConnectionError();
    res.send({});
  }
);

router.get(
  '/get-companiesv2',
  [query('pagination').notEmpty().withMessage('Parameters are missing').trim()],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array());
      }
      const { sort, pagination } = req.query;
      const data = await company.getCompanies(sort as string, pagination as string);
      res.send(data);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/get-company', async (req: Request, res: Response) => {
  const { companyId } = req.query;
  const data = await company.getCompany(companyId as string);
  res.send(data);
});

router.get('/get-founders', async (req: Request, res: Response) => {
  const { company_id } = req.query;
  const data = await company.getFounders(company_id as string);
  res.send(data);
});

router.get('/get-sedes', async (req: Request, res: Response) => {
  try {
    const data = await company.getSedes();
    res.send(data);
  } catch (error) {
    console.error(error);
  }
});

router.get('/get-sectors', async (req: Request, res: Response) => {
  try {
    const data = await company.getSectors();
    res.send(data);
  } catch (error) {
    console.error(error);
  }
});

router.get('/get-sizes', async (req: Request, res: Response) => {
  try {
    const data = await company.getSizes();
    res.send(data);
  } catch (error) {
    console.error(error);
  }
});

router.get('/get-mercados', async (req: Request, res: Response) => {
  try {
    const data = await company.getMercados();
    res.send(data);
  } catch (error) {
    console.error(error);
  }
});

router.get('/get-industrias', async (req: Request, res: Response) => {
  try {
    const { sectorId } = req.query;
    const data = await company.getIndustries(sectorId as string);
    res.send(data);
  } catch (error) {
    console.error(error);
  }
});

router.get('/get-technology', async (req: Request, res: Response) => {
  try {
    const data = await company.getTechnology();
    res.send(data);
  } catch (error) {
    console.error(error);
  }
});

router.get('/get-subtechnology', async (req: Request, res: Response) => {
  try {
    const { technologyId } = req.query;
    const data = await company.getSubTechnologies(technologyId as string);
    res.send(data);
  } catch (error) {
    console.error(error);
  }
});

router.post(
  '/create-company',
  CompanySchema,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array());
      }
      const body: CompanyTable = req.body;
      const data: string[] = [
        body.name,
        body.register_user_id,
        body.contact_user_id,
        body.approach || '',
        body.logo_link,
        body.description,
        body.company_size,
        body.entry || '',
        body.facebook_url || '',
        body.twitter_url || '',
        body.linkedin_url || '',
        body.website_url,
      ] 
      console.log(data);
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  }
);
export default router;
