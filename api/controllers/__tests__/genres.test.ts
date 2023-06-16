import { describe, jest, it, expect } from '@jest/globals';
import { genresController } from '..';
import prismaClient from '../../prisma/client';

jest.mock('@prisma/client');
jest.mock('../prisma/client')

describe('genres controller', () => {
  describe('getGenres', () => {
    const genres = [{ id: 1, name: 'Rock' }];

    it('should return genres and call findMany', async () => {
      const req = {};
      const res = {
        json: jest.fn()
      };
      const prismaClientAsAny = prismaClient as any;
      prismaClientAsAny.genre = { findMany: jest.fn().mockReturnValueOnce(genres) };

      await genresController.getGenres(req as any, res as any);

      expect(prismaClientAsAny.genre.findMany).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(genres);
    });
  });
});
