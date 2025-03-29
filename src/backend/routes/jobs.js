
const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const authenticateToken = require('../middleware/authenticateToken');

// Get all jobs (public)
router.get('/', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    
    let query = `
      SELECT * FROM job_postings 
      WHERE status = 'active'
    `;
    
    // Handle search filtering
    const { search, location, department, jobType } = req.query;
    const params = [];
    
    if (search) {
      query += ` AND (title LIKE ? OR company LIKE ? OR description LIKE ?)`;
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm, searchTerm);
    }
    
    if (location && location !== 'all-locations') {
      query += ` AND location LIKE ?`;
      params.push(`%${location}%`);
    }
    
    if (department && department !== 'all-departments') {
      query += ` AND department = ?`;
      params.push(department);
    }
    
    if (jobType && jobType !== 'all-types') {
      query += ` AND type = ?`;
      params.push(jobType);
    }
    
    query += ` ORDER BY posted DESC`;
    
    const [jobs] = await connection.execute(query, params);
    connection.release();
    
    res.status(200).json({ jobs });
  } catch (error) {
    console.error('Get jobs error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get job by ID (public)
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();
    
    const [jobs] = await connection.execute(
      'SELECT * FROM job_postings WHERE id = ?',
      [id]
    );
    
    connection.release();
    
    if (jobs.length === 0) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    // Parse the array fields from string to actual arrays
    const job = jobs[0];
    job.requirements = JSON.parse(job.requirements || '[]');
    job.responsibilities = JSON.parse(job.responsibilities || '[]');
    
    res.status(200).json({ job });
  } catch (error) {
    console.error('Get job error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Admin: Create a new job
router.post('/', authenticateToken, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }

    const {
      title,
      company,
      location,
      department,
      type,
      experience,
      description,
      requirements,
      responsibilities,
      salary,
      deadline,
      status = 'active'
    } = req.body;

    // Validate required fields
    if (!title || !company || !location || !department || !type || !description) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const connection = await pool.getConnection();
    
    // Insert job
    const [result] = await connection.execute(
      `INSERT INTO job_postings 
       (title, company, location, department, type, experience, description, requirements, responsibilities, salary, posted, deadline, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?, ?)`,
      [
        title, 
        company, 
        location, 
        department, 
        type, 
        experience,
        description,
        JSON.stringify(requirements || []),
        JSON.stringify(responsibilities || []),
        salary || null,
        deadline || null,
        status
      ]
    );
    
    connection.release();
    
    res.status(201).json({ 
      message: 'Job created successfully', 
      jobId: result.insertId
    });
  } catch (error) {
    console.error('Create job error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Admin: Update a job
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }

    const { id } = req.params;
    const {
      title,
      company,
      location,
      department,
      type,
      experience,
      description,
      requirements,
      responsibilities,
      salary,
      deadline,
      status
    } = req.body;

    const connection = await pool.getConnection();
    
    // Update job
    await connection.execute(
      `UPDATE job_postings SET
        title = ?,
        company = ?,
        location = ?,
        department = ?,
        type = ?,
        experience = ?,
        description = ?,
        requirements = ?,
        responsibilities = ?,
        salary = ?,
        deadline = ?,
        status = ?
      WHERE id = ?`,
      [
        title, 
        company, 
        location, 
        department, 
        type, 
        experience,
        description,
        JSON.stringify(requirements || []),
        JSON.stringify(responsibilities || []),
        salary || null,
        deadline || null,
        status,
        id
      ]
    );
    
    connection.release();
    
    res.status(200).json({ message: 'Job updated successfully' });
  } catch (error) {
    console.error('Update job error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Admin: Delete a job
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }

    const { id } = req.params;
    const connection = await pool.getConnection();
    
    await connection.execute('DELETE FROM job_postings WHERE id = ?', [id]);
    connection.release();
    
    res.status(200).json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.error('Delete job error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
