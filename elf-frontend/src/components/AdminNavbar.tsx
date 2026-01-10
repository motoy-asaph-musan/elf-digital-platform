import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import SubBadge from './SubBadge'; // ✅ Integrated Badge

const AdminNavbar: React.FC = () => {
  const navigate = useNavigate();

  const navItems = [
    { name: 'Verifications', path: '/admin/verifications', icon: '🛡️' },
    { name: 'Payment Ledger', path: '/admin/payments', icon: '💰' },
    { name: 'School Directory', path: '/admin/schools', icon: '🏫' },
  ];

  return (
    <nav className="bg-elf-charcoal text-white py-4 px-8 flex items-center justify-between shadow-2xl sticky top-0 z-50 border-b border-gray-800">
      {/* Brand & System Status */}
      <div className="flex items-center gap-6">
        <div 
          onClick={() => navigate('/admin/verifications')}
          className="cursor-pointer group"
        >
          <h1 className="text-xl font-black tracking-tighter group-hover:text-elf-teal transition-colors">
            ELF <span className="text-elf-teal italic">HQ</span>
          </h1>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-500">System Live</span>
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="h-8 w-[1px] bg-gray-800 hidden md:block"></div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                flex items-center gap-2 px-5 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all
                ${isActive 
                  ? 'bg-elf-teal text-elf-charcoal shadow-lg shadow-teal-900/20' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'}
              `}
            >
              <span>{item.icon}</span>
              {item.name}
            </NavLink>
          ))}
        </div>
      </div>

      {/* Admin Actions */}
      <div className="flex items-center gap-6">
        
        {/* 🚀 SUBSCRIPTION STATUS PILL */}
        <SubBadge />

        <div className="hidden lg:block text-right border-l border-gray-800 pl-6">
          <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest leading-none">Admin Session</p>
          <p className="text-xs font-bold text-elf-teal mt-1 italic font-mono uppercase">Master_Control_01</p>
        </div>
        
        <button 
          onClick={() => {
            localStorage.clear();
            navigate('/login');
          }}
          className="px-4 py-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-lg text-[10px] font-black uppercase tracking-widest transition-all border border-red-500/20"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;