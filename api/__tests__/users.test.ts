import { describe, jest, it, expect } from '@jest/globals';
import { usersController } from '../controllers';
import prismaClient from '../prisma/client';
import bcrypt from 'bcrypt';

jest.mock('@prisma/client');
jest.mock('../prisma/client');
jest.mock('bcrypt');

describe('users controller', () => {
  describe('createUser', () => {
    const user = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@email.com',
      password: 'password'
    };

    it('should return 201 and call create user and hash password', async () => {
      const req = { body: user };
      const res = {
        sendStatus: jest.fn()
      };
      const prismaClientAsAny = prismaClient as any;
      prismaClientAsAny.user = { create: jest.fn() };
      const { firstName, lastName, email, password } = req.body;

      await usersController.createUser(req as any, res as any);

      expect(res.sendStatus).toHaveBeenCalledWith(201);
      expect(prismaClientAsAny.user.create).toHaveBeenCalledWith({
        data: { first_name: firstName, last_name: lastName, email, password }
      });
      expect(bcrypt.hash).toHaveBeenCalledWith(password, 10);
    });
  });

  describe('updateUser', () => {
    it('should return 204 and call update', async () => {
      const {firstName, lastName} = user;
      const req = { params: { id: '1' }, body: { name: 'strawberry', genreId: 1 } };
      const res = {
        sendStatus: jest.fn()
      };
      const prismaClientAsAny = prismaClient as any;
      prismaClientAsAny.user = { update: jest.fn() };

      await usersController.updateUser(req as any, res as any);

      expect(res.sendStatus).toHaveBeenCalledWith(204);
      expect(prismaClientAsAny.user.update).toHaveBeenCalledWith({ where: { id: 1 }, data: { name: 'strawberry', genre_id: 1 } });
    });
  });
});
