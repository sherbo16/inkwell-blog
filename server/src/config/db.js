import mongoose from 'mongoose';

export default function connectDB() {
  if (!process.env.MONGO_URI) throw new Error('MONGO_URI is not configured.');
  return mongoose.connect(process.env.MONGO_URI);
}
