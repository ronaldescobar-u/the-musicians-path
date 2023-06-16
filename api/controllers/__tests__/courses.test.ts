import { describe, jest, it, expect } from '@jest/globals';
import { coursesController } from '..';
import prismaClient from '../../prisma/client';

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
    const courses = [{ name: 'test' }];

    it('should return courses and call findMany with empty object if no query params provided', async () => {
      const req = { query: {} };
      const res = {
        json: jest.fn()
      };
      const prismaClientAsAny = prismaClient as any;
      prismaClientAsAny.course = { findMany: jest.fn().mockReturnValueOnce(courses) };

      await coursesController.getCourses(req as any, res as any);

      expect(prismaClientAsAny.course.findMany).toHaveBeenCalledWith({});
      expect(res.json).toHaveBeenCalledWith(courses);
    });

    it('should return courses and call findMany with where clause if query params provided', async () => {
      const req = { query: { searchQuery: 'test' } };
      const res = {
        json: jest.fn()
      };
      const prismaClientAsAny = prismaClient as any;
      prismaClientAsAny.course = { findMany: jest.fn().mockReturnValueOnce(courses) };

      await coursesController.getCourses(req as any, res as any);

      expect(prismaClientAsAny.course.findMany).toHaveBeenCalledWith({
        where: {
          OR: [
            { name: { contains: req.query.searchQuery, mode: 'insensitive' }, },
            { description: { contains: req.query.searchQuery, mode: 'insensitive' } }
          ]
        }
      });
      expect(res.json).toHaveBeenCalledWith(courses);
    });
  });

  describe('getCourse', () => {
    it('should return 404', async () => {
      const req = { params: { id: '1' } };
      const res = {
        sendStatus: jest.fn()
      };
      const prismaClientAsAny = prismaClient as any;
      prismaClientAsAny.course = { findUnique: jest.fn().mockReturnValueOnce(null) };

      await coursesController.getCourse(req as any, res as any);

      expect(res.sendStatus).toHaveBeenCalledWith(404);
      expect(prismaClientAsAny.course.findUnique).toHaveBeenCalled();
    });

    it('should return course data', async () => {
      const course = { name: 'test' };
      const req = { params: { id: '1' } };
      const res = {
        json: jest.fn()
      };
      const prismaClientAsAny = prismaClient as any;
      prismaClientAsAny.course = { findUnique: jest.fn().mockReturnValueOnce(course) };

      await coursesController.getCourse(req as any, res as any);

      expect(res.json).toHaveBeenCalledWith(course);
      expect(prismaClientAsAny.course.findUnique).toHaveBeenCalled();
    });
  });

  describe('createCourse', () => {
    const course = { name: 'test', description: 'test', addedBy: 1 }

    it('should return 201 and call create course', async () => {
      const req = { body: course };
      const res = {
        sendStatus: jest.fn()
      };
      const prismaClientAsAny = prismaClient as any;
      prismaClientAsAny.course = { create: jest.fn() };
      const { name, description, addedBy } = req.body;

      await coursesController.createCourse(req as any, res as any);

      expect(res.sendStatus).toHaveBeenCalledWith(201);
      expect(prismaClientAsAny.course.create).toHaveBeenCalledWith({ data: { name, description, added_by: addedBy } });
    });
  });

  describe('updateCourse', () => {
    it('should return 204 and call update course with data', async () => {
      const req = { params: { id: '1' }, body: { name: 'course' } };
      const res = {
        sendStatus: jest.fn()
      };
      const prismaClientAsAny = prismaClient as any;
      prismaClientAsAny.course = { update: jest.fn() };

      await coursesController.updateCourse(req as any, res as any);

      expect(res.sendStatus).toHaveBeenCalledWith(204);
      expect(prismaClientAsAny.course.update).toHaveBeenCalledWith({ where: { id: 1 }, data: { name: 'course' } });
    });
  });

  describe('deleteCourse', () => {
    it('should return 204 and call delete course with where id', async () => {
      const req = { params: { id: '1' } };
      const res = {
        sendStatus: jest.fn()
      };
      const prismaClientAsAny = prismaClient as any;
      prismaClientAsAny.course = { delete: jest.fn() };

      await coursesController.deleteCourse(req as any, res as any);

      expect(res.sendStatus).toHaveBeenCalledWith(204);
      expect(prismaClientAsAny.course.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });

  describe('getRatingsOfCourse', () => {
    it('should return comments and call findMany', async () => {
      const selectObject = {
        id: true, stars: true, text: true, user: { select: { first_name: true, last_name: true } },
      };
      const comments = [{ text: 'hi' }];
      const req = { params: { id: '1' } };
      const res = {
        json: jest.fn()
      };
      const prismaClientAsAny = prismaClient as any;
      prismaClientAsAny.rating = { findMany: jest.fn().mockReturnValueOnce(comments) };

      await coursesController.getRatingsOfCourse(req as any, res as any);

      expect(res.json).toHaveBeenCalledWith(comments);
      expect(prismaClientAsAny.rating.findMany).toHaveBeenCalledWith({ where: { course_id: 1 }, select: selectObject });
    });
  });

  describe('submitRatingToCourse', () => {
    it('should return 201 and call create', async () => {
      const req = { params: { id: '1' }, body: { stars: 5, text: 'test', addedBy: 1 } };
      const { stars, text, addedBy } = req.body;
      const res = {
        sendStatus: jest.fn()
      };
      const prismaClientAsAny = prismaClient as any;
      prismaClientAsAny.rating = { create: jest.fn() };

      await coursesController.submitRatingToCourse(req as any, res as any);

      expect(res.sendStatus).toHaveBeenCalledWith(201);
      expect(prismaClientAsAny.rating.create).toHaveBeenCalledWith({ data: { course_id: 1, stars, text, added_by: addedBy } });
    });
  });

  describe('enrollUserToCourse', () => {
    it('should return 201 and call create', async () => {
      const req = { params: { id: '1' }, body: { userId: 1, enrollmentDate: '2023-06-19' } };
      const { userId, enrollmentDate } = req.body;
      const res = {
        sendStatus: jest.fn()
      };
      const prismaClientAsAny = prismaClient as any;
      prismaClientAsAny.course_user = { create: jest.fn() };

      await coursesController.enrollUserToCourse(req as any, res as any);

      expect(res.sendStatus).toHaveBeenCalledWith(201);
      expect(prismaClientAsAny.course_user.create).toHaveBeenCalledWith({ data: { course_id: 1, user_id: userId, enrollment_date: new Date(enrollmentDate) } });
    });
  });

  describe('addSongToCourse', () => {
    it('should return 201 and call create', async () => {
      const req = { params: { id: '1' }, body: { songId: 1, order: 1, addedBy: 1 } };
      const { songId, order, addedBy } = req.body;
      const res = {
        sendStatus: jest.fn()
      };
      const prismaClientAsAny = prismaClient as any;
      prismaClientAsAny.course_song = { create: jest.fn() };

      await coursesController.addSongToCourse(req as any, res as any);

      expect(res.sendStatus).toHaveBeenCalledWith(201);
      expect(prismaClientAsAny.course_song.create).toHaveBeenCalledWith({ data: { course_id: 1, song_id: songId, order, added_by: addedBy, is_approved: true } });
    });
  });
});
