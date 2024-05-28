import { RowDataPacket } from 'mysql2';
import { db } from '../db/config';

interface Company extends RowDataPacket {
  company_id: number;
  name: string;
  logo_link: string;
}

export const getCompanies = async (sort: string, pagination: string) => {
  try {
    /*
    0 - 0
    1 - 9
    2 - 19
    3 - 29
    4 - 39
    5 - 49
    */
    const pages: number = Number(pagination);
    const page = pages === 0 ? 0 : pages * 10 - 1;
    const query = `SELECT company_id, name, logo_link FROM company ORDER BY company_id limit ${page}, 10`;

    const [data] = await db.query<Company[]>(query);

    return data;
  } catch (err) {
    console.log(err);
  }
};
