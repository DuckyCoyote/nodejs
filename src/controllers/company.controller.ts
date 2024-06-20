import express, { NextFunction, Request, Response } from 'express';
import { body, query, validationResult } from 'express-validator';

import CompanySchema from '../schemas/company.schema';
import { RequestValidationError } from '../errors/request-validation-error';
import { DatabaseConnectionError } from '../errors/database-connection-error';

import CompanyService from '../services/company.service';
import { Company } from '../services/typos/company.typos';

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
      const body: Company = req.body;
      const data: string[] = [
        body.name,
        body.foundation,
        body.logo_link,
        body.ilustration_link,
        body.description,
        body.company_size,
        body.sede,
        body.founders,
        body.opportunities,
        body.website_url,
        body.contact_cid,
        body.register_user_id,

        body.activo,
        body.date_inactive || '',
        body.entry || '',
        body.funding || '',
        body.valuation || '',
        body.linkedin_url || '',
        body.youtube_url || '',
        body.twitter_url || '',
        body.facebook_url || '',
        body.instagram_url || '',
        body.approach || '',
        body.video_url || '',
      ]
      console.log(data);
      console.log('tech: ' + req.body.tech || '')
      console.log('markets: ' + req.body.markets || '')
      console.log(JSON.parse(body.founders))
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
);
export default router;
