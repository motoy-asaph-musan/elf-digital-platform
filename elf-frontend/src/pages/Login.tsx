import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { fetchUser, loginUser, handleSocialLogin } from '../services/authService';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa6';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [credentials, setCredentials] = useState({ identifier: '', password: '' });

  useEffect(() => {
    const checkExistingSession = async () => {
      try {
        const user = await fetchUser();
        if (user) {
          localStorage.setItem('user_profile', JSON.stringify(user));
          localStorage.setItem('role', user.role);
          
          if (user.role === 'ADMIN') {
            navigate('/admin/verifications');
          } else {
            navigate('/dashboard');
          }
        }
      } catch (err) {
        console.log('No active session found.');
      } finally {
        setLoading(false);
      }
    };
    checkExistingSession();
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await loginUser(credentials);
      
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('role', data.user.role);
      localStorage.setItem('user_profile', JSON.stringify(data.user));
      
      if (data.user.role === 'ADMIN') {
        navigate('/admin/verifications');
      } else {
        navigate('/dashboard');
      }
    } catch (err: any) {
      alert(err.message || "Login failed. Please check your credentials.");
    }
  };

  if (loading) {
    return (
      <div className="h-screen bg-gray-50 flex flex-col justify-center items-center">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-elf-teal rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center items-center py-20 px-5 font-inter bg-gray-50">
      <div className="w-full max-w-[440px] bg-white rounded-[32px] p-8 md:p-10 shadow-2xl border border-gray-100 text-center">
        <div className="mb-8">
          <div className="w-16 h-16 bg-elf-teal rounded-2xl mx-auto mb-4 flex justify-center items-center text-white font-black text-xl shadow-lg shadow-elf-teal/20">
            ELF
          </div>
          <h2 className="text-2xl font-black text-elf-charcoal m-0 tracking-tight uppercase">Welcome Back</h2>
          <p className="text-gray-500 text-sm mt-1">Access the ELF Digital Platform</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <button 
            type="button"
            onClick={() => handleSocialLogin('google')}
            className="flex items-center justify-center gap-2 py-3 px-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all font-bold text-sm"
          >
            <FcGoogle className="text-xl" />
            Google
          </button>
          <button 
            type="button"
            onClick={() => handleSocialLogin('facebook')}
            className="flex items-center justify-center gap-2 py-3 px-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all font-bold text-sm"
          >
            <FaFacebook className="text-xl text-[#1877F2]" />
            Facebook
          </button>
        </div>

        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
          <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-gray-400 font-bold">Or continue with</span></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="text-left">
            <label className="text-xs font-bold uppercase text-gray-600 ml-1">Email or Phone Number</label>
            <input 
              name="identifier" 
              type="text" 
              placeholder="07... or email@address.com" 
              className="w-full p-4 mt-1 rounded-xl border border-gray-200 focus:ring-2 focus:ring-elf-teal/50 focus:border-elf-teal outline-none transition-all"
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="text-left">
            <label className="text-xs font-bold uppercase text-gray-600 ml-1">Password</label>
            <input 
              name="password" 
              type="password" 
              placeholder="••••••••" 
              className="w-full p-4 mt-1 rounded-xl border border-gray-200 focus:ring-2 focus:ring-elf-teal/50 focus:border-elf-teal outline-none transition-all"
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="text-right mt-1">
            <Link to="/forgot-password" title="reset password" className="text-xs font-bold text-elf-teal hover:underline">
              Forgot Password?
            </Link>
          </div>

          <button 
            type="submit" 
            className="w-full py-4 mt-2 bg-elf-teal text-white rounded-2xl font-black text-lg shadow-lg shadow-elf-teal/30 hover:bg-[#2c8d88] hover:-translate-y-0.5 transition-all active:scale-[0.98]"
          >
            Login
          </button>
        </form>

        <div className="mt-8 border-t border-gray-100 pt-6">
          <p className="text-sm text-gray-500 font-medium">
            Don't have an account? <Link to="/register" className="text-elf-teal font-black hover:underline ml-1">Register Now</Link>
          </p>
          <button 
            className="mt-6 text-sm text-gray-400 font-bold hover:text-elf-teal transition-colors"
            onClick={() => navigate(-1)}
          >
            ← Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;