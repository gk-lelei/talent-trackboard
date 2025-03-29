
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/database');

// Register a new user
router.post('/register', async (req, res) => {
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

    if (existingUsers.length > 0) {
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

    const token = jwt.sign(
      { id: result.insertId, email, role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: result.insertId,
        name,
        email,
        role,
        profileComplete: false
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Login user
router.post('/login', async (req, res) => {
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

    if (users.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = users[0];

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Create and assign token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
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
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get current user (validate token)
router.get('/me', async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });
    
    try {
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      
      const connection = await pool.getConnection();
      
      // Get user data
      const [users] = await connection.execute(
        'SELECT id, name, email, role, profileComplete FROM users WHERE id = ?',
        [verified.id]
      );
      
      connection.release();
      
      if (users.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      const user = users[0];
      
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
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
