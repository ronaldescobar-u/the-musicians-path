import { Request, Response } from 'express';
import { AuthenticateDto } from '../interfaces';
import bcrypt from 'bcrypt';
import generateTokens from '../utils/generateTokens';
import prismaClient from '../prisma/client';

async function authenticate(req: Request<{}, {}, AuthenticateDto>, res: Response) {
  const { email, password } = req.body;
  const user = await prismaClient.user.findUnique({ where: { email } });
  if (!user) {
    return res.status(401).send({ message: 'Email does not exist in our records.' });
  }
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return res.status(401).send({ message: 'Incorrect password.' });
  }
  const tokens = generateTokens(user.id);
  return res.json(tokens);
}

async function refresh(req: Request, res: Response) {
  const id = res.locals.userId as number;
  const user = await prismaClient.user.findUnique({ where: { id } });
  if (user) {
    const tokens = generateTokens(user.id);
    return res.json(tokens);
  }
  return res.sendStatus(401);
}

export default { authenticate, refresh };
