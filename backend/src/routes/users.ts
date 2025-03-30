
import express, { Response } from 'express';
import pool from '../config/database';
import authenticateToken from '../middleware/authenticateToken';
import { CustomRequest, ProfileData, WorkExperience, Education } from '../types';

const router = express.Router();

// Get user profile
router.get('/profile', authenticateToken, async (req: CustomRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const connection = await pool.getConnection();
    
    // Get user basic info
    const [users] = await connection.execute(
      'SELECT id, name, email, role, profileComplete FROM users WHERE id = ?',
      [userId]
    );
    
    if ((users as any[]).length === 0) {
      connection.release();
      return res.status(404).json({ message: 'User not found' });
    }
    
    const user = (users as any[])[0];
    
    // Get profile data if it exists
    const [profiles] = await connection.execute(
      'SELECT * FROM profiles WHERE userId = ?',
      [userId]
    );
    
    let profileData = null;
    if ((profiles as any[]).length > 0) {
      profileData = (profiles as any[])[0];
      
      // Get experience
      const [experience] = await connection.execute(
        'SELECT * FROM work_experience WHERE userId = ? ORDER BY startDate DESC',
        [userId]
      );
      
      // Get education
      const [education] = await connection.execute(
        'SELECT * FROM education WHERE userId = ? ORDER BY startDate DESC',
        [userId]
      );
      
      profileData.experience = experience;
      profileData.education = education;
      
      // Parse skills from string to array
      if (profileData.skills) {
        profileData.skills = JSON.parse(profileData.skills);
      }
    }
    
    connection.release();
    
    res.status(200).json({
      user,
      profile: profileData
    });
  } catch (error: any) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update user profile
router.put('/profile', authenticateToken, async (req: CustomRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const {
      firstName,
      lastName,
      phone,
      location,
      bio,
      skills
    } = req.body as ProfileData;
    
    if (!firstName || !lastName) {
      return res.status(400).json({ message: 'First name and last name are required' });
    }
    
    const connection = await pool.getConnection();
    
    // Check if profile exists
    const [profiles] = await connection.execute(
      'SELECT * FROM profiles WHERE userId = ?',
      [userId]
    );
    
    const skillsString = skills ? JSON.stringify(skills) : null;
    
    if ((profiles as any[]).length === 0) {
      // Create new profile
      await connection.execute(
        `INSERT INTO profiles
         (userId, firstName, lastName, phone, location, bio, skills)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [userId, firstName, lastName, phone || null, location || null, bio || null, skillsString]
      );
    } else {
      // Update existing profile
      await connection.execute(
        `UPDATE profiles SET
         firstName = ?,
         lastName = ?,
         phone = ?,
         location = ?,
         bio = ?,
         skills = ?
         WHERE userId = ?`,
        [firstName, lastName, phone || null, location || null, bio || null, skillsString, userId]
      );
    }
    
    // Update user name (concatenated first and last name)
    await connection.execute(
      'UPDATE users SET name = ?, profileComplete = true WHERE id = ?',
      [`${firstName} ${lastName}`, userId]
    );
    
    connection.release();
    
    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error: any) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Add work experience
router.post('/experience', authenticateToken, async (req: CustomRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const {
      company,
      position,
      startDate,
      endDate,
      current,
      description
    } = req.body as WorkExperience;
    
    if (!company || !position || !startDate) {
      return res.status(400).json({ message: 'Company, position and start date are required' });
    }
    
    const connection = await pool.getConnection();
    
    const [result] = await connection.execute(
      `INSERT INTO work_experience
       (userId, company, position, startDate, endDate, current, description)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [userId, company, position, startDate, endDate || null, Boolean(current), description || null]
    );
    
    connection.release();
    
    res.status(201).json({
      message: 'Experience added successfully',
      experienceId: (result as any).insertId
    });
  } catch (error: any) {
    console.error('Add experience error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update work experience
router.put('/experience/:id', authenticateToken, async (req: CustomRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;
    const {
      company,
      position,
      startDate,
      endDate,
      current,
      description
    } = req.body as WorkExperience;
    
    const connection = await pool.getConnection();
    
    // Make sure this experience belongs to the user
    const [experiences] = await connection.execute(
      'SELECT * FROM work_experience WHERE id = ? AND userId = ?',
      [id, userId]
    );
    
    if ((experiences as any[]).length === 0) {
      connection.release();
      return res.status(404).json({ message: 'Experience not found' });
    }
    
    await connection.execute(
      `UPDATE work_experience SET
       company = ?,
       position = ?,
       startDate = ?,
       endDate = ?,
       current = ?,
       description = ?
       WHERE id = ? AND userId = ?`,
      [company, position, startDate, endDate || null, Boolean(current), description || null, id, userId]
    );
    
    connection.release();
    
    res.status(200).json({ message: 'Experience updated successfully' });
  } catch (error: any) {
    console.error('Update experience error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete work experience
router.delete('/experience/:id', authenticateToken, async (req: CustomRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;
    
    const connection = await pool.getConnection();
    
    await connection.execute(
      'DELETE FROM work_experience WHERE id = ? AND userId = ?',
      [id, userId]
    );
    
    connection.release();
    
    res.status(200).json({ message: 'Experience deleted successfully' });
  } catch (error: any) {
    console.error('Delete experience error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Add education
router.post('/education', authenticateToken, async (req: CustomRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const {
      institution,
      degree,
      field,
      startDate,
      endDate,
      current
    } = req.body as Education;
    
    if (!institution || !degree || !field || !startDate) {
      return res.status(400).json({ message: 'Institution, degree, field and start date are required' });
    }
    
    const connection = await pool.getConnection();
    
    const [result] = await connection.execute(
      `INSERT INTO education
       (userId, institution, degree, field, startDate, endDate, current)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [userId, institution, degree, field, startDate, endDate || null, Boolean(current)]
    );
    
    connection.release();
    
    res.status(201).json({
      message: 'Education added successfully',
      educationId: (result as any).insertId
    });
  } catch (error: any) {
    console.error('Add education error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update education
router.put('/education/:id', authenticateToken, async (req: CustomRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;
    const {
      institution,
      degree,
      field,
      startDate,
      endDate,
      current
    } = req.body as Education;
    
    const connection = await pool.getConnection();
    
    // Make sure this education entry belongs to the user
    const [educations] = await connection.execute(
      'SELECT * FROM education WHERE id = ? AND userId = ?',
      [id, userId]
    );
    
    if ((educations as any[]).length === 0) {
      connection.release();
      return res.status(404).json({ message: 'Education not found' });
    }
    
    await connection.execute(
      `UPDATE education SET
       institution = ?,
       degree = ?,
       field = ?,
       startDate = ?,
       endDate = ?,
       current = ?
       WHERE id = ? AND userId = ?`,
      [institution, degree, field, startDate, endDate || null, Boolean(current), id, userId]
    );
    
    connection.release();
    
    res.status(200).json({ message: 'Education updated successfully' });
  } catch (error: any) {
    console.error('Update education error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete education
router.delete('/education/:id', authenticateToken, async (req: CustomRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;
    
    const connection = await pool.getConnection();
    
    await connection.execute(
      'DELETE FROM education WHERE id = ? AND userId = ?',
      [id, userId]
    );
    
    connection.release();
    
    res.status(200).json({ message: 'Education deleted successfully' });
  } catch (error: any) {
    console.error('Delete education error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Admin: Get all users
router.get('/', authenticateToken, async (req: CustomRequest, res: Response) => {
  try {
    // Check if user is admin
    if (req.user?.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }
    
    const connection = await pool.getConnection();
    
    const [users] = await connection.execute(
      'SELECT id, name, email, role, profileComplete FROM users'
    );
    
    connection.release();
    
    res.status(200).json({ users });
  } catch (error: any) {
    console.error('Get all users error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
