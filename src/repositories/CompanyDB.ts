import { RowDataPacket } from 'mysql2';
import { db } from '../config/db';

interface Company extends RowDataPacket {
  company_id: number;
  name: string;
  logo_link: string;
}

export const getCompanies = async () => {
  const query =
    'SELECT company_id, name, logo_link FROM company ORDER BY company_id limit 10;';

  const [data] = await db.query<Company[]>(query);

  return data;
};
