// src/controllers/blogPostController.js
import BlogPost from '../models/BlogPost.js';

export const createBlogPost = async (req, res) => {
    try {
        const { title, content, tags } = req.body;
        const author = req.user._id;  // Author will be the logged-in user

        // If images were uploaded, store their paths
        const imagePaths = req.files ? req.files.map(file => file.path) : [];

        // Create the new blog post
        const newBlogPost = new BlogPost({
            title,
            content,
            author,
            tags: tags ? tags.split(',') : [],
            images: imagePaths
        }); 

        // Save the blog post to the database
        await newBlogPost.save();

        res.status(201).json({ message: 'Blog post created successfully', newBlogPost });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating blog post' });
    }
};

export const getBlogPosts = async (req, res) => {
    try {
        const blogPosts = await BlogPost.find().populate('author', 'name email');
        res.status(200).json(blogPosts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching blog posts' });
    }
};
