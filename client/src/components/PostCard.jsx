import { Link } from 'react-router-dom';
import { FiArrowUpRight } from 'react-icons/fi';

const fallback = 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80';
export default function PostCard({ post, featured = false }) {
  return <Link to={`/posts/${post._id}`} className={`group overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-xl ${featured ? 'md:col-span-2 md:grid md:grid-cols-2' : ''}`}>
    <img className={`h-56 w-full object-cover ${featured ? 'md:h-full' : ''}`} src={post.coverImage ? `${import.meta.env.VITE_API_ORIGIN || 'http://localhost:5000'}${post.coverImage}` : fallback} alt="" />
    <div className="flex flex-col justify-between p-6"><div><p className="mb-3 text-xs font-bold uppercase tracking-widest text-coral">{post.category}</p><h3 className={`${featured ? 'text-3xl' : 'text-xl'} font-display leading-tight group-hover:text-coral`}>{post.title}</h3><p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-500">{post.excerpt}</p></div><div className="mt-8 flex items-center justify-between text-xs text-slate-400"><span>By {post.author?.name}</span><span className="flex items-center gap-1 font-bold text-ink">Read <FiArrowUpRight /></span></div></div>
  </Link>;
}
