
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { CustomRequest, DecodedToken } from '../types';

dotenv.config();

const authenticateToken = (req: CustomRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    res.status(401).json({ message: 'Access denied. No token provided.' });
    return;
  }
  
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
    req.user = verified;
    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid or expired token' });
  }
};

export default authenticateToken;
