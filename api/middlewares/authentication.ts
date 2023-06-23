import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

async function verifyToken(req: Request, res: Response, next: NextFunction) {
  if (process.env.NODE_ENV === "test" || req.path === '/authentication') {
    return handleTest(res, next);
  }
  const { authorization } = req.headers;
  const token = authorization?.split(' ')[1];
  if (token) {
    const { JWT_ACCESS_TOKEN_SECRET, JWT_REFRESH_TOKEN_SECRET } = process.env;
    const secret = req.path === '/refresh' ? JWT_REFRESH_TOKEN_SECRET : JWT_ACCESS_TOKEN_SECRET;
    try {
      const tokenVerified = jwt.verify(token, secret);
      if (tokenVerified) {
        res.locals.userId = tokenVerified.sub;
        return next();
      }
    } catch (error) {
      return res.status(401).json({ message: error.message });
    }
  }
  return res.sendStatus(401);
}

const handleTest = (res: Response, next: NextFunction) => {
  res.locals.userId = 1;
  return next();
};

export default verifyToken;
