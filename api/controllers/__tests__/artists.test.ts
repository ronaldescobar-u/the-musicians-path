import { describe, jest, it, expect } from '@jest/globals';
import { artistsController } from '..';
import prismaClient from '../../prisma/client';

jest.mock('@prisma/client');
jest.mock('../../prisma/client');

describe('artists controller', () => {
  describe('getArtists', () => {
    const artists = [{ id: 1, name: 'The Beatles' }];

    it('should return artists and call findMany', async () => {
      const req = {};
      const res = {
        json: jest.fn()
      };
      const prismaClientAsAny = prismaClient as any;
      prismaClientAsAny.artist = { findMany: jest.fn().mockReturnValueOnce(artists) };

      await artistsController.getArtists(req as any, res as any);

      expect(prismaClientAsAny.artist.findMany).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(artists);
    });
  });
});
