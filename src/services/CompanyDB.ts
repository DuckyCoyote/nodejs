import { RowDataPacket } from 'mysql2';
import { db } from '../db/config';

interface Company extends RowDataPacket {
  company_id: number;
  name: string;
  logo_link: string;
}

interface TotalCompanies extends RowDataPacket {
  total_companies: number;
}

export const getCompanies = async (sort: string, pagination: string) => {
  try {
    const pages: number = Number(pagination);

    const totalRowsQuery = 'SELECT count(*) as total_companies FROM company;';
    const companiesQuery = `SELECT company_id, name, logo_link FROM company ORDER BY company_id limit ${pages * 10}, 10;`;

    const [companiesResult] = await db.query<Company[]>(companiesQuery);
    const [totalRowsResult] = await db.query<TotalCompanies[]>(totalRowsQuery);
    
    const totalRows = totalRowsResult[0].total_companies;

    const data = {
      companies: companiesResult,
      length: totalRows
    }

    return data;
  } catch (err) {
    console.log(err);
  }
};
