
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import jobsRoutes from './routes/jobs';
import applicationsRoutes from './routes/applications';
import usersRoutes from './routes/users';
import authenticateToken from './middleware/authenticateToken';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobsRoutes);
app.use('/api/applications', authenticateToken, applicationsRoutes);
app.use('/api/users', authenticateToken, usersRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Hospital Jobs API Server Running');
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default server;
