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
  const { name, description } = req.body;
  await prismaClient.course.create({
    data: { name, description, added_by: res.locals.userId }
  })
  res.sendStatus(201);
}

async function updateCourse(req: Request<{ id: string }, {}, Course>, res: Response) {
  const { name, description } = req.body;
  const { id } = req.params;
  try {
    await prismaClient.course.update({
      where: { id: parseInt(id) },
      data: { name, description }
    });
  } catch (error) {
    if (error.code === 'P2025' && error.meta?.cause === 'Record to update not found.') {
      return res.status(404).json({ message: error.meta.cause })
    }
    return res.sendStatus(500);
  }
  return res.sendStatus(204);
}

async function deleteCourse(req: Request, res: Response) {
  const { id } = req.params;
  try {
    await prismaClient.course.delete({
      where: { id: parseInt(id) }
    });
  } catch (error) {
    if (error.code === 'P2025' && error.meta?.cause === 'Record to delete does not exist.') {
      return res.status(404).json({ message: error.meta.cause })
    }
    return res.sendStatus(500);
  }
  return res.sendStatus(204);
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
  const { stars, text } = req.body;
  try {
    await prismaClient.rating.create({
      data: { course_id: parseInt(id), stars, text, added_by: res.locals.userId }
    });
  } catch (error) {
    if (error.code === 'P2003' && error.meta?.field_name === 'rating_course_id_course_id_fk (index)') {
      return res.status(404).json({ message: 'Course does not exist.' });
    }
    return res.sendStatus(500);
  }
  return res.sendStatus(201);
}

async function enrollUserToCourse(req: Request<{ id: string }, {}, CourseUser>, res: Response) {
  const { id } = req.params;
  try {
    await prismaClient.course_user.create({
      data: { course_id: parseInt(id), user_id: res.locals.userId, enrollment_date: new Date() }
    });
  } catch (error) {
    if (error.code === 'P2003' && error.meta?.field_name === 'course_user_course_id_course_id_fk (index)') {
      return res.status(404).json({ message: 'Course does not exist.' });
    }
    return res.sendStatus(500);
  }
  return res.sendStatus(201);
}

async function addSongToCourse(req: Request<{ id: string }, {}, CourseSong>, res: Response) {
  const { id } = req.params;
  const { songId, order } = req.body;
  try {
    await prismaClient.course_song.create({
      data: {
        course_id: parseInt(id),
        song_id: songId,
        order,
        added_by: res.locals.userId,
        is_approved: true
      }
    });
  } catch (error) {
    if (error.code === 'P2003' && error.meta?.field_name === 'course_song_course_id_course_id_fk (index)') {
      return res.status(404).json({ message: 'Course does not exist.' });
    }
    return res.sendStatus(500);
  }
  res.sendStatus(201);
}

async function completeSongOfCourse(req: Request<{ id: string }, {}, { songId: number }>, res: Response) {
  const { id } = req.params;
  const { songId } = req.body;
  const courseSong = await prismaClient.course_song.findFirst({
    where: { course_id: parseInt(id), song_id: songId }
  });
  if (!courseSong) {
    return res.sendStatus(404);
  }
  await prismaClient.user_course_song.create({
    data: {
      datetime_completed: new Date(),
      user_id: res.locals.userId,
      course_song_id: courseSong.id
    }
  });
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
  addSongToCourse,
  completeSongOfCourse
};
