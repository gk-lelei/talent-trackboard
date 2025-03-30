
import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../config/database';
import { CustomRequest, User, DecodedToken } from '../types';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

// Register a new user
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { name, email, password, role = 'user' } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const connection = await pool.getConnection();
    
    // Check if user already exists
    const [existingUsers] = await connection.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if ((existingUsers as any[]).length > 0) {
      connection.release();
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const [result] = await connection.execute(
      'INSERT INTO users (name, email, password, role, profileComplete) VALUES (?, ?, ?, ?, ?)',
      [name, email, hashedPassword, role, false]
    );

    connection.release();
    const insertId = (result as any).insertId;

    const token = jwt.sign(
      { id: insertId, email, role },
      process.env.JWT_SECRET!,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: insertId,
        name,
        email,
        role,
        profileComplete: false
      }
    });
  } catch (error: any) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Login user
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    const connection = await pool.getConnection();
    
    // Find user by email
    const [users] = await connection.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    connection.release();
    const usersArray = users as any[];

    if (usersArray.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = usersArray[0];

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Create and assign token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        profileComplete: Boolean(user.profileComplete)
      }
    });
  } catch (error: any) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get current user (validate token)
router.get('/me', async (req: CustomRequest, res: Response) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });
    
    try {
      const verified = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
      
      const connection = await pool.getConnection();
      
      // Get user data
      const [users] = await connection.execute(
        'SELECT id, name, email, role, profileComplete FROM users WHERE id = ?',
        [verified.id]
      );
      
      connection.release();
      const usersArray = users as any[];
      
      if (usersArray.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      const user = usersArray[0];
      
      res.status(200).json({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          profileComplete: Boolean(user.profileComplete)
        }
      });
    } catch (error) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
  } catch (error: any) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
