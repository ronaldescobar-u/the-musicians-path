import { Request, Response } from 'express';
import { AuthenticateDto } from '../interfaces';
import bcrypt from 'bcrypt';
import generateTokens from '../utils/generateTokens';
import prismaClient from '../prisma/client';

async function authenticate(req: Request<{}, {}, AuthenticateDto>, res: Response) {
  const { email, password } = req.body;
  const user = await prismaClient.user.findFirst({ where: { email } });
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
  const user = await prismaClient.user.findUnique({ where: { id } });
  if (user) {
    const tokens = generateTokens(user.id);
    return res.status(200).json(tokens);
  }
  return res.sendStatus(401);
}

export default { authenticate, refresh };
