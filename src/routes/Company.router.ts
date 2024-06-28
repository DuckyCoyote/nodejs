import express, {Request, Response} from 'express'

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  try {
    res.status(200).json({ message: 'Hello' });
  } catch (error) {
    console.error(error)
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

export default router;