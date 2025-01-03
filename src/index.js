import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import blogPostRoutes from './routes/blogPostRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { errorHandler } from './utils/errorHandler.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
// Load environment variables
dotenv.config();

const app = express();

// Use path module to resolve the uploads folder
app.use('/uploads', express.static(path.join(path.resolve(), 'uploads')));

// Middleware to parse incoming request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Manually construct __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware to serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Enable CORS
app.use(cors({
    origin: process.env.CORS_ORIGIN, // Use the CORS_ORIGIN environment variable
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    credentials: true, // Allow cookies and authorization headers
}));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/blogposts', blogPostRoutes);

// Global error handler
app.use(errorHandler);

// Database connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Database connected');
        app.listen(process.env.PORT || 5000, () => {
            console.log(`Server is running on port ${process.env.PORT || 5000}`);
        });
    })
    .catch(err => {
        console.error('Database connection error:', err);
    });
