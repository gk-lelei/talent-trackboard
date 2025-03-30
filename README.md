
# Talent Trackboard

A comprehensive job board and application tracking system for healthcare professionals.

## Project Structure

The project is organized into two main directories:
- `frontend`: Contains the React application
- `backend`: Contains the Node.js/Express API server

## Setup Instructions

### Prerequisites

- Node.js (v14 or newer)
- MySQL (v8.0 or newer)

### Database Setup

1. Create a MySQL database:

```sql
CREATE DATABASE south_rift;
```

2. Import the schema:

```bash
mysql -u root -p south_rift < backend/src/db/schema.sql
```

### Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment:
   - Copy `.env.example` to `.env`
   - Update the values in `.env` with your database credentials:

```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=%40Gkl11252
DB_NAME=south_rift
JWT_SECRET=0orq0tZEED3IOU6L7DCxGYXCUYSw7SUT
JWT_EXPIRE=1d
```

4. Start the backend server:

```bash
npm run dev
```

The backend server will run on port 5000 by default.

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The frontend development server will run on port 8080 and will proxy API requests to the backend.

## Features

- **User Authentication**: Secure login and registration
- **Job Listings**: Browse and search available jobs
- **Application Management**: Track application status
- **Admin Dashboard**: Manage jobs and applications
- **Responsive Design**: Works on desktop and mobile devices

## Technologies Used

### Frontend

- React
- TypeScript
- React Router
- Tanstack Query
- Tailwind CSS
- Shadcn UI
- Sonner (for toast notifications)
- Axios

### Backend

- Node.js
- Express
- MySQL
- JSON Web Tokens (JWT)
- BCrypt

## Default Admin Login

- Email: admin@hospital.com
- Password: admin123
