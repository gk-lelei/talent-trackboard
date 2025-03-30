
# Hospital Jobs Backend

This is the Express backend for the Hospital Jobs application.

## Setup Instructions

1. Install dependencies:
   ```
   npm install
   ```

2. Create an .env file:
   ```
   cp .env.example .env
   ```

3. Update the .env file with your database credentials and JWT secret.

4. Create the database schema:
   ```
   mysql -u your_username -p < src/db/schema.sql
   ```

5. Seed the database with initial data:
   ```
   npm run seed
   ```

6. Start the development server:
   ```
   npm run dev
   ```

## API Endpoints

### Authentication
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login a user
- GET /api/auth/me - Get current user profile

### Jobs
- GET /api/jobs - Get all active job postings
- GET /api/jobs/:id - Get a specific job by ID
- POST /api/jobs - Create a new job (admin only)
- PUT /api/jobs/:id - Update a job (admin only)
- DELETE /api/jobs/:id - Delete a job (admin only)

### Applications
- GET /api/applications/my - Get current user's applications
- GET /api/applications/:id - Get a specific application by ID
- POST /api/applications - Apply for a job
- GET /api/applications - Get all applications (admin only)
- PUT /api/applications/:id/status - Update application status (admin only)
- POST /api/applications/:id/feedback - Add feedback to an application

### Users
- GET /api/users/profile - Get user profile
- PUT /api/users/profile - Update user profile
- GET /api/users - Get all users (admin only)

## Default Users

- Admin: admin@example.com / admin123
- User: user@example.com / user123
