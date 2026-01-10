import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../services/authService';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<'STUDENT' | 'TEACHER'>('STUDENT');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '', // Added Email to state
    phone: '',
    password: '',
    schoolCode: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerUser({ ...formData, role });
      alert("Registration Successful! Please login.");
      navigate('/login');
    } catch (err: any) {
      alert(err.message || "Registration failed");
    }
  };

  return (
    <div className="w-full flex justify-center items-center py-12 px-5 font-inter bg-gray-50">
      <div className="w-full max-w-[460px] bg-white rounded-[32px] p-8 md:p-10 shadow-2xl border border-gray-100">
        
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-elf-teal rounded-2xl mx-auto mb-4 flex justify-center items-center text-white font-black text-xl shadow-lg shadow-elf-teal/20">
            ELF
          </div>
          <h2 className="text-2xl font-black text-elf-charcoal tracking-tight uppercase">Create Account</h2>
          <p className="text-gray-500 text-sm mt-1">Join the ELF Platform today</p>
        </div>

        {/* Role Selector */}
        <div className="flex bg-gray-100 rounded-2xl p-1.5 mb-8 border border-gray-200">
          <button 
            type="button"
            onClick={() => setRole('STUDENT')}
            className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all duration-300 ${
              role === 'STUDENT' 
              ? 'bg-elf-teal text-white shadow-md' 
              : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            I am a Student
          </button>
          <button 
            type="button"
            onClick={() => setRole('TEACHER')}
            className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all duration-300 ${
              role === 'TEACHER' 
              ? 'bg-elf-teal text-white shadow-md' 
              : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            I am a Teacher
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase text-gray-600 ml-1">Full Name</label>
            <input 
               name="name" 
               type="text" 
               placeholder="John Doe" 
               className="w-full p-3.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-elf-teal/50 focus:border-elf-teal outline-none transition-all"
               onChange={handleChange} 
               required 
            />
          </div>

          {/* Email Address - NEW FIELD */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase text-gray-600 ml-1">Email Address</label>
            <input 
               name="email" 
               type="email" 
               placeholder="john@example.com" 
               className="w-full p-3.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-elf-teal/50 focus:border-elf-teal outline-none transition-all"
               onChange={handleChange} 
               required 
            />
          </div>

          {role === 'TEACHER' && (
            <div className="space-y-1.5 animate-in fade-in slide-in-from-top-2 duration-300">
              <label className="text-xs font-bold uppercase text-elf-teal ml-1">School Registration Code</label>
              <input 
                name="schoolCode" 
                type="text" 
                placeholder="Enter 6-digit Code" 
                className="w-full p-3.5 rounded-xl border-2 border-elf-teal/20 bg-elf-teal/5 focus:ring-2 focus:ring-elf-teal/50 focus:border-elf-teal outline-none transition-all"
                onChange={handleChange} 
                required 
              />
            </div>
          )}

          {/* Phone Number */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase text-gray-600 ml-1">Phone Number</label>
            <div className="flex border border-gray-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-elf-teal/50 focus-within:border-elf-teal transition-all">
              <div className="bg-gray-50 px-4 flex items-center text-sm font-bold text-gray-500 border-r border-gray-200">
                🇺🇬 +256
              </div>
              <input 
                name="phone" 
                type="text" 
                placeholder="07XXXXXXXX" 
                className="flex-1 p-3.5 outline-none border-none"
                onChange={handleChange} 
                required 
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase text-gray-600 ml-1">Password</label>
            <div className="relative">
              <input 
                name="password"
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••" 
                className="w-full p-3.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-elf-teal/50 focus:border-elf-teal outline-none transition-all"
                onChange={handleChange}
                required
              />
              <span 
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-lg grayscale hover:grayscale-0 transition-all select-none"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </span>
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-elf-teal text-white py-4 rounded-2xl font-black text-lg shadow-lg shadow-elf-teal/30 hover:bg-elf-teal-hover hover:-translate-y-0.5 transition-all active:scale-[0.98] mt-4"
          >
            Join as {role === 'STUDENT' ? 'Student' : 'Teacher'}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-500 font-medium">
            Already have an account? <Link to="/login" className="text-elf-teal font-black hover:underline ml-1">Login Now</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;