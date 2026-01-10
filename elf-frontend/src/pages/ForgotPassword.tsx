import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState('');
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      // Pointing to your backend reset route
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      await axios.post(`${API_URL}/auth/forgot-password`, { identifier });
      
      setStatus({
        type: 'success',
        message: 'Reset instructions have been sent to your email/phone.'
      });
    } catch (err: any) {
      setStatus({
        type: 'error',
        message: err.response?.data?.message || 'Something went wrong. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full flex justify-center items-center py-20 px-5 font-inter bg-gray-50">
      <div className="w-full max-w-[440px] bg-white rounded-[32px] p-8 md:p-10 shadow-2xl border border-gray-100 text-center">
        
        {/* Icon & Header */}
        <div className="mb-8">
          <div className="w-16 h-16 bg-gray-100 rounded-2xl mx-auto mb-4 flex justify-center items-center text-elf-teal text-2xl shadow-inner">
            🔒
          </div>
          <h2 className="text-2xl font-black text-elf-charcoal m-0 tracking-tight uppercase">Forgot Password?</h2>
          <p className="text-gray-500 text-sm mt-2">No worries! Enter your details below and we'll help you get back in.</p>
        </div>

        {status && (
          <div className={`mb-6 p-4 rounded-xl text-sm font-bold ${
            status.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'
          }`}>
            {status.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-left">
            <label className="text-xs font-bold uppercase text-gray-600 ml-1">Email or Phone Number</label>
            <input 
              type="text" 
              placeholder="e.g. john@email.com or 07..." 
              className="w-full p-4 mt-1 rounded-xl border border-gray-200 focus:ring-2 focus:ring-elf-teal/50 focus:border-elf-teal outline-none transition-all"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required 
            />
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className={`w-full py-4 bg-elf-teal text-white rounded-2xl font-black text-lg shadow-lg shadow-elf-teal/30 transition-all active:scale-[0.98] ${
              isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-elf-teal-hover hover:-translate-y-0.5'
            }`}
          >
            {isSubmitting ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        <div className="mt-8 border-t border-gray-100 pt-6">
          <Link to="/login" className="text-sm text-gray-400 font-bold hover:text-elf-teal transition-colors flex items-center justify-center gap-2">
            ← Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
