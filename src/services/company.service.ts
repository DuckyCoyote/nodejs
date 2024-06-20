import { RowDataPacket } from 'mysql2';
import { db } from '../db/config';

import {
  Companies,
  SectorDb,
  ContactDb,
  AllianceDb,
  MarketDb,
  MercadoDb,
  InvestorDb,
  Company,
  CompanyDb,
  TotalCompanies,
  Mercado,
} from './typos/company.typos';
import CompanyQuery from './querys/company.querys';

class CompanyService {
  async getCompanies(sort: string, pagination: string) {
    try {
      /*
       * Number of elements per page
       */
      const pages: number = Number(pagination);

      /*
       * Get companies and total of companies from DB
       */
      const [companiesResult] = await db.query<Companies[]>(CompanyQuery.getCompanies(pages));
      const [totalRowsResult] = await db.query<TotalCompanies[]>(CompanyQuery.getTotalCompanies());

      const totalRows = totalRowsResult[0].total_companies;

      const data = {
        companies: companiesResult,
        length: totalRows,
      };

      return data;
    } catch (err) {
      console.log(err);
    }
  }

  async getCompany(companyId: string) {
    try {
      const [companyResult] = await db.query<CompanyDb[]>(CompanyQuery.getCompany(), [companyId]);

      /*
       * This block splits the founders in an Array of strings
       * @returns string[];
       * @example returns {company_founders: [ "PV Kannan", "S Nagarajan" ]}
       */
      let founders;
      if (companyResult[0].company_founders && companyResult[0].company_founders.length > 0) {
        if (typeof companyResult[0].company_founders === 'string') {
          const splitFounders: string[] = companyResult[0].company_founders.split(',');
          founders = { company_founders: splitFounders };
        }
      }

      /*
       * Get sectors from DB
       * @example returns "sectors": [{ "sector_id": 145, "sector": "Empresa, TI & Datos", "industria_id": 7, "industry": "Software" }]
       */
      const [sectorsResult] = await db.query<SectorDb[]>(CompanyQuery.getSectors(), [
        companyId,
        companyId,
      ]);

      /*
       * Get technologies from DB
       * @example returns [{ market_id: 145, tech: 'Inteligencia artificial', tech2_id: 4, subtech: 'Diseo conversacional' }]
       */
      const [technologiesResult] = await db.query<MarketDb[]>(
        CompanyQuery.getCompanyTechnologies(),
        [companyId, companyId]
      );

      /*
       * Get markets from DB
       * @example returns [ { mercado_id: 5, name: 'Empresarial & profesional' } ]
       */
      const [marketsResult] = await db.query<MercadoDb[]>(CompanyQuery.getCompanyMarkets(), [
        companyId,
      ]);

      /*
       * Get inverstors from DB
       * @example returns [ { investor_id: 40, name: 'Sequoia Capital' } ]
       */
      const [investorsResult] = await db.query<InvestorDb[]>(CompanyQuery.getCompanyInvestors(), [
        companyId,
      ]);

      /*
       * Get investors from DB
       * @example returns
       */
      const [contactsResult] = await db.query<ContactDb[]>(CompanyQuery.getCompanyContacts(), [
        companyId,
      ]);

      /*
       * Get alliances from DB
       * @example returns
       */
      const [alliancesResult] = await db.query<AllianceDb[]>(CompanyQuery.getCompanyAlliances(), [
        companyId,
      ]);

      const company: { company: Company } = {
        company: {
          ...companyResult[0],
          ...founders,
          sectors: sectorsResult,
          markets: technologiesResult,
          mercados: marketsResult,
          investors: investorsResult,
          contacts: contactsResult,
          alliances: alliancesResult,
        },
      };

      return company;
    } catch (error) {
      console.error(error);
    }
  }

  /*
   * Get all the optios to form of Create Company
   */
  async getFounders(companyId: string) {
    try {
      const [founderResult] = await db.query<RowDataPacket[]>(CompanyQuery.getFounders(), [
        companyId,
      ]);
      return { founders: [...founderResult] };
    } catch (error) {
      console.log(error);
    }
  }

  async getSedes() {
    const country = 'country';
    const [sedesResult] = await db.query<RowDataPacket[]>(CompanyQuery.getAll(country));
    return { sedes: sedesResult };
  }

  async getSectors() {
    try {
      const [sectorsResult] = await db.query<SectorDb[]>(CompanyQuery.getTableOrder('sector'));
      return { sectores: sectorsResult };
    } catch (error) {
      console.error(error);
    }
  }

  async getSizes() {
    try {
      const [sizesResult] = await db.query<RowDataPacket[]>(CompanyQuery.getAll('size'));
      return { sizes: sizesResult };
    } catch (error) {
      console.error(error);
    }
  }

  async getMercados() {
    try {
      const [mercadosResult] = await db.query<MercadoDb[]>(CompanyQuery.getAll('mercado'));
      return { mercados: mercadosResult };
    } catch (error) {
      console.log(error);
    }
  }

  async getTechnology() {
    try {
      const [technologiesResult] = await db.query<RowDataPacket[]>(
        CompanyQuery.getTableOrder('market')
      );
      return { technology: technologiesResult };
    } catch (error) {
      console.error(error);
    }
  }

  async getIndustries(sectorId: string) {
    try {
      let rows = [];
      if (sectorId != null) {
        const [industriesResult] = await db.query<RowDataPacket[]>(
          CompanyQuery.getIndustries(),
          sectorId
        );
        rows = industriesResult;
      } else {
        const [industriesResult] = await db.query<RowDataPacket[]>(
          CompanyQuery.getTableOrder('industria')
        );
        rows = industriesResult;
      }
      return { industrias: rows };
    } catch (error) {
      console.error(error);
    }
  }

  async getSubTechnologies(technologyId: string) {
    try {
      let rows = [];
      if (technologyId != null) {
        const [subTechnolgyResult] = await db.query<RowDataPacket[]>(
          CompanyQuery.getSubTechnologies(),
          technologyId
        );
        rows = subTechnolgyResult;
      } else {
        const [subTechnolgyResult] = await db.query<RowDataPacket[]>(
          CompanyQuery.getTableOrder('tech2')
        );
        rows = subTechnolgyResult;
      }
      return { subTechnology: rows };
    } catch (error) {
      console.error(error);
    }
  }
}

export default CompanyService;
