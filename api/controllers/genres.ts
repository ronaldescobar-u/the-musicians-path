import { Request, Response } from 'express';
import prismaClient from '../prisma/client';

async function getGenres(req: Request, res: Response) {
  const genres = await prismaClient.genre.findMany();
  res.json(genres);
}

export default { getGenres };
