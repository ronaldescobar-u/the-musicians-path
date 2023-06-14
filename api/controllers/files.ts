import { Request, Response } from 'express';
import SongFile from '../interfaces/SongFile';
import prismaClient from '../prisma/client';

async function addFileToSong(req: Request<{}, {}, SongFile>, res: Response) {
  const { songId, fileTypeId, content } = req.body;
  await prismaClient.song_file.create({
    data: { song_id: songId, file_type_id: fileTypeId, content }
  })
  res.sendStatus(201);
}

async function removeFileFromSong(req: Request, res: Response) {
  const { id } = req.params;
  await prismaClient.song_file.delete({
    where: { id: parseInt(id) }
  });
  res.sendStatus(204);
}

export default {
  addFileToSong,
  removeFileFromSong,
};
