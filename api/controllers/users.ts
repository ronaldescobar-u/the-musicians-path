import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express';

const prisma = new PrismaClient()

interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string
}

async function createUser(req: Request<{}, {}, User>, res: Response) {
  const { firstName, lastName, email, password } = req.body;
  await prisma.user.create({
    data: { firstName, lastName, email, password }
  })
  res.sendStatus(201);
}

export default { createUser };
