import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client'
import { AuthenticateDto } from '../interfaces';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

async function authenticate(req: Request<{}, {}, AuthenticateDto>, res: Response) {
  const { email, password } = req.body;
  const user = await prisma.user.findFirst({ where: { email } });
  if (user) {
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (isPasswordCorrect) {
      const accessToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: 6000 });
      res.status(200).json({ accessToken });
    }
  }
  res.sendStatus(401);
}

export default { authenticate };