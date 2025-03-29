
# Hospital Jobs Backend

This is an Express.js backend for the Hospital Jobs application, providing API endpoints for job listings, applications, user profiles, and authentication.

## Setup Instructions

### Prerequisites

- Node.js (v14+ recommended)
- MySQL database server

### Installation

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=hospital_jobs
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRE=1d
   ```

3. Set up the database:
   - Create a MySQL database named `hospital_jobs`
   - Run the SQL script in `create-database.sql` to set up the schema and initial data

### Running the Server

Development mode with auto-restart on code changes:
```
npm run dev
```

Production mode:
```
npm start
```

## API Documentation

The API provides the following endpoints:

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user and get token
- `GET /api/auth/me` - Get current authenticated user

### Jobs

- `GET /api/jobs` - Get all active jobs (with optional filters)
- `GET /api/jobs/:id` - Get job details by ID
- `POST /api/jobs` - Create a new job (admin only)
- `PUT /api/jobs/:id` - Update an existing job (admin only)
- `DELETE /api/jobs/:id` - Delete a job (admin only)

### Applications

- `GET /api/applications/my` - Get user's applications
- `GET /api/applications/:id` - Get specific application details
- `POST /api/applications` - Apply for a job
- `GET /api/applications` - Get all applications (admin only)
- `PUT /api/applications/:id/status` - Update application status (admin only)
- `POST /api/applications/:id/feedback` - Add feedback to an application

### User Profile

- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `POST /api/users/experience` - Add work experience
- `PUT /api/users/experience/:id` - Update work experience
- `DELETE /api/users/experience/:id` - Delete work experience
- `POST /api/users/education` - Add education
- `PUT /api/users/education/:id` - Update education
- `DELETE /api/users/education/:id` - Delete education
- `GET /api/users` - Get all users (admin only)

## Default Admin User

The database is seeded with a default admin user:
- Email: admin@hospital.com
- Password: admin123
