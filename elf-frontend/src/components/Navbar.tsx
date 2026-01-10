import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SubBadge from './SubBadge'; // ✅ Integrated Badge

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user_profile') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_profile');
    localStorage.removeItem('is_subscribed'); // Clean up on logout
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 left-0 w-full h-[70px] bg-white/85 backdrop-blur-xl border-b border-gray-200 z-50 flex items-center justify-between px-[5%] shadow-sm font-inter box-border">
      
      {/* Logo */}
      <div className="font-black text-xl tracking-tighter">
        <Link to="/" className="no-underline text-elf-charcoal">
          <span className="text-elf-teal">ELF</span> PLATFORM
        </Link>
      </div>
      
      {/* Nav Links */}
      <ul className="hidden md:flex list-none gap-8 m-0 p-0">
        <li><Link to="/dashboard" className="no-underline text-gray-600 font-semibold text-sm hover:text-elf-teal transition-colors">Dashboard</Link></li>
        
        {user.role === 'ADMIN' && (
          <>
            <li><Link to="/users" className="no-underline text-gray-600 font-semibold text-sm hover:text-elf-teal transition-colors">Schools</Link></li>
            <li><Link to="/admin/payments" className="no-underline text-gray-600 font-semibold text-sm hover:text-elf-teal transition-colors">Verifications</Link></li>
          </>
        )}
        
        <li><Link to="/leaderboard" className="no-underline text-gray-600 font-semibold text-sm hover:text-elf-teal transition-colors">Leaderboard</Link></li>
        <li><Link to="/resources" className="no-underline text-gray-600 font-semibold text-sm hover:text-elf-teal transition-colors">Teacher Vault</Link></li>
        <li><Link to="/donate" className="no-underline text-gray-600 font-semibold text-sm hover:text-elf-teal transition-colors">Donate</Link></li>
      </ul>

      {/* Auth Section */}
      <div className="flex items-center">
        {token ? (
          <div className="flex items-center gap-5"> {/* Increased gap for the badge */}
            
            {/* 🚀 SUBSCRIPTION STATUS PILL */}
            <div className="hidden lg:block">
              <SubBadge />
            </div>

            <div className="text-right hidden sm:block">
               <div className="text-sm font-bold text-elf-charcoal leading-none">{user.name || 'User'}</div>
               <div className="text-[10px] text-elf-teal font-black uppercase tracking-widest mt-1">{user.role}</div>
            </div>

            <button 
              onClick={handleLogout} 
              className="px-4 py-2 bg-transparent border border-gray-200 rounded-lg cursor-pointer text-xs font-bold text-gray-500 hover:bg-gray-50 transition-all"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link 
            to="/login" 
            className="no-underline bg-elf-charcoal text-elf-teal px-6 py-2.5 rounded-xl text-sm font-extrabold hover:scale-105 transition-transform active:scale-95"
          >
            Login / Join
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;