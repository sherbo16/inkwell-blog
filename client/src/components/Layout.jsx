import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { FiBookOpen, FiLogOut, FiPenTool, FiUser } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const exit = async () => { await logout(); navigate('/'); };
  return (
    <div className="min-h-screen bg-cream text-ink">
      <header className="border-b border-slate-200/80 bg-cream/90 backdrop-blur sticky top-0 z-10">
        <nav className="container flex h-20 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold tracking-tight"><span className="rounded-xl bg-coral p-2 text-white"><FiBookOpen /></span> inkwell<span className="text-coral">.</span></Link>
          <div className="flex items-center gap-2 sm:gap-6 text-sm font-semibold">
            <NavLink className="hidden sm:block nav-link" to="/">Explore</NavLink>
            {user ? <><NavLink className="nav-link" to="/write"><FiPenTool className="inline mr-1" /> Write</NavLink><NavLink className="nav-link" to="/profile"><FiUser className="inline mr-1" /> {user.name.split(' ')[0]}</NavLink><button className="btn-ghost" onClick={exit}><FiLogOut /></button></> : <><NavLink className="nav-link hidden sm:block" to="/login">Log in</NavLink><Link className="btn-primary" to="/register">Join us</Link></>}
          </div>
        </nav>
      </header>
      <main className="container py-10"><Outlet /></main>
      <footer className="border-t border-slate-200 py-10"><div className="container flex flex-col gap-3 text-sm text-slate-500 sm:flex-row sm:justify-between"><span>© {new Date().getFullYear()} Inkwell. Stories worth keeping.</span><span>Made for curious minds.</span></div></footer>
    </div>
  );
}
