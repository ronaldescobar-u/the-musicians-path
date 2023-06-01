import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express';

const prisma = new PrismaClient()

async function getArtists(req: Request, res: Response) {
  const artists = await prisma.artist.findMany();
  res.json(artists);
}

export default { getArtists };
