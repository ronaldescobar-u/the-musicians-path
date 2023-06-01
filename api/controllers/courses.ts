import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express';

const prisma = new PrismaClient({ log: ['query', 'info', 'warn', 'error'], });

interface Course {
  name: string;
  description?: string;
  addedBy: number;
}

async function getCourses(req: Request<{}, {}, {}, { searchQuery: string }>, res: Response) {
  const { searchQuery } = req.query;
  let whereClause = {};
  if (searchQuery) [
    whereClause = {
      where: {
        OR: [
          { name: { contains: searchQuery, mode: 'insensitive' }, },
          { description: { contains: searchQuery, mode: 'insensitive' } }
        ]
      }
    }
  ]
  const courses = await prisma.course.findMany(whereClause);
  res.json(courses);
}

async function getCourse(req: Request, res: Response) {
  const { id } = req.params;
  const courses = await prisma.course.findUnique({
    select: {id: true, name: true, description: true, user: true, },
    where: { id: parseInt(id) }
  });
  res.json(courses);
}

async function createCourse(req: Request<{}, {}, Course>, res: Response) {
  const { name, description, addedBy } = req.body;
  await prisma.course.create({
    data: { name, description, addedBy }
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

export default { getCourses, getCourse, createCourse, updateCourse, deleteCourse };
