
CREATE DATABASE IF NOT EXISTS hospital_jobs;

USE hospital_jobs;

-- Users Table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('user', 'admin') DEFAULT 'user',
  profileComplete BOOLEAN DEFAULT FALSE,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Job Postings Table
CREATE TABLE IF NOT EXISTS job_postings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  company VARCHAR(100) NOT NULL,
  location VARCHAR(100) NOT NULL,
  department VARCHAR(100) NOT NULL,
  type ENUM('Full-time', 'Part-time', 'Contract', 'Internship', 'Remote') NOT NULL,
  experience VARCHAR(50),
  description TEXT NOT NULL,
  requirements JSON,
  responsibilities JSON,
  salary VARCHAR(50),
  posted TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deadline TIMESTAMP NULL,
  status ENUM('active', 'closed', 'archived') DEFAULT 'active'
);

-- Applications Table
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

-- Feedback Table
CREATE TABLE IF NOT EXISTS feedback (
  id INT AUTO_INCREMENT PRIMARY KEY,
  applicationId INT NOT NULL,
  message TEXT NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  fromAdmin BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (applicationId) REFERENCES applications(id) ON DELETE CASCADE
);

-- User Profiles Table
CREATE TABLE IF NOT EXISTS user_profiles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT NOT NULL UNIQUE,
  firstName VARCHAR(50) NOT NULL,
  lastName VARCHAR(50) NOT NULL,
  phone VARCHAR(20),
  location VARCHAR(100),
  bio TEXT,
  skills JSON,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

-- Work Experience Table
CREATE TABLE IF NOT EXISTS work_experiences (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT NOT NULL,
  company VARCHAR(100) NOT NULL,
  position VARCHAR(100) NOT NULL,
  startDate DATE NOT NULL,
  endDate DATE,
  current BOOLEAN DEFAULT FALSE,
  description TEXT,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

-- Education Table
CREATE TABLE IF NOT EXISTS educations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT NOT NULL,
  institution VARCHAR(100) NOT NULL,
  degree VARCHAR(100) NOT NULL,
  field VARCHAR(100) NOT NULL,
  startDate DATE NOT NULL,
  endDate DATE,
  current BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);
