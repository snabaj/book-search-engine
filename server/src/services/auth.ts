import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';

import dotenv from 'dotenv';
dotenv.config();

interface JwtPayload {
  _id: unknown;
  username: string;
  email: string,
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new GraphQLError('Authorization token is requried', {
      extensions: {
        code: 'UNAUTHENTICATED',
      },
    });
  }

    const token = authHeader.split(' ')[1];

    const secretKey = process.env.JWT_SECRET_KEY || '';

    try {
    const decoded = jwt.verify(token, secretKey) as JwtPayload;
    (req as any).user = decoded;
     next();
  } catch (error) {
    throw new GraphQLError('Invalid token', {
      extensions: {
        code: 'UNAUTHENTICATED',
      },
    });
  }
}

export const signToken = (username: string, email: string, _id: unknown) => {
  const payload = { username, email, _id };
  const secretKey = process.env.JWT_SECRET_KEY || '';

  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
};
