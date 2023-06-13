import { describe, jest, it, expect } from '@jest/globals';
import { coursesController } from '../controllers';
import prismaClient from '../prisma/client';

jest.mock('@prisma/client');
jest.mock('../prisma/client')

describe('courses controller', () => {
  describe('getCourses', () => {
    const select = {
      id: true,
      artist: true,
      genre: true,
      difficulty: true
    };
    const courses = [{ name: 'test ' }];

    it('should have empty object as where clause if no query params provided and return courses', async () => {
      const req = { query: {} };
      const res = {
        json: jest.fn()
      };
      const prismaClientAsAny = prismaClient as any;
      prismaClientAsAny.course = { findMany: jest.fn().mockReturnValueOnce(courses) };

      await coursesController.getCourses(req as any, res as any);

      expect(prismaClientAsAny.course.findMany).toHaveBeenCalledWith({ where: {}, select });
      expect(res.json).toHaveBeenCalledWith(courses);
    });

    it('should have artist_id, genre_id and name in where clause and return courses', async () => {
      const req = { query: { artistId: '1', genreId: '1', searchQuery: 'test' } };
      const res = {
        json: jest.fn()
      };
      const prismaClientAsAny = prismaClient as any;
      prismaClientAsAny.course = { findMany: jest.fn().mockReturnValueOnce(courses) };

      await coursesController.getCourses(req as any, res as any);

      expect(prismaClientAsAny.course.findMany).toHaveBeenCalledWith({ where: { artist_id: 1, genre_id: 1, name: { contains: 'test', mode: 'insensitive' } }, select });
      expect(res.json).toHaveBeenCalledWith(courses);
    });
  });

  describe('getCourse', () => {
    it('should return 404', async () => {
      const req = {};
      const res = {
        sendStatus: jest.fn()
      };
      const prismaClientAsAny = prismaClient as any;
      prismaClientAsAny.course = { findUnique: jest.fn().mockReturnValueOnce(null) };

      await coursesController.getCourse(req as any, res as any);

      expect(res.sendStatus).toHaveBeenCalledWith(404);
    });

    it('should return course data', async () => {
      const course = { name: 'Strawberry fields forever' };
      const req = {};
      const res = {
        json: jest.fn()
      };
      const prismaClientAsAny = prismaClient as any;
      prismaClientAsAny.course = { findUnique: jest.fn().mockReturnValueOnce(course) };

      await coursesController.getCourse(req as any, res as any);

      expect(res.json).toHaveBeenCalledWith(course);
    });
  });

  describe('createCourse', () => {
    it('should return 404', async () => {
      const req = {};
      const res = {
        sendStatus: jest.fn()
      };
      const prismaClientAsAny = prismaClient as any;
      prismaClientAsAny.course = { create: jest.fn().mockReturnValueOnce(null) };

      await coursesController.getCourse(req as any, res as any);

      expect(res.sendStatus).toHaveBeenCalledWith(404);
    });

    it('should return 200 and course data', async () => {
      const req = {};
      const res = {
        json: jest.fn()
      };
      const prismaClientAsAny = prismaClient as any;
      prismaClientAsAny.course = { create: jest.fn().mockReturnValueOnce({ name: 'Strawberry fields forever' }) };

      await coursesController.getCourse(req as any, res as any);

      expect(res.json).toHaveBeenCalledWith({ name: 'Strawberry fields forever' });
    });
  });

  describe('updateCourse', () => {
    it('should return 404', async () => {
      const req = {};
      const res = {
        sendStatus: jest.fn()
      };
      const prismaClientAsAny = prismaClient as any;
      prismaClientAsAny.course = { create: jest.fn().mockReturnValueOnce(null) };

      await coursesController.getCourse(req as any, res as any);

      expect(res.sendStatus).toHaveBeenCalledWith(404);
    });

    it('should return 200 and course data', async () => {
      const req = {};
      const res = {
        json: jest.fn()
      };
      const prismaClientAsAny = prismaClient as any;
      prismaClientAsAny.course = { create: jest.fn().mockReturnValueOnce({ name: 'Strawberry fields forever' }) };

      await coursesController.getCourse(req as any, res as any);

      expect(res.json).toHaveBeenCalledWith({ name: 'Strawberry fields forever' });
    });
  });

  describe('deleteCourse', () => {
    it('should return 404', async () => {
      const req = {};
      const res = {
        sendStatus: jest.fn()
      };
      const prismaClientAsAny = prismaClient as any;
      prismaClientAsAny.course = { create: jest.fn().mockReturnValueOnce(null) };

      await coursesController.getCourse(req as any, res as any);

      expect(res.sendStatus).toHaveBeenCalledWith(404);
    });

    it('should return 200 and course data', async () => {
      const req = {};
      const res = {
        json: jest.fn()
      };
      const prismaClientAsAny = prismaClient as any;
      prismaClientAsAny.course = { create: jest.fn().mockReturnValueOnce({ name: 'Strawberry fields forever' }) };

      await coursesController.getCourse(req as any, res as any);

      expect(res.json).toHaveBeenCalledWith({ name: 'Strawberry fields forever' });
    });
  });
});
