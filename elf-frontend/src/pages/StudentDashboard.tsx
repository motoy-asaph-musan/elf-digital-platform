import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StudentDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user_profile');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="max-w-7xl mx-auto py-10 px-6 font-inter lg:px-12">
      
      {/* Welcome Section */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-elf-charcoal tracking-tight">
            Hello, {user?.name?.split(' ')[0] || 'Scholar'}! 👋
          </h1>
          <p className="text-gray-500 font-medium mt-1">Ready to showcase your English proficiency?</p>
        </div>
        <div className="bg-white border border-gray-100 px-6 py-3 rounded-full shadow-sm flex items-center gap-3 self-start md:self-center">
          <span className="text-xl">📍</span>
          <span className="text-sm font-bold text-gray-600 uppercase tracking-wide">
            {user?.schoolName || 'Independent Learner'}
          </span>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Contest Card - Taking up 2 columns */}
        <div className="lg:col-span-2 bg-elf-charcoal rounded-elf p-8 md:p-12 text-white relative overflow-hidden shadow-2xl flex flex-col justify-between min-h-[450px]">
          {/* Decorative Gradient Overlay */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-elf-teal/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-elf-teal animate-pulse"></span>
              <span className="text-[10px] font-black text-elf-teal uppercase tracking-[0.2em]">Live Contest Available</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black leading-tight mb-6 italic tracking-tighter">
              National English & <br /> Literature Contest 2026
            </h2>
            
            <p className="text-gray-400 text-lg max-w-xl leading-relaxed font-medium">
              Test your proficiency in grammar, scenario-based comprehension, and CBC literature themes. Achieve top marks to climb the national leaderboard.
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-8 mt-10">
              <div className="flex flex-col">
                <span className="text-3xl font-black text-white">60</span>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Minutes</span>
              </div>
              <div className="flex flex-col border-x border-gray-800 px-8">
                <span className="text-3xl font-black text-white">50</span>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Questions</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-black text-white">100</span>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Total Marks</span>
              </div>
            </div>
          </div>

          <button 
            onClick={() => navigate('/exam')}
            className="relative z-10 mt-12 w-full md:w-max bg-elf-teal hover:bg-elf-tealHover text-elf-charcoal px-12 py-5 rounded-2xl font-black text-lg shadow-xl shadow-elf-teal/20 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Start Exam Now
          </button>
        </div>

        {/* Side Progress Section */}
        <div className="flex flex-col gap-6">
          
          {/* Progress Card */}
          <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">Your Performance</h3>
            <div className="flex items-end justify-between mb-2">
              <span className="text-4xl font-black text-elf-charcoal">0%</span>
              <span className="text-xs font-bold text-gray-400">0 / 1 Completed</span>
            </div>
            <div className="w-full h-3 bg-gray-50 rounded-full overflow-hidden border border-gray-100">
              <div className="h-full bg-elf-teal transition-all duration-1000" style={{ width: '0%' }}></div>
            </div>
            <p className="mt-6 text-sm text-gray-500 leading-relaxed">
              Complete your first exam to see your national ranking and strengths.
            </p>
          </div>

          {/* Resources Card */}
          <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm flex-1 flex flex-col">
            <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center text-xl mb-6">
              📚
            </div>
            <h3 className="text-lg font-black text-elf-charcoal mb-2 uppercase italic tracking-tight">Study Vault</h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-8">
              Access CBC-aligned study guides and past papers curated by ELF educators.
            </p>
            <button 
              onClick={() => navigate('/resources')}
              className="mt-auto w-full py-4 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 font-black text-xs uppercase tracking-widest hover:border-elf-teal hover:text-elf-teal transition-all"
            >
              Enter Vault
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;