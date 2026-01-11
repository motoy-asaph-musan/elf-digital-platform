// ... existing imports
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../services/authService';

const Register: React.FC = () => {
  // ... existing state
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<'STUDENT' | 'TEACHER'>('STUDENT');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '', 
    phone: '',
    password: '',
    schoolCode: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFindCode = () => {
    alert("📢 HOW TO GET A CODE:\n\n1. Ask your Class Teacher or Headteacher.\n2. Your school must be registered & verified on the ELF platform.\n3. If your school hasn't registered, tell your teacher to visit the 'Register School' page.");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerUser({ ...formData, role });
      alert("Registration Successful!");
      navigate('/login');
    } catch (err: any) {
      alert(err.message || "Invalid School Code.");
    }
  };

  return (
    <div className="w-full flex justify-center items-center py-12 px-5 font-inter bg-gray-50">
      <div className="w-full max-w-[460px] bg-white rounded-[32px] p-8 md:p-10 shadow-2xl border border-gray-100">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-elf-teal rounded-2xl mx-auto mb-4 flex justify-center items-center text-white font-black text-xl shadow-lg shadow-elf-teal/20">
            ELF
          </div>
          <h2 className="text-2xl font-black text-elf-charcoal tracking-tight uppercase">Create Account</h2>
          <p className="text-gray-500 text-sm mt-1">National English Contest 2026</p>
        </div>

        {/* Role Selector */}
        <div className="flex bg-gray-100 rounded-2xl p-1.5 mb-8 border border-gray-200">
          <button 
            type="button"
            onClick={() => setRole('STUDENT')}
            className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all duration-300 ${
              role === 'STUDENT' ? 'bg-elf-teal text-white shadow-md' : 'text-gray-500'
            }`}
          >
            Student
          </button>
          <button 
            type="button"
            onClick={() => setRole('TEACHER')}
            className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all duration-300 ${
              role === 'TEACHER' ? 'bg-elf-teal text-white shadow-md' : 'text-gray-500'
            }`}
          >
            Teacher
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* School Code Section */}
          <div className="space-y-1.5 bg-elf-teal/5 p-5 rounded-[2rem] border-2 border-dashed border-elf-teal/20">
            <div className="flex justify-between items-center mb-1 px-1">
                <label className="text-[10px] font-black uppercase text-elf-teal tracking-widest">
                    School Access Code
                </label>
                <button 
                    type="button"
                    onClick={handleFindCode}
                    className="text-[9px] font-black text-gray-400 hover:text-elf-teal underline uppercase"
                >
                    No code?
                </button>
            </div>
            <input 
               name="schoolCode" 
               type="text" 
               maxLength={6}
               placeholder="000000" 
               className="w-full p-3 text-center text-2xl font-black tracking-[0.6em] rounded-2xl border border-gray-100 focus:ring-2 focus:ring-elf-teal/50 outline-none transition-all placeholder:tracking-normal placeholder:text-sm placeholder:font-normal"
               onChange={handleChange} 
               required 
            />
          </div>

          {/* User Details */}
          <div className="space-y-4">
            <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase text-gray-400 ml-1">Full Name</label>
                <input name="name" type="text" placeholder="e.g. Mukasa Ivan" className="w-full p-3.5 rounded-xl border border-gray-200 outline-none" onChange={handleChange} required />
            </div>

            <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase text-gray-400 ml-1">Email</label>
                <input name="email" type="email" placeholder="ivan@gmail.com" className="w-full p-3.5 rounded-xl border border-gray-200 outline-none" onChange={handleChange} required />
            </div>

            <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase text-gray-400 ml-1">Phone Number</label>
                <div className="flex border border-gray-200 rounded-xl overflow-hidden">
                    <div className="bg-gray-50 px-4 flex items-center text-xs font-bold text-gray-500 border-r border-gray-200">🇺🇬 +256</div>
                    <input name="phone" type="text" placeholder="07..." className="flex-1 p-3.5 outline-none" onChange={handleChange} required />
                </div>
            </div>

            <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase text-gray-400 ml-1">Password</label>
                <input 
                    name="password" 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••" 
                    className="w-full p-3.5 rounded-xl border border-gray-200 outline-none" 
                    onChange={handleChange} 
                    required 
                />
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-elf-teal text-white py-4 rounded-2xl font-black text-lg shadow-lg shadow-elf-teal/30 hover:bg-[#2c8d88] transition-all mt-6 uppercase"
          >
            Create {role} Account
          </button>
        </form>

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