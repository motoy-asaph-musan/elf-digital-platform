import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SubBadge from './SubBadge'; 

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user_profile') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_profile');
    localStorage.removeItem('is_subscribed');
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 left-0 w-full h-[70px] bg-white/85 backdrop-blur-xl border-b border-gray-200 z-50 flex items-center justify-between px-[5%] shadow-sm font-inter box-border">
      
      {/* Logo */}
      <div className="font-black text-xl tracking-tighter shrink-0">
        <Link to="/" className="no-underline text-elf-charcoal">
          <span className="text-elf-teal">ELF</span> PLATFORM
        </Link>
      </div>
      
      {/* Nav Links */}
      <ul className="hidden lg:flex list-none gap-8 m-0 p-0 items-center">
        <li><Link to="/dashboard" className="no-underline text-gray-600 font-semibold text-sm hover:text-elf-teal transition-colors">Dashboard</Link></li>
        
        {/* Admin specific links */}
        {user.role === 'ADMIN' && (
          <>
            <li><Link to="/user" className="no-underline text-gray-600 font-semibold text-sm hover:text-elf-teal transition-colors">User</Link></li>
            <li><Link to="/admin/verifications" className="no-underline text-gray-600 font-semibold text-sm hover:text-elf-teal transition-colors text-amber-600">Admin Panel</Link></li>
          </>
        )}
        
        <li><Link to="/leaderboard" className="no-underline text-gray-600 font-semibold text-sm hover:text-elf-teal transition-colors">Leaderboard</Link></li>
        <li><Link to="/donate" className="no-underline text-gray-600 font-semibold text-sm hover:text-elf-teal transition-colors">Donate</Link></li>
        
        {/* Public "Register School" link - visible only when NOT logged in */}
        {!token && (
          <li>
            <Link to="/register-school" className="no-underline text-elf-teal font-black text-xs uppercase tracking-widest hover:opacity-80 transition-opacity">
              Register School
            </Link>
          </li>
        )}
      </ul>

      {/* Auth Section */}
      <div className="flex items-center gap-4">
        {token ? (
          <div className="flex items-center gap-5">
            <div className="hidden lg:block">
              <SubBadge />
            </div>

            <div className="text-right hidden sm:block leading-tight">
               <div className="text-sm font-black text-elf-charcoal">{user.name || 'User'}</div>
               <div className="text-[9px] text-elf-teal font-black uppercase tracking-widest mt-0.5">{user.role}</div>
            </div>

            <button 
              onClick={handleLogout} 
              className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl cursor-pointer text-[10px] font-black text-gray-500 hover:bg-gray-100 transition-all uppercase tracking-tighter"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link 
              to="/register-school" 
              className="hidden sm:block no-underline text-elf-charcoal font-bold text-xs hover:text-elf-teal transition-colors mr-2"
            >
              School Entry
            </Link>
            <Link 
              to="/login" 
              className="no-underline bg-elf-charcoal text-elf-teal px-6 py-2.5 rounded-xl text-sm font-black shadow-lg shadow-elf-charcoal/20 hover:scale-105 transition-all active:scale-95"
            >
              Join Portal
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;