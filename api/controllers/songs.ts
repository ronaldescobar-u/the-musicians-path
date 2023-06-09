import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express';
import { Song, Comment, SongsQueryParams } from '../interfaces';

const prisma = new PrismaClient();

async function getSongs(req: Request<{}, {}, {}, SongsQueryParams>, res: Response) {
  const { artistId, genreId, searchQuery } = req.query;
  let whereClause: any = {};
  if (artistId) {
    whereClause = { artist_id: parseInt(artistId) };
  }
  if (genreId) {
    whereClause = { ...whereClause, genre_id: parseInt(genreId) };
  }
  if (searchQuery) {
    whereClause = { ...whereClause, name: { contains: searchQuery, mode: 'insensitive' } };
  }
  const courses = await prisma.song.findMany({
    where: whereClause,
    select: {
      id: true,
      artist: true,
      genre: true,
      difficulty: true
    }
  });
  res.json(courses);
}

async function getSong(req: Request, res: Response) {
  const { id } = req.params;
  const song = await prisma.song.findUnique({
    select: {
      id: true,
      name: true,
      artist: true,
      genre: true,
      difficulty: true,
      user: {
        select: {
          first_name: true,
          last_name: true
        }
      },
      song_file: {
        select: {
          id: true,
          file_type: true,
          content: true
        }
      }
    },
    where: { id: parseInt(id) },
  });
  if (!song) {
    return res.sendStatus(404);
  }
  res.json(song);
}

async function createSong(req: Request<{}, {}, Song>, res: Response) {
  const { name, artistId, genreId, difficulty, addedBy, files } = req.body;
  let createData: any = {
    name,
    artist_id: artistId,
    genre_id: genreId,
    difficulty,
    added_by: addedBy,
  }
  if (files && files.length) {
    createData = {
      ...createData,
      song_file: {
        create: files.map(({ content, fileTypeId }) => ({ content, file_type_id: fileTypeId }))
      }
    }
  }
  await prisma.song.create({ data: createData });
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
    select: {
      id: true, user: {
        select: {
          first_name: true,
          last_name: true
        }
      }, text: true
    },
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
