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
  const artists = await prisma.user.create({
    data: { firstName, lastName, email, password }
  })
  res.json(artists);
}

export default { createUser };
