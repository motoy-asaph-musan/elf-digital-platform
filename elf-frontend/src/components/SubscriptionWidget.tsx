import React from 'react';
import { useNavigate } from 'react-router-dom';

const SubscriptionWidget: React.FC = () => {
  const navigate = useNavigate();
  
  // Mock data - In production, fetch this from your Auth/Subscription context
  const daysRemaining = 14; 
  const totalDays = 30;
  const progress = (daysRemaining / totalDays) * 100;

  return (
    <div className="bg-elf-charcoal rounded-[2rem] p-6 text-white shadow-xl border border-white/5 relative overflow-hidden group">
      {/* Decorative Glow */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-elf-teal/20 rounded-full blur-3xl group-hover:bg-elf-teal/30 transition-all"></div>

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-6">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-elf-teal block mb-1">
              School Plan
            </span>
            <h4 className="text-lg font-black tracking-tight uppercase italic">Premium</h4>
          </div>
          <div className="bg-white/10 p-2 rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-elf-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04m12.736 14.176L12 19.056l-4.118 4.708C4.988 21.39 3 18.423 3 15.167a11.955 11.955 0 01-8.618-3.04c.008-.001.016-.001.024-.002z" />
            </svg>
          </div>
        </div>

        {/* Progress Section */}
        <div className="space-y-2 mb-6">
          <div className="flex justify-between items-end">
            <span className="text-2xl font-black">{daysRemaining}</span>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pb-1">Days Left</span>
          </div>
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-1000 ${daysRemaining < 7 ? 'bg-orange-500' : 'bg-elf-teal'}`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <button 
          onClick={() => navigate('/subscribe')}
          className="w-full py-3 bg-white text-elf-charcoal rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-elf-teal hover:text-white transition-all transform active:scale-95"
        >
          Manage / Renew
        </button>
      </div>
    </div>
  );
};

export default SubscriptionWidget;