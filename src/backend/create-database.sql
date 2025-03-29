
-- SQL script to create the database schema

-- Create database
CREATE DATABASE IF NOT EXISTS hospital_jobs;
USE hospital_jobs;

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('user', 'admin') DEFAULT 'user',
  profileComplete BOOLEAN DEFAULT FALSE,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Job postings table
CREATE TABLE IF NOT EXISTS job_postings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  company VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  department VARCHAR(255) NOT NULL,
  type ENUM('Full-time', 'Part-time', 'Contract', 'Internship', 'Remote') NOT NULL,
  experience VARCHAR(255),
  description TEXT NOT NULL,
  requirements JSON,
  responsibilities JSON,
  salary VARCHAR(255),
  posted TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deadline TIMESTAMP NULL DEFAULT NULL,
  status ENUM('active', 'closed', 'archived') DEFAULT 'active'
);

-- Applications table
CREATE TABLE IF NOT EXISTS applications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  jobId INT NOT NULL,
  userId INT NOT NULL,
  status ENUM('applied', 'screening', 'interview', 'technical', 'offered', 'rejected', 'withdrawn') DEFAULT 'applied',
  appliedDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  resumeUrl VARCHAR(255),
  coverLetterUrl VARCHAR(255),
  FOREIGN KEY (jobId) REFERENCES job_postings(id) ON DELETE CASCADE,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

-- Feedback table
CREATE TABLE IF NOT EXISTS feedback (
  id INT AUTO_INCREMENT PRIMARY KEY,
  applicationId INT NOT NULL,
  message TEXT NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  fromAdmin BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (applicationId) REFERENCES applications(id) ON DELETE CASCADE
);

-- User profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT NOT NULL UNIQUE,
  firstName VARCHAR(255) NOT NULL,
  lastName VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  location VARCHAR(255),
  bio TEXT,
  skills JSON,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

-- Work experience table
CREATE TABLE IF NOT EXISTS work_experience (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT NOT NULL,
  company VARCHAR(255) NOT NULL,
  position VARCHAR(255) NOT NULL,
  startDate DATE NOT NULL,
  endDate DATE,
  current BOOLEAN DEFAULT FALSE,
  description TEXT,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

-- Education table
CREATE TABLE IF NOT EXISTS education (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT NOT NULL,
  institution VARCHAR(255) NOT NULL,
  degree VARCHAR(255) NOT NULL,
  field VARCHAR(255) NOT NULL,
  startDate DATE NOT NULL,
  endDate DATE,
  current BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

-- Insert admin user
INSERT INTO users (name, email, password, role, profileComplete)
VALUES ('Admin User', 'admin@hospital.com', '$2a$10$MJEm1WQMX42nK9TqwhkUF.kx6Z2VKvuXKLCYVrUQVv2gd2k86XrB.', 'admin', TRUE);
-- Password is 'admin123' (hashed with bcrypt)

-- Insert sample job postings
INSERT INTO job_postings (title, company, location, department, type, experience, description, requirements, responsibilities, salary, posted, status)
VALUES 
('Registered Nurse - ICU', 'Metropolitan Medical Center', 'Chicago, IL', 'nursing', 'Full-time', '2+ years', 'We are seeking experienced Registered Nurses for our Intensive Care Unit.', 
'["BSN degree required", "Current state RN license", "BLS and ACLS certifications", "2+ years ICU experience"]', 
'["Provide direct patient care", "Monitor and assess patient conditions", "Administer medications", "Collaborate with healthcare team"]', 
'$75,000 - $95,000', DATE_SUB(NOW(), INTERVAL 5 DAY), 'active'),

('Pharmacist', 'Metropolitan Medical Center', 'Chicago, IL', 'pharmacy', 'Full-time', '3+ years', 'Join our pharmacy team at Metropolitan Medical Center.', 
'["Doctor of Pharmacy degree", "Current Pharmacist license", "3+ years hospital pharmacy experience", "Experience with EMR systems"]', 
'["Prepare and dispense medications", "Review medication orders", "Counsel patients on medication use", "Ensure compliance with regulations"]', 
'$110,000 - $130,000', DATE_SUB(NOW(), INTERVAL 10 DAY), 'active'),

('Physical Therapist', 'Metropolitan Medical Center', 'Remote', 'rehabilitation', 'Part-time', '1+ years', 'Physical Therapist needed for outpatient rehabilitation services.', 
'["DPT degree required", "Current PT license", "1+ year experience", "Strong interpersonal skills"]', 
'["Evaluate patients and develop treatment plans", "Provide therapeutic interventions", "Document patient progress", "Educate patients on home exercise programs"]', 
'$40 - $50 per hour', DATE_SUB(NOW(), INTERVAL 15 DAY), 'active'),

('Medical Laboratory Technician', 'Metropolitan Medical Center', 'New York, NY', 'laboratory', 'Full-time', '0-1 years', 'Entry-level position for Medical Laboratory Technician.', 
'["Associate\'s degree in Medical Laboratory Science", "MLT certification", "Knowledge of laboratory procedures", "Attention to detail"]', 
'["Process laboratory specimens", "Perform laboratory tests", "Maintain laboratory equipment", "Record test results"]', 
'$50,000 - $60,000', DATE_SUB(NOW(), INTERVAL 7 DAY), 'active');
