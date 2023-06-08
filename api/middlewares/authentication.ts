import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

async function verifyToken(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  const token = authorization?.split(' ')[1];
  if (token) {
    const tokenVerified = jwt.verify(token, process.env.JWT_SECRET);
    if (tokenVerified) {
      res.locals.user = tokenVerified.userId;
      return next();
    }
  }
  return res.sendStatus(401);
}

export default verifyToken;
