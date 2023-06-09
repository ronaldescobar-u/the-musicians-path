import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

async function verifyToken(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  const token = authorization?.split(' ')[1];
  if (token) {
    const { JWT_ACCESS_TOKEN_SECRET, JWT_REFRESH_TOKEN_SECRET } = process.env;
    const secret = req.path === '/refresh' ? JWT_REFRESH_TOKEN_SECRET : JWT_ACCESS_TOKEN_SECRET;
    const tokenVerified = jwt.verify(token, secret);
    if (tokenVerified) {
      res.locals.userId = tokenVerified.sub;
      return next();
    }
  }
  return res.sendStatus(401);
}

export default verifyToken;
