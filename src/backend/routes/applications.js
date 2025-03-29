
const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const authenticateToken = require('../middleware/authenticateToken');

// Get user applications
router.get('/my', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const connection = await pool.getConnection();
    
    const [applications] = await connection.execute(
      `SELECT a.*, j.title, j.company, j.location, j.department, j.type
       FROM applications a
       JOIN job_postings j ON a.jobId = j.id
       WHERE a.userId = ?
       ORDER BY a.appliedDate DESC`,
      [userId]
    );
    
    // Get feedback for each application
    for (let app of applications) {
      const [feedback] = await connection.execute(
        'SELECT * FROM feedback WHERE applicationId = ? ORDER BY createdAt',
        [app.id]
      );
      app.feedback = feedback;
    }
    
    connection.release();
    
    res.status(200).json({ applications });
  } catch (error) {
    console.error('Get applications error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get specific application by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const isAdmin = req.user.role === 'admin';
    
    const connection = await pool.getConnection();
    
    // Get application with job details
    const [applications] = await connection.execute(
      `SELECT a.*, j.title, j.company, j.location, j.department, j.type
       FROM applications a
       JOIN job_postings j ON a.jobId = j.id
       WHERE a.id = ? ${isAdmin ? '' : 'AND a.userId = ?'}`,
      isAdmin ? [id] : [id, userId]
    );
    
    if (applications.length === 0) {
      connection.release();
      return res.status(404).json({ message: 'Application not found' });
    }
    
    const application = applications[0];
    
    // Get feedback for this application
    const [feedback] = await connection.execute(
      'SELECT * FROM feedback WHERE applicationId = ? ORDER BY createdAt',
      [id]
    );
    
    application.feedback = feedback;
    
    connection.release();
    
    res.status(200).json({ application });
  } catch (error) {
    console.error('Get application error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Apply for a job
router.post('/', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      jobId,
      resumeUrl,
      coverLetterUrl
    } = req.body;
    
    if (!jobId) {
      return res.status(400).json({ message: 'Job ID is required' });
    }
    
    const connection = await pool.getConnection();
    
    // Check if job exists and is active
    const [jobs] = await connection.execute(
      'SELECT * FROM job_postings WHERE id = ? AND status = "active"',
      [jobId]
    );
    
    if (jobs.length === 0) {
      connection.release();
      return res.status(404).json({ message: 'Job not found or not active' });
    }
    
    // Check if user has already applied for this job
    const [existingApplications] = await connection.execute(
      'SELECT * FROM applications WHERE userId = ? AND jobId = ?',
      [userId, jobId]
    );
    
    if (existingApplications.length > 0) {
      connection.release();
      return res.status(400).json({ message: 'You have already applied for this job' });
    }
    
    // Insert application
    const [result] = await connection.execute(
      `INSERT INTO applications 
       (jobId, userId, status, appliedDate, resumeUrl, coverLetterUrl) 
       VALUES (?, ?, 'applied', NOW(), ?, ?)`,
      [jobId, userId, resumeUrl || null, coverLetterUrl || null]
    );
    
    connection.release();
    
    res.status(201).json({ 
      message: 'Application submitted successfully', 
      applicationId: result.insertId 
    });
  } catch (error) {
    console.error('Apply for job error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Admin: Get all applications
router.get('/', authenticateToken, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }
    
    const connection = await pool.getConnection();
    
    const [applications] = await connection.execute(
      `SELECT a.*, j.title, j.company, j.department, u.name as applicantName, u.email as applicantEmail
       FROM applications a
       JOIN job_postings j ON a.jobId = j.id
       JOIN users u ON a.userId = u.id
       ORDER BY a.appliedDate DESC`
    );
    
    connection.release();
    
    res.status(200).json({ applications });
  } catch (error) {
    console.error('Get all applications error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Admin: Update application status
router.put('/:id/status', authenticateToken, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }
    
    const { id } = req.params;
    const { status } = req.body;
    
    const validStatuses = ['applied', 'screening', 'interview', 'technical', 'offered', 'rejected', 'withdrawn'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    
    const connection = await pool.getConnection();
    
    await connection.execute(
      'UPDATE applications SET status = ? WHERE id = ?',
      [status, id]
    );
    
    connection.release();
    
    res.status(200).json({ message: 'Application status updated' });
  } catch (error) {
    console.error('Update application status error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Add feedback to application
router.post('/:id/feedback', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { message } = req.body;
    const userId = req.user.id;
    const isAdmin = req.user.role === 'admin';
    
    if (!message) {
      return res.status(400).json({ message: 'Feedback message is required' });
    }
    
    const connection = await pool.getConnection();
    
    // Check if application exists and user has access to it
    const [applications] = await connection.execute(
      'SELECT * FROM applications WHERE id = ? ' + (isAdmin ? '' : 'AND userId = ?'),
      isAdmin ? [id] : [id, userId]
    );
    
    if (applications.length === 0) {
      connection.release();
      return res.status(404).json({ message: 'Application not found' });
    }
    
    // Add feedback
    const [result] = await connection.execute(
      'INSERT INTO feedback (applicationId, message, createdAt, fromAdmin) VALUES (?, ?, NOW(), ?)',
      [id, message, isAdmin]
    );
    
    connection.release();
    
    res.status(201).json({ 
      message: 'Feedback added successfully',
      feedbackId: result.insertId
    });
  } catch (error) {
    console.error('Add feedback error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
