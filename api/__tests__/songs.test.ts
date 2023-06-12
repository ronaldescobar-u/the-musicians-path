import { describe, jest, it, expect } from '@jest/globals';
import { songsController } from '../controllers';
// import { PrismaClient } from '@prisma/client'
import prismaClient from '../prisma/client';

jest.mock('@prisma/client');
jest.mock('../prisma/client')

// const prisma = new PrismaClient()

describe('songs controller', () => {
  describe('getSong', () => {
    it('should return 404', async () => {
      const req = {};
      const res = {
        sendStatus: jest.fn()
      };

      await songsController.getSong(req, res as any);

      prismaClient.song = { findUnique: jest.fn().mockReturnValueOnce(null) };

      expect(res.sendStatus).toHaveBeenCalledWith(404);
    });

    it('should return 200 and song data', async () => {
      const req = {};
      const res = {
        json: jest.fn()
      };

      await songsController.getSong(req, res as any);

      prismaClient.song = { findUnique: jest.fn().mockReturnValueOnce({ name: 'Strawberry fields forever' }) };

      expect(res.json).toHaveBeenCalledWith({ name: 'Strawberry fields forever' });
    });

  })
});
