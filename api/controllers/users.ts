import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express';
import { User } from '../interfaces';

const prisma = new PrismaClient()

async function createUser(req: Request<{}, {}, User>, res: Response) {
  const { firstName, lastName, email, password } = req.body;
  await prisma.user.create({
    data: { first_name: firstName, last_name: lastName, email, password }
  })
  res.sendStatus(201);
}

export default { createUser };
