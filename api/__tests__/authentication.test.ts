import { describe, jest, it, expect } from '@jest/globals';
import { authenticationController } from '../controllers';
import prismaClient from '../prisma/client';
import bcrypt from 'bcrypt';
import generateTokens from '../utils/generateTokens';
jest.mock('../utils/generateTokens', () => ({
  __esModule: true,
  default: jest.fn(() => ({ accessToken: 'test', refreshToken: 'test' })),
}));

jest.mock('@prisma/client');
jest.mock('../prisma/client')
jest.mock('bcrypt');

describe('authentication controller', () => {
  describe('authenticate', () => {
    const credentials = { email: 'test@test.com', password: 'password' };
    const { email, password } = credentials;
    beforeEach(() => {
      jest.clearAllMocks();
    })

    it('should return 401 if user with email does not exist', async () => {
      const req = { body: credentials };
      const res = {
        sendStatus: jest.fn()
      };
      const prismaClientAsAny = prismaClient as any;
      prismaClientAsAny.user = { findUnique: jest.fn().mockReturnValueOnce(null) };

      await authenticationController.authenticate(req as any, res as any);

      expect(prismaClientAsAny.user.findUnique).toHaveBeenCalledWith({ where: { email } });
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

      expect(prismaClientAsAny.user.findUnique).toHaveBeenCalledWith({ where: { email } });
      expect(bcrypt.compare).toHaveBeenCalledTimes(1);
      expect(bcrypt.compare).toHaveBeenCalledWith(password, password);
      expect(res.sendStatus).toHaveBeenCalledWith(401);
    });

    it('should return 200 and tokens if authentication is successful', async () => {
      const req = { body: credentials };
      const res: any = {
        json: jest.fn()
      };
      const prismaClientAsAny = prismaClient as any;
      prismaClientAsAny.user = { findUnique: jest.fn().mockReturnValueOnce(credentials) };
      jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => {
        return new Promise((resolve) => resolve(true));
      });
      

      await authenticationController.authenticate(req as any, res as any);

      expect(prismaClientAsAny.user.findUnique).toHaveBeenCalledWith({ where: { email } });
      expect(bcrypt.compare).toHaveBeenCalledTimes(1);
      expect(bcrypt.compare).toHaveBeenCalledWith(password, password);
      expect(res.json).toHaveBeenCalledWith({ accessToken: 'test', refreshToken: 'test' });
    });
  });

  describe('refresh', () => {
    it('should return 401 if no user found', async () => {
      const req = {};
      const res = {
        locals: { userId: 1 },
        sendStatus: jest.fn()
      };
      const prismaClientAsAny = prismaClient as any;
      prismaClientAsAny.user = { findUnique: jest.fn().mockReturnValueOnce(null) };

      await authenticationController.refresh(req as any, res as any);

      expect(prismaClientAsAny.user.findUnique).toHaveBeenCalledWith({ where: { id: res.locals.userId } });
      expect(res.sendStatus).toHaveBeenCalledWith(401);
    });

    it('should return 200 and tokens if user exists', async () => {
      const user = { id: 1 };
      const req = {};
      const res: any = {
        locals: { userId: 1 },
        json: jest.fn()

      };
      const prismaClientAsAny = prismaClient as any;
      prismaClientAsAny.user = { findUnique: jest.fn().mockReturnValueOnce(user) };

      await authenticationController.refresh(req as any, res as any);

      expect(prismaClientAsAny.user.findUnique).toHaveBeenCalledWith({ where: { id: res.locals.userId } });
      expect(generateTokens).toHaveBeenCalledWith(user.id);
      expect(res.json).toHaveBeenCalledWith({ accessToken: 'test', refreshToken: 'test' });
    });
  });
});
