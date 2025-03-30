
import bcrypt from 'bcryptjs';
import pool from '../config/database';

const seedDatabase = async () => {
  try {
    console.log('Starting database seeding...');
    const connection = await pool.getConnection();

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await connection.execute(
      'INSERT INTO users (name, email, password, role, profileComplete) VALUES (?, ?, ?, ?, ?)',
      ['Admin User', 'admin@example.com', hashedPassword, 'admin', true]
    );
    console.log('Admin user created');

    // Create regular user
    const userHashedPassword = await bcrypt.hash('user123', 10);
    await connection.execute(
      'INSERT INTO users (name, email, password, role, profileComplete) VALUES (?, ?, ?, ?, ?)',
      ['Test User', 'user@example.com', userHashedPassword, 'user', false]
    );
    console.log('Regular user created');

    // Create sample job postings
    await connection.execute(
      `INSERT INTO job_postings 
       (title, company, location, department, type, experience, description, requirements, responsibilities, salary, posted, deadline, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), DATE_ADD(NOW(), INTERVAL 30 DAY), ?)`,
      [
        'Senior Registered Nurse',
        'Metropolitan Medical Center',
        'Chicago, IL',
        'Nursing',
        'Full-time',
        '3+ years',
        'We\'re seeking an experienced Registered Nurse to join our Emergency Department team. The ideal candidate will have strong clinical skills and a passion for patient care in fast-paced environments.',
        JSON.stringify([
          'BSN degree required, MSN preferred',
          'Current RN license in the state of Illinois',
          'BLS and ACLS certifications',
          '3+ years of experience in emergency/critical care'
        ]),
        JSON.stringify([
          'Provide direct patient care and assessments',
          'Administer medications and treatments as prescribed',
          'Collaborate with interdisciplinary healthcare team',
          'Document patient care accurately and thoroughly'
        ]),
        '$75,000 - $95,000',
        'active'
      ]
    );
    console.log('Sample job posting created');

    connection.release();
    console.log('Database seeding completed successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    process.exit();
  }
};

seedDatabase();
