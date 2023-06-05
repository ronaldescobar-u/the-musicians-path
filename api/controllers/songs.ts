import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express';
import { Song, Comment, SongsQueryParams } from '../interfaces';

const prisma = new PrismaClient({ log: ['query', 'info', 'warn', 'error'], });

async function getSongs(req: Request<{}, {}, {}, SongsQueryParams>, res: Response) {
  const { artistId, genreId, searchQuery } = req.query;
  let whereClause = {};
  if (searchQuery) [
    whereClause = {
      where: {
        OR: [
          { name: { contains: searchQuery, mode: 'insensitive' }, },
        ]
      }
    }
  ]
  const courses = await prisma.song.findMany(whereClause);
  res.json(courses);
}

async function getSong(req: Request, res: Response) {
  const { id } = req.params;
  const song = await prisma.song.findUnique({
    where: { id: parseInt(id) },
  });
  res.json(song);
}

async function createSong(req: Request<{}, {}, Song>, res: Response) {
  const { name, artistId, genreId, difficulty, addedBy } = req.body;
  await prisma.song.create({
    data: { name, artist_id: artistId, genre_id: genreId, difficulty, added_by: addedBy }
  })
  res.sendStatus(201);
}

async function updateSong(req: Request<{ id: string }, {}, Song>, res: Response) {
  const { name, artistId, genreId, difficulty } = req.body;
  const { id } = req.params;
  await prisma.song.update({
    where: { id: parseInt(id) },
    data: { name, artist_id: artistId, genre_id: genreId, difficulty }
  })
  res.sendStatus(204);
}

async function deleteSong(req: Request, res: Response) {
  const { id } = req.params;
  await prisma.song.delete({
    where: { id: parseInt(id) }
  });
  res.sendStatus(204);
}

async function getCommentsOfSong(req: Request, res: Response) {
  const { id } = req.params;
  const comments = await prisma.comment.findMany({
    where: { song_id: parseInt(id) }
  })
  res.json(comments);
}

async function postCommentToSong(req: Request<{ id: string }, {}, Comment>, res: Response) {
  const { id } = req.params;
  const { text, addedBy } = req.body;
  await prisma.comment.create({
    data: { song_id: parseInt(id), text, added_by: addedBy }
  })
  res.sendStatus(201);
}


export default {
  getSongs,
  getSong,
  createSong,
  updateSong,
  deleteSong,
  getCommentsOfSong,
  postCommentToSong,
};
