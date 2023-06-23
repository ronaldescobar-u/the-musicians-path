import { describe, jest, it, expect } from '@jest/globals';
import { songsController } from '..';
import prismaClient from '../../prisma/client';

jest.mock('@prisma/client');
jest.mock('../../prisma/client');

describe('songs controller', () => {
  const songs = [{
    id: 1,
    name: 'test',
    artist: { name: 'test' },
    genre: { name: 'test' },
    difficulty: 5,
    user: { first_name: 'test', last_name: 'test' },
    song_file: [{ id: 1, file_type: { id: 1, type: 'test' }, content: 'test' }]
  }];

  describe('getSongs', () => {
    const select = {
      id: true,
      artist: true,
      genre: true,
      difficulty: true,
      name: true
    };
    const mappedSongs = songs.map(song => ({ ...song, artist: song.artist.name, genre: song.genre.name }));

    it('should have empty object as where clause if no query params provided and return songs', async () => {
      const req = { query: {} };
      const res = {
        json: jest.fn()
      };
      const prismaClientAsAny = prismaClient as any;
      prismaClientAsAny.song = { findMany: jest.fn().mockReturnValueOnce(songs) };

      await songsController.getSongs(req as any, res as any);

      expect(prismaClientAsAny.song.findMany).toHaveBeenCalledWith({ where: {}, select });
      expect(res.json).toHaveBeenCalledWith(mappedSongs);
    });

    it('should have artist_id, genre_id and name in where clause and return songs', async () => {
      const req = { query: { artistId: '1', genreId: '1', searchQuery: 'test' } };
      const res = {
        json: jest.fn()
      };
      const prismaClientAsAny = prismaClient as any;
      prismaClientAsAny.song = { findMany: jest.fn().mockReturnValueOnce(songs) };

      await songsController.getSongs(req as any, res as any);

      expect(prismaClientAsAny.song.findMany).toHaveBeenCalledWith({
        where: { artist_id: 1, genre_id: 1, name: { contains: 'test', mode: 'insensitive' } }, select
      });
      expect(res.json).toHaveBeenCalledWith(mappedSongs);
    });
  });

  describe('getSong', () => {
    it('should return 404', async () => {
      const req = { params: { id: '1' } };
      const res = {
        sendStatus: jest.fn()
      };
      const prismaClientAsAny = prismaClient as any;
      prismaClientAsAny.song = { findUnique: jest.fn().mockReturnValueOnce(null) };

      await songsController.getSong(req as any, res as any);

      expect(res.sendStatus).toHaveBeenCalledWith(404);
    });

    it('should return song data', async () => {
      const [song] = songs;
      const req = { params: { id: '1' } };
      const res = {
        json: jest.fn()
      };
      const prismaClientAsAny = prismaClient as any;
      prismaClientAsAny.song = { findUnique: jest.fn().mockReturnValueOnce(song) };

      await songsController.getSong(req as any, res as any);

      expect(res.json).toHaveBeenCalledWith({
        id: 1,
        name: 'test',
        artist: 'test',
        genre: 'test',
        difficulty: 5,
        addedBy: 'test test',
        files: [{ id: 1, fileTypeId: 1, fileType: 'test', content: 'test' }]
      });
    });
  });

  describe('createSong', () => {
    const song = { name: 'a', artistId: 1, genreId: 1, difficulty: 1 }

    it('should return 201 and call create song with no files', async () => {
      const req = { body: song };
      const res = {
        sendStatus: jest.fn(),
        locals: { userId: 1 }
      };
      const prismaClientAsAny = prismaClient as any;
      prismaClientAsAny.song = { create: jest.fn() };
      const { name, artistId, genreId, difficulty } = req.body;

      await songsController.createSong(req as any, res as any);

      expect(res.sendStatus).toHaveBeenCalledWith(201);
      expect(prismaClientAsAny.song.create).toHaveBeenCalledWith({
        data: { name, artist_id: artistId, genre_id: genreId, difficulty, added_by: 1 }
      });
    });

    it('should return 201 and call create song with files', async () => {
      const req = { body: { ...song, files: [{ content: 'C G B A', fileTypeId: 1 }] } };
      const res = {
        sendStatus: jest.fn(),
        locals: { userId: 1 }
      };
      const prismaClientAsAny = prismaClient as any;
      prismaClientAsAny.song = { create: jest.fn() };
      const { name, artistId, genreId, difficulty, files } = req.body;

      await songsController.createSong(req as any, res as any);

      expect(res.sendStatus).toHaveBeenCalledWith(201);
      expect(prismaClientAsAny.song.create).toHaveBeenCalledWith({
        data: {
          name,
          artist_id: artistId,
          genre_id: genreId,
          difficulty,
          added_by: 1,
          song_file: { create: [{ content: 'C G B A', file_type_id: 1 }] }
        }
      });
    });
  });

  describe('updateSong', () => {
    it('should return 204 and call update', async () => {
      const req = { params: { id: '1' }, body: { name: 'strawberry', genreId: 1 } };
      const res = {
        sendStatus: jest.fn()
      };
      const prismaClientAsAny = prismaClient as any;
      prismaClientAsAny.song = { update: jest.fn() };

      await songsController.updateSong(req as any, res as any);

      expect(res.sendStatus).toHaveBeenCalledWith(204);
      expect(prismaClientAsAny.song.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { name: 'strawberry', genre_id: 1 }
      });
    });
  });

  describe('deleteSong', () => {
    it('should return 204 and call delete', async () => {
      const req = { params: { id: '1' } };
      const res = {
        sendStatus: jest.fn()
      };
      const prismaClientAsAny = prismaClient as any;
      prismaClientAsAny.song_file = { deleteMany: jest.fn() };
      prismaClientAsAny.song = { delete: jest.fn() };

      await songsController.deleteSong(req as any, res as any);

      expect(res.sendStatus).toHaveBeenCalledWith(204);
      expect(prismaClientAsAny.song.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });

  describe('getCommentsOfSong', () => {
    it('should return comments and call findMany', async () => {
      const selectObject = {
        id: true,
        user: {
          select: {
            first_name: true,
            last_name: true
          }
        }, text: true
      };
      const comments = [{ text: 'hi' }];
      const req = { params: { id: '1' } };
      const res = {
        json: jest.fn()
      };
      const prismaClientAsAny = prismaClient as any;
      prismaClientAsAny.comment = { findMany: jest.fn().mockReturnValueOnce(comments) };

      await songsController.getCommentsOfSong(req as any, res as any);

      expect(res.json).toHaveBeenCalledWith(comments);
      expect(prismaClientAsAny.comment.findMany).toHaveBeenCalledWith({
        where: { song_id: 1 }, select: selectObject
      });
    });
  });

  describe('postCommentToSong', () => {
    it('should return 201 and call create', async () => {
      const req = { params: { id: '1' }, body: { text: 'test' } };
      const { text } = req.body;
      const res = {
        sendStatus: jest.fn(),
        locals: { userId: 1 }
      };
      const prismaClientAsAny = prismaClient as any;
      prismaClientAsAny.comment = { create: jest.fn() };

      await songsController.postCommentToSong(req as any, res as any);

      expect(res.sendStatus).toHaveBeenCalledWith(201);
      expect(prismaClientAsAny.comment.create).toHaveBeenCalledWith({
        data: { song_id: 1, text, added_by: 1 }
      });
    });
  });
});
