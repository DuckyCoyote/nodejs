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
  activo: string; // char(1), YES, default '1'
  company_id: number; // int, NO, PRI, auto_increment
  name: string; // varchar(255), YES
  foundation: string; // year, YES
  logo_link: string; // varchar(255), YES
  ilustration_link: string; // varchar(255), NO
  description: string; // text, YES 
  company_size: string; // int, YES
  country_id: string; // int, YES
  sede: string;
  company_founders: string | string[]; // mediumtext, YES
  founders: string;
  opportunities: string; // text, YES
  website_url: string; // varchar(255), YES
  contact_cid: string;
  contact_user_id: string; // int, NO, MUL
  register_user_id: string; // int, NO, MUL

  date_inactive?: number | null; // year, YES
  entry?: string | null; // varchar(255), YES
  funding?: string | null; // varchar(255), YES
  valuation?: string; // varchar(255), YES, default '0'
  linkedin_url?: string | null; // varchar(255), YES
  youtube_url?: string | null; // varchar(255), YES
  twitter_url?: string | null; // varchar(255), YES
  facebook_url?: string | null; // varchar(255), YES
  instagram_url?: string | null; // varchar(255), YES
  approach?: string | null; // char(1), NO
  video_url?: string | null; // varchar(255), YES

  created_at?: string; // timestamp, YES, default CURRENT_TIMESTAMP
  updated_at?: string; // datetime, YES, default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP
  views?: number; // int, YES, default 0
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

export interface Founders {
  id_founder: number;
  company_id: number;
  position: string;
  descipcion_founders: string;
  url_linkedin: string;
  email: string;
  url_photo: string;
  name_founder: string;
}
