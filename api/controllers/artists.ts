import { Request, Response } from 'express';
import prismaClient from '../prisma/client';

async function getArtists(req: Request, res: Response) {
  const artists = await prismaClient.artist.findMany();
  res.json(artists);
}

export default { getArtists };
