import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrophy, FaBookReader, FaMapMarkerAlt, FaClock, FaQuestionCircle, FaAward } from 'react-icons/fa';

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
    <div className="max-w-7xl mx-auto py-10 px-6 font-inter lg:px-12 bg-white min-h-screen">
      
      {/* 1. WELCOME & SCHOOL BADGE */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-elf-charcoal tracking-tight">
            Hello, {user?.name?.split(' ')[0] || 'Scholar'}! 👋
          </h1>
          <p className="text-gray-500 font-medium mt-1 italic">Ready to showcase your English proficiency?</p>
        </div>
        <div className="bg-elf-gray border border-gray-100 px-6 py-3 rounded-2xl shadow-sm flex items-center gap-3 self-start md:self-center">
          <FaMapMarkerAlt className="text-elf-teal" />
          <span className="text-xs font-black text-gray-600 uppercase tracking-widest">
            {user?.schoolName || 'Independent Learner'}
          </span>
        </div>
      </header>

      {/* 2. NATIONAL THEME STRIP */}
      <div className="bg-elf-charcoal rounded-[2rem] p-6 mb-10 flex flex-col md:flex-row items-center justify-center gap-4 text-center border-b-4 border-elf-teal shadow-xl">
        <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter">
          2026 Theme
        </span>
        <p className="text-white text-sm md:text-base font-medium italic">
          "Inculcating Technology in the Competency-Based Curriculum (CBC) for Effective Teaching and Learning"
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* 3. MAIN CONTEST CARD (Left Side) */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-elf-charcoal rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl flex flex-col justify-between min-h-[480px]">
            {/* Decorative Glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-elf-teal/20 rounded-full -mr-40 -mt-40 blur-[100px]"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-elf-teal animate-ping"></span>
                  <span className="w-2 h-2 rounded-full bg-elf-teal"></span>
                </div>
                <span className="text-[10px] font-black text-elf-teal uppercase tracking-[0.3em]">Live Contest: Round 1</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-black leading-tight mb-6 italic tracking-tighter">
                National English & <br /> Literature Contest 2026
              </h2>
              
              <p className="text-gray-400 text-lg max-w-xl leading-relaxed font-medium mb-10">
                Master grammar, scenario-based comprehension, and CBC literature themes to climb the national ranks.
              </p>

              <div className="flex flex-wrap gap-10">
                <Stat icon={<FaClock />} value="60" label="Minutes" />
                <Stat icon={<FaQuestionCircle />} value="50" label="Questions" />
                <Stat icon={<FaAward />} value="100" label="Max Marks" />
              </div>
            </div>

            <button 
              onClick={() => navigate('/exam')}
              className="relative z-10 mt-12 w-full md:w-max bg-elf-teal hover:bg-[#2c8d88] text-elf-charcoal px-12 py-5 rounded-2xl font-black text-lg shadow-2xl shadow-elf-teal/20 transition-all transform hover:scale-[1.03] active:scale-95"
            >
              Start Competition
            </button>
          </div>

          {/* 4. NATIONAL LEADERBOARD PREVIEW */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-sm font-black text-elf-charcoal uppercase tracking-widest flex items-center gap-2">
                <FaTrophy className="text-yellow-500" /> National Top Performers
              </h3>
              <span className="text-[10px] font-bold text-gray-400 uppercase">Live Standings</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <LeaderRow rank={1} name="Nansubuga Joan" school="Buddo SS" score="98%" />
              <LeaderRow rank={2} name="Okello Mark" school="Namilyango" score="96%" />
              <LeaderRow rank={3} name="Mugisha Paul" school="King's College Budo" score="94%" />
              <LeaderRow rank={4} name="Atieno Sarah" school="Gayaza High" score="93%" />
            </div>
          </div>
        </div>

        {/* 5. SIDEBAR (Right Side) */}
        <div className="flex flex-col gap-8">
          
          {/* Progress Card */}
          <div className="bg-elf-gray p-8 rounded-[2.5rem] border border-gray-100 shadow-inner">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">Personal Growth</h3>
            <div className="flex items-end justify-between mb-3">
              <span className="text-5xl font-black text-elf-charcoal">0<span className="text-2xl">%</span></span>
              <span className="text-[10px] font-bold text-gray-400 uppercase">0 / 1 Papers</span>
            </div>
            <div className="w-full h-4 bg-white rounded-full overflow-hidden p-1">
              <div className="h-full bg-elf-teal rounded-full transition-all duration-1000" style={{ width: '0%' }}></div>
            </div>
            <p className="mt-6 text-xs text-gray-500 leading-relaxed font-medium">
              Your ranking will appear here after your first submission.
            </p>
          </div>

          {/* Resources Card */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex-1 flex flex-col group hover:border-elf-teal transition-all">
            <div className="w-14 h-14 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:bg-elf-teal group-hover:text-white transition-all">
              <FaBookReader />
            </div>
            <h3 className="text-xl font-black text-elf-charcoal mb-3 uppercase italic tracking-tighter">Study Vault</h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-8">
              Download CBC-aligned guides and scenario scripts curated by ELF educators.
            </p>
            <button 
              onClick={() => navigate('/resources')}
              className="mt-auto w-full py-4 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 font-black text-[10px] uppercase tracking-widest hover:border-elf-teal hover:text-elf-teal transition-all"
            >
              Enter Study Vault
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

// Sub-components for cleaner code
const Stat = ({ icon, value, label }: any) => (
  <div className="flex flex-col gap-1">
    <div className="flex items-center gap-2 text-elf-teal mb-1">
      {icon}
      <span className="text-2xl font-black text-white">{value}</span>
    </div>
    <span className="text-[9px] font-bold text-gray-500 uppercase tracking-[0.2em]">{label}</span>
  </div>
);

const LeaderRow = ({ rank, name, school, score }: any) => (
  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-gray-100">
    <div className="flex items-center gap-3">
      <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-black ${rank === 1 ? 'bg-yellow-400 text-black' : 'bg-gray-200 text-gray-500'}`}>
        {rank}
      </span>
      <div>
        <p className="text-xs font-black text-elf-charcoal">{name}</p>
        <p className="text-[9px] text-gray-400 font-bold uppercase">{school}</p>
      </div>
    </div>
    <span className="text-xs font-black text-elf-teal">{score}</span>
  </div>
);

export default StudentDashboard;