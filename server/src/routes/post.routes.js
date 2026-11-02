import { Router } from 'express';
import Post from '../models/Post.js';
import { protect } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = Router();
const populate = (query) => query.populate('author', 'name avatar').populate('comments.author', 'name avatar');

router.get('/', async (req, res, next) => {
  try {
    const { search, category, author } = req.query;
    const filter = {};
    if (search) filter.$text = { $search: search };
    if (category) filter.category = category;
    if (author) filter.author = author;
    const posts = await populate(Post.find(filter).sort({ createdAt: -1 }));
    res.json({ posts });
  } catch (error) { next(error); }
});

router.get('/:id', async (req, res, next) => {
  try {
    const post = await populate(Post.findById(req.params.id));
    if (!post) return res.status(404).json({ message: 'Post not found.' });
    res.json({ post });
  } catch (error) { next(error); }
});

router.post('/', protect, upload.single('coverImage'), async (req, res, next) => {
  try {
    const data = { ...req.body, author: req.user.id };
    if (req.file) data.coverImage = `/uploads/${req.file.filename}`;
    const post = await populate(Post.create(data));
    res.status(201).json({ post });
  } catch (error) { next(error); }
});

router.patch('/:id', protect, upload.single('coverImage'), async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found.' });
    if (post.author.toString() !== req.user.id) return res.status(403).json({ message: 'You can only edit your own posts.' });
    Object.assign(post, req.body);
    if (req.file) post.coverImage = `/uploads/${req.file.filename}`;
    await post.save();
    res.json({ post: await populate(Post.findById(post.id)) });
  } catch (error) { next(error); }
});

router.delete('/:id', protect, async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found.' });
    if (post.author.toString() !== req.user.id) return res.status(403).json({ message: 'You can only delete your own posts.' });
    await post.deleteOne();
    res.json({ message: 'Post deleted.' });
  } catch (error) { next(error); }
});

router.post('/:id/comments', protect, async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found.' });
    if (!req.body.body?.trim()) return res.status(400).json({ message: 'Comment cannot be empty.' });
    post.comments.push({ body: req.body.body.trim(), author: req.user.id });
    await post.save();
    res.status(201).json({ post: await populate(Post.findById(post.id)) });
  } catch (error) { next(error); }
});
export default router;
