import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';

const router = Router();
const issueToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
const sendAuth = (res, user, status = 200) => {
  res.cookie('token', issueToken(user.id), { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', maxAge: 7 * 24 * 60 * 60 * 1000 });
  res.status(status).json({ user: user.toJSON() });
};

router.post('/register', async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'Name, email, and password are required.' });
    if (await User.exists({ email })) return res.status(409).json({ message: 'An account with that email already exists.' });
    const user = await User.create({ name, email, password: await bcrypt.hash(password, 12) });
    sendAuth(res, user, 201);
  } catch (error) { next(error); }
});

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user || !(await bcrypt.compare(req.body.password || '', user.password))) return res.status(401).json({ message: 'Invalid email or password.' });
    sendAuth(res, user);
  } catch (error) { next(error); }
});

router.post('/logout', (_req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out successfully.' });
});

router.get('/me', protect, (req, res) => res.json({ user: req.user }));
export default router;
