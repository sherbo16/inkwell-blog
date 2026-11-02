import { useEffect, useState } from 'react';
import { FiArrowRight, FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import api from '../lib/api';
import PostCard from '../components/PostCard';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState('');
  const [search, setSearch] = useState('');
  useEffect(() => { api.get(`/posts${search ? `?search=${encodeURIComponent(search)}` : ''}`).then(({ data }) => setPosts(data.posts)).catch(console.error); }, [search]);
  return <div><section className="grid items-center gap-10 py-10 md:grid-cols-[1.1fr_.9fr] md:py-20"><div><p className="mb-5 text-sm font-bold uppercase tracking-[.25em] text-coral">A home for your thoughts</p><h1 className="max-w-3xl font-display text-6xl leading-[.95] sm:text-8xl">Stories that <em className="text-coral">stay</em> with you.</h1><p className="mt-8 max-w-lg text-lg leading-8 text-slate-500">Inkwell is a quiet corner of the internet for essays, ideas, and the little observations that make life interesting.</p><Link className="btn-primary mt-8 inline-flex" to="/register">Start writing <FiArrowRight /></Link></div><div className="relative hidden md:block"><div className="absolute -inset-4 rotate-3 rounded-[2rem] bg-coral/10" /><img className="relative h-[27rem] w-full rounded-[2rem] object-cover" src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1000&q=85" alt="Notebook and coffee" /></div></section>
    <section className="border-t border-slate-200 pt-10"><div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="text-sm font-bold uppercase tracking-widest text-coral">Fresh from the community</p><h2 className="mt-2 font-display text-4xl">Latest stories</h2></div><form onSubmit={(e) => { e.preventDefault(); setSearch(query); }} className="flex rounded-full bg-white px-4 py-2 ring-1 ring-slate-200"><FiSearch className="mt-1 text-slate-400" /><input value={query} onChange={(e) => setQuery(e.target.value)} className="ml-2 w-40 bg-transparent text-sm outline-none" placeholder="Search stories..." /></form></div>{posts.length ? <div className="grid gap-6 md:grid-cols-2">{posts.map((post, index) => <PostCard key={post._id} post={post} featured={index === 0} />)}</div> : <div className="rounded-3xl bg-white p-12 text-center text-slate-500">No stories yet. Be the first to write one.</div>}</section>
  </div>;
}
