import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';

const AdminLayout: React.FC = () => {
  const location = useLocation();
  
  // 1. Get user data from storage
  const userRaw = localStorage.getItem('user_profile');
  const user = userRaw ? JSON.parse(userRaw) : null;

  // 2. Logic: If no user, or user is not an admin, redirect
  // Note: Ensure your login process sets 'role: "ADMIN"' in the user object
  const isAdmin = user?.role === 'ADMIN';

  if (!isAdmin) {
    console.warn("Unauthorized access attempt to:", location.pathname);
    // Redirect to login, but remember where they tried to go
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <div className="min-h-screen bg-[#fcfcfc]">
      <AdminNavbar />
      
      {/* Content Area */}
      <main className="animate-in fade-in slide-in-from-bottom-2 duration-700">
        <Outlet />
      </main>
      
      <footer className="py-10 border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
          <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em]">
            ELF Internal Management System © 2026
          </p>
          <div className="flex gap-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            <span>Security Status: <span className="text-green-500">Encrypted</span></span>
            <span className="text-gray-200">|</span>
            <span>v1.0.4-stable</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AdminLayout;