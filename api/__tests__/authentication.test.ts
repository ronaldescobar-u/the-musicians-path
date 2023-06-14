import { describe, jest, it, expect } from '@jest/globals';
import { authenticationController } from '../controllers';
import prismaClient from '../prisma/client';
import bcrypt from 'bcrypt';
import generateTokens from '../utils/generateTokens';
jest.mock('../utils/generateTokens', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('@prisma/client');
jest.mock('../prisma/client')
jest.mock('bcrypt');

describe('songs controller', () => {
  describe('authenticate', () => {
    const credentials = { email: 'test@test.com', password: 'password' };
    const { email, password } = credentials;

    it('should return 401 if user with email does not exist', async () => {
      const req = { body: credentials };
      const res = {
        sendStatus: jest.fn()
      };
      const prismaClientAsAny = prismaClient as any;
      prismaClientAsAny.user = { findUnique: jest.fn().mockReturnValueOnce(null) };

      await authenticationController.authenticate(req as any, res as any);

      expect(prismaClientAsAny.user.findMany).toHaveBeenCalledWith({ where: { email } });
      expect(bcrypt.compare).toHaveBeenCalledTimes(0);
      expect(res.sendStatus).toHaveBeenCalledWith(401);
    });

    it('should return 401 if email exists but password is incorrect', async () => {
      const req = { body: credentials };
      const res = {
        sendStatus: jest.fn()
      };
      const prismaClientAsAny = prismaClient as any;
      prismaClientAsAny.user = { findUnique: jest.fn().mockReturnValueOnce(credentials) };

      await authenticationController.authenticate(req as any, res as any);

      expect(prismaClientAsAny.song.findMany).toHaveBeenCalledWith({ where: { email } });
      expect(bcrypt.compare).toHaveBeenCalledTimes(1);
      expect(bcrypt.compare).toHaveBeenCalledWith(password, password);
      expect(res.sendStatus).toHaveBeenCalledWith(401);
    });

    it('should return 200 and tokens if authentication is successful', async () => {
      const req = { body: credentials };
      const res: any = {};
      res.status = jest.fn(() => res);
      res.json = jest.fn(() => res);
      const prismaClientAsAny = prismaClient as any;
      prismaClientAsAny.user = { findUnique: jest.fn().mockReturnValueOnce(credentials) };
      const bcryptAsAny = bcrypt as any;
      bcryptAsAny.compare = jest.fn().mockResolvedValue(true as never);

      await authenticationController.authenticate(req as any, res as any);
      // jest.mocked(generateTokens).mockImplementation(() => true)
      // generateTokens.mockImplementation(() => true)

      expect(prismaClientAsAny.song.findMany).toHaveBeenCalledWith({ where: { email } });
      expect(bcrypt.compare).toHaveBeenCalledTimes(1);
      expect(bcrypt.compare).toHaveBeenCalledWith(password, password);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({});
    });
  });

  describe('refresh', () => {
    it('should return 401 if no user found', async () => {
      const req = {};
      const res = {
        locals: {userId: 1},
        sendStatus: jest.fn()
      };
      const prismaClientAsAny = prismaClient as any;
      prismaClientAsAny.user = { findUnique: jest.fn().mockReturnValueOnce(null) };

      await authenticationController.refresh(req as any, res as any);

      expect(res.sendStatus).toHaveBeenCalledWith(401);
    });

    it('should return 200 and tokens if user exists', async () => {
      const song = { name: 'Strawberry fields forever' };
      const req = { params: { id: '1' } };
      const res = {
        json: jest.fn()
      };
      const prismaClientAsAny = prismaClient as any;
      prismaClientAsAny.song = { findUnique: jest.fn().mockReturnValueOnce(song) };

      await authenticationController.getSong(req as any, res as any);

      expect(res.json).toHaveBeenCalledWith(song);
    });
  });
});
