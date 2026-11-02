import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Auth from './pages/Auth';
import PostDetails from './pages/PostDetails';
import Editor from './pages/Editor';
import Profile from './pages/Profile';

export default function App() {
  return <BrowserRouter><AuthProvider><Routes><Route element={<Layout />}><Route index element={<Home />} /><Route path="login" element={<Auth />} /><Route path="register" element={<Auth mode="register" />} /><Route path="posts/:id" element={<PostDetails />} /><Route element={<ProtectedRoute />}><Route path="write" element={<Editor />} /><Route path="edit/:id" element={<Editor />} /><Route path="profile" element={<Profile />} /></Route></Route></Routes></AuthProvider></BrowserRouter>;
}
