"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get('/', (req, res) => {
    try {
        res.status(200).json({ message: 'Hello' });
    }
    catch (error) {
        console.error(error);
    }
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
exports.default = router;
