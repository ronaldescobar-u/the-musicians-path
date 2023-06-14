import { Request, Response } from 'express';
import { Course, CourseSong, CourseUser, Rating } from '../interfaces';
import prismaClient from '../prisma/client';

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
  const courses = await prismaClient.course.findMany(whereClause);
  res.json(courses);
}

async function getCourse(req: Request, res: Response) {
  const { id } = req.params;
  const course = await prismaClient.course.findUnique({
    select: {
      id: true,
      name: true,
      description: true,
      user: { select: { first_name: true, last_name: true } },
      course_song: {
        where: { is_approved: true },
        orderBy: { order: 'asc' },
        select: {
          song: {
            select: {
              name: true,
              artist: true,
              genre: true,
              difficulty: true
            },
          },
          order: true
        }
      }
    },
    where: { id: parseInt(id) },
  });
  if (!course) {
    return res.sendStatus(404);
  }
  return res.json(course);
}

async function createCourse(req: Request<{}, {}, Course>, res: Response) {
  const { name, description, addedBy } = req.body;
  await prismaClient.course.create({
    data: { name, description, added_by: addedBy }
  })
  res.sendStatus(201);
}

async function updateCourse(req: Request<{ id: string }, {}, Course>, res: Response) {
  const { name, description } = req.body;
  const { id } = req.params;
  await prismaClient.course.update({
    where: { id: parseInt(id) },
    data: { name, description }
  })
  res.sendStatus(204);
}

async function deleteCourse(req: Request, res: Response) {
  const { id } = req.params;
  await prismaClient.course.delete({
    where: { id: parseInt(id) }
  });
  res.sendStatus(204);
}

async function getRatingsOfCourse(req: Request, res: Response) {
  const { id } = req.params;
  const ratings = await prismaClient.rating.findMany({
    select: { id: true, stars: true, text: true, user: { select: { first_name: true, last_name: true } } },
    where: { course_id: parseInt(id) }
  })
  res.json(ratings);
}

async function submitRatingToCourse(req: Request<{ id: string }, {}, Rating>, res: Response) {
  const { id } = req.params;
  const { stars, text, addedBy } = req.body;
  await prismaClient.rating.create({
    data: { course_id: parseInt(id), stars, text, added_by: addedBy }
  })
  res.sendStatus(201);
}

async function enrollUserToCourse(req: Request<{ id: string }, {}, CourseUser>, res: Response) {
  const { id } = req.params;
  const { userId, enrollmentDate } = req.body;
  await prismaClient.course_user.create({
    data: { course_id: parseInt(id), user_id: userId, enrollment_date: new Date(enrollmentDate) }
  })
  res.sendStatus(201);
}

async function addSongToCourse(req: Request<{ id: string }, {}, CourseSong>, res: Response) {
  const { id } = req.params;
  const { songId, order, addedBy } = req.body;
  await prismaClient.course_song.create({
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
