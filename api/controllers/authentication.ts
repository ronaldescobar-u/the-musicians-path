import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client'
import { AuthenticateDto } from '../interfaces';
import bcrypt from 'bcrypt';
import generateTokens from '../utils/generateTokens';

const prisma = new PrismaClient();

async function authenticate(req: Request<{}, {}, AuthenticateDto>, res: Response) {
  const { email, password } = req.body;
  const user = await prisma.user.findFirst({ where: { email } });
  if (user) {
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (isPasswordCorrect) {
      const tokens = generateTokens(user.id);
      return res.status(200).json(tokens);
    }
  }
  return res.sendStatus(401);
}

async function refresh(req: Request, res: Response) {
  const id = res.locals.userId as number;
  const user = await prisma.user.findUnique({ where: { id } });
  if (user) {
    const tokens = generateTokens(user.id);
    return res.status(200).json(tokens);
  }
  return res.sendStatus(401);
}

export default { authenticate, refresh };
