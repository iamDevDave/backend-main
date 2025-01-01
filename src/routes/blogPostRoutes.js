// src/routes/blogPostRoutes.js
import express from 'express';
import { createBlogPost, getBlogPosts } from '../controllers/blogPostController.js';
import { authenticate } from '../middlewares/authMiddleware.js';
import { authorize } from '../middlewares/authorizeMiddleware.js';
import upload from '../middlewares/uploadMiddleware.js';

const router = express.Router();

// Route to create a blog post (only admins allowed)
router.post('/create', authenticate, authorize, upload.array('images', 5), createBlogPost);

// Route to get all blog posts
router.get('/', getBlogPosts);

export default router;
