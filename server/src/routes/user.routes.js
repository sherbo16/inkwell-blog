import { Router } from 'express';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = Router();
router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found.' });
    res.json({ user });
  } catch (error) { next(error); }
});

router.patch('/me', protect, upload.single('avatar'), async (req, res, next) => {
  try {
    const updates = { name: req.body.name, bio: req.body.bio };
    if (req.file) updates.avatar = `/uploads/${req.file.filename}`;
    const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true, runValidators: true }).select('-password');
    res.json({ user });
  } catch (error) { next(error); }
});
export default router;
