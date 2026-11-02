import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../lib/api';
import { useAuth } from '../context/AuthContext';
import PostCard from '../components/PostCard';

export default function Profile() {
  const { user } = useAuth(); const [posts, setPosts] = useState([]); const [bio, setBio] = useState(user.bio); const [saved, setSaved] = useState(false);
  useEffect(() => { api.get(`/posts?author=${user._id}`).then(({ data }) => setPosts(data.posts)); }, [user._id]);
  const update = async (e) => { e.preventDefault(); const data = new FormData(); data.append('name', user.name); data.append('bio', bio); await api.patch('/users/me', data); setSaved(true); setTimeout(() => setSaved(false), 2000); };
  return <div><section className="flex flex-col justify-between gap-6 border-b border-slate-200 pb-10 sm:flex-row sm:items-end"><div><p className="text-sm font-bold uppercase tracking-widest text-coral">Your profile</p><h1 className="mt-3 font-display text-5xl">{user.name}</h1><p className="mt-3 max-w-xl text-slate-500">{user.bio}</p></div><Link className="btn-primary" to="/write">Write a story</Link></section><div className="mt-10 grid gap-10 lg:grid-cols-[.7fr_1.3fr]"><form onSubmit={update} className="h-fit rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100"><h2 className="font-display text-2xl">About you</h2><textarea className="field mt-5 min-h-32" value={bio} onChange={e => setBio(e.target.value)} /><button className="btn-secondary mt-4">{saved ? 'Saved!' : 'Save bio'}</button></form><section><h2 className="font-display text-3xl">My stories <span className="text-slate-400">({posts.length})</span></h2><div className="mt-5 grid gap-5">{posts.map(post => <PostCard key={post._id} post={post} />)}</div></section></div></div>;
}
