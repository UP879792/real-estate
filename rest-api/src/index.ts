import express from 'express';
import 'express-async-errors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import { json } from 'body-parser';
import { NotFoundError } from './common/errors/not-found-error';
import { errorHandler } from './common/middlewares/error-handler';

import { v1Routes } from './routes/v1';
import mongoose from 'mongoose';
import { Staff } from './models/v1/staff';

dotenv.config();
const app = express();

app.set('trust proxy', true);

// CORS configuration to allow requests from your Vercel frontend URL
app.use(cors({
  origin: 'https://real-estate-render-deploy-ed3qmbe1s.vercel.app', // Allow your Vercel frontend domain
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Security middleware
app.use(helmet());

// Parse incoming JSON requests
app.use(json());

// Serve static files from the 'public' directory
app.use(express.static('public'));

// API routes
app.use('/api/v1', v1Routes);

// Wildcard route to catch any undefined routes and respond with a message
app.get('*', (req, res) => {
  res.json({ message: 'API is running!' });
});

// Route to handle undefined API requests and throw a NotFoundError
app.all('*', async (req, res) => {
  throw new NotFoundError('Routes not found');
});

// Error handling middleware
app.use(errorHandler);

// MongoDB connection and server startup
const start = async () => {
  try {
    if (!process.env.JWT_KEY) throw new Error('JWT_KEY must be defined');
    if (!process.env.MONGODB_URI)
      throw new Error('MONGODB_URI must be defined');

    await mongoose.connect(process.env.MONGODB_URI);

    const existingAdmin = await Staff.findOne({
      role: 'Admin',
      type: 'Default',
    });

    if (!existingAdmin) {
      const defaultAdmin = Staff.build({
        firstName: 'Admin',
        lastName: 'Default',
        username: 'admin',
        password: '12345',
        gender: 'Neutral',
        address: 'Default address',
        phone: '080300000',
        type: 'Default',
        role: 'Admin',
      });
      await defaultAdmin.save();
    }

    // Start the server
    app.listen(8080, () => {
      console.log('Listening on port 8080');
    });
  } catch (err) {
    console.log(err);
  }
};

start();
