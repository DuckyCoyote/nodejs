import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/search', async (req: Request, res: Response) => {
  throw new Error('Error connecting to DB!');
  res.send('Buscar :D');
});

export { router as searchRouter };
