import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express';

const prisma = new PrismaClient()

async function getGenres(req: Request, res: Response) {
  const genres = await prisma.genre.findMany();
  res.json(genres);
}

export default { getGenres };
