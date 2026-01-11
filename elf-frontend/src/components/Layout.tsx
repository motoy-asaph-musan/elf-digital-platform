import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Footer from './Footer'; // We'll create this below

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Bar */}
      <nav className="bg-white border-b border-gray-100 py-4 px-6 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-black text-elf-charcoal tracking-tighter flex items-center gap-2">
            <div className="w-8 h-8 bg-elf-teal rounded-lg"></div>
            ELF<span className="text-elf-teal">PLATFORM</span>
          </Link>
          <div className="hidden md:flex gap-8 font-bold text-sm uppercase tracking-wide">
            <Link to="/about" className="hover:text-elf-teal transition-colors">About Us</Link>
            <Link to="/offers" className="hover:text-elf-teal transition-colors">What We Offer</Link>
            <Link to="/login" className="text-elf-teal border-2 border-elf-teal px-4 py-1.5 rounded-xl hover:bg-elf-teal hover:text-white transition-all">Login</Link>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;