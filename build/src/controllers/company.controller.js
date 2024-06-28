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
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const company_schema_1 = __importDefault(require("../schemas/company.schema"));
const request_validation_error_1 = require("../errors/request-validation-error");
const database_connection_error_1 = require("../errors/database-connection-error");
const company_service_1 = __importDefault(require("../services/company.service"));
const router = express_1.default.Router();
const company = new company_service_1.default();
router.post('/auth', [
    (0, express_validator_1.body)('email')
        .notEmpty()
        .withMessage('Email is required!')
        .isEmail()
        .withMessage('Email is invalid'),
], (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        throw new request_validation_error_1.RequestValidationError(errors.array());
    }
    throw new database_connection_error_1.DatabaseConnectionError();
    res.send({});
});
/**
 * @swagger
 * /get-companiesv2:
 *   get:
 *     summary: Obtener listado de compañias
 *     tags:
 *       - Companies
 *     parameters:
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Opción de ordenamiento
 *       - in: query
 *         name: pagination
 *         schema:
 *           type: string
 *         description: Parámetros de paginación
 *     responses:
 *       200:
 *         description: Listado obtenido con éxito
 */
router.get('/get-companiesv2', [(0, express_validator_1.query)('pagination').notEmpty().withMessage('Parameters are missing').trim()], (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            throw new request_validation_error_1.RequestValidationError(errors.array());
        }
        const { sort, pagination } = req.query;
        const data = yield company.getCompanies(sort, pagination);
        res.send(data);
    }
    catch (error) {
        next(error);
    }
}));
/**
 * @swagger
 * /get-companiesv2
 *   get:
 *     summary: Obtener listado de compañias
 *     tags:
 *       - sort
 *       - pagination
 *     responses:
 *       200:
 *         description: Listado obtenido con exito
*/
router.get('/get-company', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { companyId } = req.query;
    const data = yield company.getCompany(companyId);
    res.send(data);
}));
router.get('/get-founders', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { company_id } = req.query;
    const data = yield company.getFounders(company_id);
    res.send(data);
}));
router.get('/get-sedes', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield company.getSedes();
        res.send(data);
    }
    catch (error) {
        console.error(error);
    }
}));
router.get('/get-sectors', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield company.getSectors();
        res.send(data);
    }
    catch (error) {
        console.error(error);
    }
}));
router.get('/get-sizes', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield company.getSizes();
        res.send(data);
    }
    catch (error) {
        console.error(error);
    }
}));
router.get('/get-mercados', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield company.getMercados();
        res.send(data);
    }
    catch (error) {
        console.error(error);
    }
}));
router.get('/get-industrias', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { sectorId } = req.query;
        const data = yield company.getIndustries(sectorId);
        res.send(data);
    }
    catch (error) {
        console.error(error);
    }
}));
router.get('/get-technology', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield company.getTechnology();
        res.send(data);
    }
    catch (error) {
        console.error(error);
    }
}));
router.get('/get-subtechnology', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { technologyId } = req.query;
        const data = yield company.getSubTechnologies(technologyId);
        res.send(data);
    }
    catch (error) {
        console.error(error);
    }
}));
router.post('/create-company', company_schema_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            throw new request_validation_error_1.RequestValidationError(errors.array());
        }
        const body = req.body;
        const data = [
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
        ];
        console.log(JSON.parse(body.founders));
        res.status(200).json(data);
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
