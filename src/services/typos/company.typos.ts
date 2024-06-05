import { RowDataPacket } from 'mysql2';

export interface Companies extends RowDataPacket {
  company_id: number;
  name: string;
  logo_link: string;
}

export interface TotalCompanies extends RowDataPacket {
  total_companies: number;
}

export interface SectorDb extends RowDataPacket, Sector {}

export interface Sector {
  sector_id: number;
  sector: string;
  industria_id: number;
  industry: string;
}

export interface Market {
  market_id: number;
  tech: string;
  tech2_id: number;
  subtech: string;
}
export interface MarketDb extends RowDataPacket, Market {}

export interface Mercado {
  mercado_id: number;
  name: string;
}
export interface MercadoDb extends RowDataPacket, Mercado {}

export interface Investor {
  investor_id: number;
  name: string;
}
export interface InvestorDb extends RowDataPacket, Investor {}

export interface Contact {
  contact_id: number; // int, NO, PRI, auto_increment
  company_id: number; // int, NO, MUL
  name: string | null; // varchar(255), YES
  job: string | null; // varchar(255), YES
  email: string | null; // varchar(255), YES
  phone_number: string | null; // varchar(255), YES
  notes: string | null; // varchar(255), YES
  projects: string | null; // varchar(255), YES
  role: string | null; // char(1), YES
}
export interface ContactDb extends RowDataPacket, Contact {}

export interface Alliance {
  alliance_id: number;
  name: string;
}
export interface AllianceDb extends RowDataPacket, Alliance {}

export interface CompanyTable {
  company_id: number; // int, NO, PRI, auto_increment
  register_user_id: number; // int, NO, MUL
  contact_user_id: number; // int, NO, MUL
  name: string | null; // varchar(255), YES
  logo_link: string | null; // varchar(255), YES
  description: string | null; // text, YES
  funding: string | null; // varchar(255), YES
  entry: string | null; // varchar(255), YES
  approach: string; // char(1), NO
  facebook_url: string | null; // varchar(255), YES
  twitter_url: string | null; // varchar(255), YES
  linkedin_url: string | null; // varchar(255), YES
  website_url: string | null; // varchar(255), YES
  company_size: number | null; // int, YES
  company_founders: string | string[] | null; // mediumtext, YES
  country_id: number | null; // int, YES
  opportunities: string | null; // text, YES
  valuation: string; // varchar(255), YES, default '0'
  video_url: string | null; // varchar(255), YES
  created_at: string; // timestamp, YES, default CURRENT_TIMESTAMP
  updated_at: string; // datetime, YES, default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP
  instagram_url: string | null; // varchar(255), YES
  youtube_url: string | null; // varchar(255), YES
  views: number; // int, YES, default 0
  date_inactive: number | null; // year, YES
  activo: string; // char(1), YES, default '1'
  foundation: number | null; // year, YES
  ilustration_link: string; // varchar(255), NO
  founders_length: number;
  sede: string;
  company_size_cad: number;
  contact_cid: string;
  contact_cid_lastname: string;
  position: string;
  descipcion_founders: string;
  url_linkedin: string;
  email: string;
  url_photo: string;
}
export interface CompanyDb extends RowDataPacket, CompanyTable {}

export interface Company extends CompanyTable {
  sectors: Sector[];
  markets: Market[];
  mercados: Mercado[];
  investors: Investor[];
  contacts: Contact[]; // assuming contacts array is empty
  alliances: Alliance[]; // assuming alliances array is empty
}
