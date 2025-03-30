
# Hospital Jobs Portal

A full-stack application for hospital job listings and applications.

## Project Structure

- `/frontend` - React frontend with Vite
- `/backend` - Express backend with TypeScript and MySQL

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file based on `.env.example`:
   ```
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=hospital_jobs
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRE=1d
   ```

4. Run the database migrations (if provided) or set up your MySQL database manually using the schema in `src/db/schema.sql`

5. Start the development server:
   ```
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open your browser and go to `http://localhost:8080`

## Features

- User authentication (login/register)
- Job listings with filters
- Job application submission
- User profiles
- Admin dashboard
- Application tracking
- Feedback system

## Technologies Used

### Frontend
- React
- TypeScript
- Tailwind CSS
- React Query
- React Router
- Sonner (for toasts)

### Backend
- Express
- TypeScript
- MySQL
- JWT Authentication
