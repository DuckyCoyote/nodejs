class CompanyQuery {
  static getTotalCompanies(): string {
    return 'SELECT count(*) as total_companies FROM company;';
  }

  static getAll(row: string) {
    return `SELECT * FROM ${row} ;`;
  }

  static getTableOrder(table: string) {
    return `SELECT * FROM ${table} ORDER BY trim(name);`;
  }

  static getCompanies(pages: number): string {
    return `SELECT company_id, name, logo_link FROM company ORDER BY company_id limit ${pages * 10}, 10;`;
  }

  static getCompany(): string {
    return `
      SELECT c.*, 
        CHARACTER_LENGTH(company_founders) AS founders_length, 
        co.name AS sede, 
        s.name AS company_size_cad, 
        uc.name AS contact_cid, 
        uc.lastname AS contact_cid_lastname,
        ur.name AS register_user, 
        ur.lastname AS register_user_lastname, 
        f.position, 
        f.descripcion_founders, 
        f.url_linkedin, 
        f.email, 
        f.url_photo
      FROM 
        company c
      LEFT JOIN country co ON co.country_id = c.country_id
      LEFT JOIN size s ON s.size_id = c.company_size
      LEFT JOIN user uc ON uc.user_id = c.contact_user_id
      LEFT JOIN user ur ON ur.user_id = c.register_user_id
      LEFT JOIN founders f ON f.company_id = c.company_id
      WHERE 
        c.company_id = ?;
    `;
  }

  static getSectors(): string {
    return `
      SELECT s.sector_id, s.name AS sector, i.industria_id, i.name AS industry
      FROM industries_of_sector ios
        JOIN company_sector cs ON cs.sector_id = ios.sector_id
        LEFT join sector s ON s.sector_id = cs.sector_id
        JOIN company_industria ci on ci.industria_id = ios.industria_id
        LEFT join industria i ON i.industria_id = ci.industria_id
        WHERE cs.company_id = ? AND ci.company_id = ? `;
  }

  static getCompanyTechnologies(): string {
    return `
      SELECT m.market_id,m.name AS tech,t.tech2_id,t.name AS subtech
      FROM tech_of_tech tot
        JOIN company_market cm ON cm.market_id = tot.market_id
        LEFT JOIN market m ON m.market_id = cm.market_id
        JOIN company_subtech cs ON cs.tech2_id = tot.tech2_id
        LEFT JOIN tech2 t ON t.tech2_id = cs.tech2_id
        WHERE cm.company_id = ? AND cs.company_id = ?`;
  }

  static getCompanyMarkets(): string {
    return `
      SELECT mercado.mercado_id,mercado.name
      FROM company_mercado cm
        JOIN mercado ON mercado.mercado_id = cm.mercado_id
        WHERE cm.company_id = ? ORDER BY trim(name);`;
  }

  static getCompanyInvestors(): string {
    return `
      SELECT investor.*
      FROM company_investor ci
        JOIN investor ON investor.investor_id = ci.investor_id
        WHERE ci.company_id = ? ORDER BY trim(name);`;
  }

  static getCompanyContacts(): string {
    return `
      SELECT contact.contact_id, contact.name, contact.job, contact.email, contact.phone_number,
        contact.notes, contact.projects, contact.role
      FROM contact
      WHERE company_id = ?;`;
  }

  static getCompanyAlliances(): string {
    return `
      SELECT alliance.alliance_id,alliance.name
      FROM company_alliance ca
        JOIN alliance ON alliance.alliance_id = ca.alliance_id
        WHERE ca.company_id = ? ORDER BY trim(name);`;
  }

  static getFounders(): string {
    return `
      SELECT id_founder, company_id, position, descripcion_founders, url_linkedin, email, url_photo, name_founder
      FROM founders
      WHERE company_id = ?;`;
  }

  static getIndustries() {
    return `
      SELECT ios.*,i.name
      FROM industries_of_sector ios
        LEFT JOIN industria i ON i.industria_id = ios.industria_id
        WHERE ios.sector_id = ?  ORDER BY trim(name);`
  }

  static getSubTechnologies() {
    return `
      SELECT tot.*,t.name as Subtechnology
      FROM tech_of_tech tot
        LEFT JOIN tech2 t ON t.tech2_id = tot.tech2_id WHERE tot.market_id = ? ORDER BY trim(name);`
  }
}

export default CompanyQuery;
