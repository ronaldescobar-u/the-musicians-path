import { Request, Response } from 'express';
import { Song, Comment, SongsQueryParams } from '../interfaces';
import prismaClient from '../prisma/client';

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
  const songs = await prismaClient.song.findMany({
    where: whereClause,
    select: {
      id: true,
      name: true,
      artist: true,
      genre: true,
      difficulty: true
    },
  });
  const parsedSongs = songs.map(song => ({ ...song, artist: song.artist.name, genre: song.genre.name }));
  res.json(parsedSongs);
}

async function getSong(req: Request, res: Response) {
  const { id } = req.params;
  const song = await prismaClient.song.findUnique({
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
  const parsedSong = {
    id: song.id,
    name: song.name,
    artist: song.artist.name,
    genre: song.genre.name,
    difficulty: song.difficulty,
    addedBy: `${song.user.first_name} ${song.user.last_name}`,
    files: song.song_file.map(({ id, file_type, content }) => ({ id, content, fileTypeId: file_type.id, fileType: file_type.type }))
  }
  res.json(parsedSong);
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
  await prismaClient.song.create({ data: createData });
  res.sendStatus(201);
}

async function updateSong(req: Request<{ id: string }, {}, Song>, res: Response) {
  const { name, artistId, genreId, difficulty } = req.body;
  const { id } = req.params;
  await prismaClient.song.update({
    where: { id: parseInt(id) },
    data: { name, artist_id: artistId, genre_id: genreId, difficulty }
  })
  res.sendStatus(204);
}

async function deleteSong(req: Request, res: Response) {
  const { id } = req.params;
  await prismaClient.song.delete({
    where: { id: parseInt(id) }
  });
  res.sendStatus(204);
}

async function getCommentsOfSong(req: Request, res: Response) {
  const { id } = req.params;
  const comments = await prismaClient.comment.findMany({
    select: {
      id: true,
      user: {
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
  await prismaClient.comment.create({
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
