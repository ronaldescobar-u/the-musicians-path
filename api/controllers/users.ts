import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express';
import { User } from '../interfaces';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient()

async function createUser(req: Request<{}, {}, User>, res: Response) {
  const { firstName, lastName, email, password } = req.body;
  const encryptedPassword = await bcrypt.hash(password, 10);
  await prisma.user.create({
    data: { first_name: firstName, last_name: lastName, email, password: encryptedPassword }
  })
  res.sendStatus(201);
}

async function updateUser(req: Request<{ id: string }, {}, User>, res: Response) {
  const { firstName, lastName, email, password } = req.body;
  const { id } = req.params;
  const encryptedPassword = await bcrypt.hash(password, 10);
  await prisma.user.update({
    where: { id: parseInt(id) },
    data: { first_name: firstName, last_name: lastName, email, password: encryptedPassword }
  })
  res.sendStatus(201);
}

export default { createUser, updateUser };
