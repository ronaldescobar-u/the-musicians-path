import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express';
import { Course, CourseSong, CourseUser, Rating } from '../interfaces';

const prisma = new PrismaClient({ log: ['query', 'info', 'warn', 'error'], });

async function getCourses(req: Request<{}, {}, {}, { searchQuery: string }>, res: Response) {
  const { searchQuery } = req.query;
  let whereClause = {};
  if (searchQuery) {
    whereClause = {
      where: {
        OR: [
          { name: { contains: searchQuery, mode: 'insensitive' }, },
          { description: { contains: searchQuery, mode: 'insensitive' } }
        ]
      }
    }
  }
  const courses = await prisma.course.findMany(whereClause);
  res.json(courses);
}

async function getCourse(req: Request, res: Response) {
  const { id } = req.params;
  const course = await prisma.course.findUnique({
    select: {
      id: true,
      name: true,
      description: true,
      user: { select: { first_name: true, last_name: true } },
      course_song: {
        select: {
          song: {
            select: {
              name: true,
              artist: true,
              genre: true,
              difficulty: true
            },
            // where: { is_approved: true }
          },
          order: true
        }
      }
    },
    where: { id: parseInt(id) },
  });
  res.json(course);
}

async function createCourse(req: Request<{}, {}, Course>, res: Response) {
  const { name, description, addedBy } = req.body;
  await prisma.course.create({
    data: { name, description, added_by: addedBy }
  })
  res.sendStatus(201);
}

async function updateCourse(req: Request<{ id: string }, {}, Course>, res: Response) {
  const { name, description } = req.body;
  const { id } = req.params;
  await prisma.course.update({
    where: { id: parseInt(id) },
    data: { name, description }
  })
  res.sendStatus(204);
}

async function deleteCourse(req: Request, res: Response) {
  const { id } = req.params;
  await prisma.course.delete({
    where: { id: parseInt(id) }
  });
  res.sendStatus(204);
}

async function getRatingsOfCourse(req: Request, res: Response) {
  const { id } = req.params;
  const ratings = await prisma.rating.findMany({
    select: { id: true, stars: true, text: true, user: { select: { first_name: true, last_name: true } } },
    where: { course_id: parseInt(id) }
  })
  res.json(ratings);
}

async function submitRatingToCourse(req: Request<{ id: string }, {}, Rating>, res: Response) {
  const { id } = req.params;
  const { stars, text, addedBy } = req.body;
  await prisma.rating.create({
    data: { course_id: parseInt(id), stars, text, added_by: addedBy }
  })
  res.sendStatus(201);
}

async function enrollUserToCourse(req: Request<{ id: string }, {}, CourseUser>, res: Response) {
  const { id } = req.params;
  const { userId, enrollmentDate } = req.body;
  await prisma.course_user.create({
    data: { course_id: parseInt(id), user_id: userId, enrollment_date: new Date(enrollmentDate) }
  })
  res.sendStatus(201);
}

async function addSongToCourse(req: Request<{ id: string }, {}, CourseSong>, res: Response) {
  const { id } = req.params;
  const { songId, order, addedBy } = req.body;
  await prisma.course_song.create({
    data: {
      course_id: parseInt(id),
      song_id: songId,
      order,
      added_by: addedBy,
      is_approved: true
    }
  })
  res.sendStatus(201);
}

export default {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
  getRatingsOfCourse,
  submitRatingToCourse,
  enrollUserToCourse,
  addSongToCourse
};
