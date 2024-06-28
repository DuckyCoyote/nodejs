"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../db/config");
const company_querys_1 = __importDefault(require("./querys/company.querys"));
class CompanyService {
    getCompanies(sort, pagination) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                /*
                 * Number of elements per page
                 */
                const pages = Number(pagination);
                /*
                 * Get companies and total of companies from DB
                 */
                const [companiesResult] = yield config_1.db.query(company_querys_1.default.getCompanies(pages));
                const [totalRowsResult] = yield config_1.db.query(company_querys_1.default.getTotalCompanies());
                const totalRows = totalRowsResult[0].total_companies;
                const data = {
                    companies: companiesResult,
                    length: totalRows,
                };
                return data;
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    getCompany(companyId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [companyResult] = yield config_1.db.query(company_querys_1.default.getCompany(), [companyId]);
                /*
                 * This block splits the founders in an Array of strings
                 * @returns string[];
                 * @example returns {company_founders: [ "PV Kannan", "S Nagarajan" ]}
                 */
                let founders;
                if (companyResult[0].company_founders && companyResult[0].company_founders.length > 0) {
                    if (typeof companyResult[0].company_founders === 'string') {
                        const splitFounders = companyResult[0].company_founders.split(',');
                        founders = { company_founders: splitFounders };
                    }
                }
                /*
                 * Get sectors from DB
                 * @example returns "sectors": [{ "sector_id": 145, "sector": "Empresa, TI & Datos", "industria_id": 7, "industry": "Software" }]
                 */
                const [sectorsResult] = yield config_1.db.query(company_querys_1.default.getSectors(), [
                    companyId,
                    companyId,
                ]);
                /*
                 * Get technologies from DB
                 * @example returns [{ market_id: 145, tech: 'Inteligencia artificial', tech2_id: 4, subtech: 'Diseo conversacional' }]
                 */
                const [technologiesResult] = yield config_1.db.query(company_querys_1.default.getCompanyTechnologies(), [companyId, companyId]);
                /*
                 * Get markets from DB
                 * @example returns [ { mercado_id: 5, name: 'Empresarial & profesional' } ]
                 */
                const [marketsResult] = yield config_1.db.query(company_querys_1.default.getCompanyMarkets(), [
                    companyId,
                ]);
                /*
                 * Get inverstors from DB
                 * @example returns [ { investor_id: 40, name: 'Sequoia Capital' } ]
                 */
                const [investorsResult] = yield config_1.db.query(company_querys_1.default.getCompanyInvestors(), [
                    companyId,
                ]);
                /*
                 * Get investors from DB
                 * @example returns
                 */
                const [contactsResult] = yield config_1.db.query(company_querys_1.default.getCompanyContacts(), [
                    companyId,
                ]);
                /*
                 * Get alliances from DB
                 * @example returns
                 */
                const [alliancesResult] = yield config_1.db.query(company_querys_1.default.getCompanyAlliances(), [
                    companyId,
                ]);
                const company = {
                    company: Object.assign(Object.assign(Object.assign({}, companyResult[0]), founders), { sectors: sectorsResult, markets: technologiesResult, mercados: marketsResult, investors: investorsResult, contacts: contactsResult, alliances: alliancesResult }),
                };
                return company;
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    /*
     * Get all the optios to form of Create Company
     */
    getFounders(companyId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [founderResult] = yield config_1.db.query(company_querys_1.default.getFounders(), [
                    companyId,
                ]);
                return { founders: [...founderResult] };
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getSedes() {
        return __awaiter(this, void 0, void 0, function* () {
            const country = 'country';
            const [sedesResult] = yield config_1.db.query(company_querys_1.default.getAll(country));
            return { sedes: sedesResult };
        });
    }
    getSectors() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [sectorsResult] = yield config_1.db.query(company_querys_1.default.getTableOrder('sector'));
                return { sectores: sectorsResult };
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    getSizes() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [sizesResult] = yield config_1.db.query(company_querys_1.default.getAll('size'));
                return { sizes: sizesResult };
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    getMercados() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [mercadosResult] = yield config_1.db.query(company_querys_1.default.getAll('mercado'));
                return { mercados: mercadosResult };
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getTechnology() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [technologiesResult] = yield config_1.db.query(company_querys_1.default.getTableOrder('market'));
                return { technology: technologiesResult };
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    getIndustries(sectorId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let rows = [];
                if (sectorId != null) {
                    const [industriesResult] = yield config_1.db.query(company_querys_1.default.getIndustries(), sectorId);
                    rows = industriesResult;
                }
                else {
                    const [industriesResult] = yield config_1.db.query(company_querys_1.default.getTableOrder('industria'));
                    rows = industriesResult;
                }
                return { industrias: rows };
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    getSubTechnologies(technologyId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let rows = [];
                if (technologyId != null) {
                    const [subTechnolgyResult] = yield config_1.db.query(company_querys_1.default.getSubTechnologies(), technologyId);
                    rows = subTechnolgyResult;
                }
                else {
                    const [subTechnolgyResult] = yield config_1.db.query(company_querys_1.default.getTableOrder('tech2'));
                    rows = subTechnolgyResult;
                }
                return { subTechnology: rows };
            }
            catch (error) {
                console.error(error);
            }
        });
    }
}
exports.default = CompanyService;
